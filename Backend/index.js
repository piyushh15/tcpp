const express = require('express');
const app = express();
const multer = require('multer'); 
const cors=require('cors');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const Image = require('./models/Image'); 
const mongourl="mongodb+srv://carplate:1234@cluster0.hsb1zad.mongodb.net/iiotproject?retryWrites=true&w=majority"
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="mynameispiyushnicetomeetyou";
const User = require('./models/User');
const { body,validationResult} = require('express-validator');
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");


mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
app.use(cors());
// Middleware setup
// app.use(express.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files (e.g., images) from the 'public' directory

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/createuser',[body('email','incorrect email').isEmail(), body('password','incorrect password').isLength({ min: 5 })],
//This route handles user registration. It expects a POST request.// username must be an email // password must be at least 5 chars long
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        //If there are validation errors, it returns a 400 Bad Request response with error details.
        const salt=await bcrypt.genSalt(10);
        let secpassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpassword,
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
})

app.post('/loginuser',[body('email').isEmail(), body('password','password is too small').isLength({ min: 5 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            
      let email=req.body.email;

      try {
      //It attempts to find a user with the provided email in the database using User.findOne.
      let useremail=await User.findOne({email});
      if(!useremail)return res.status(400).json({ errors:"username not found" });     
                
      //If the email is found, it uses bcrypt.compare to compare the provided password with the hashed password stored in the database.
      const pwdcompare=await bcrypt.compare(req.body.password,useremail.password);
      if(!pwdcompare) return res.status(400).json({ errors: "password incorrect" });
                
      //If the passwords match, it generates a JWT token (authToken) containing user information and signs it using a secret key (jwtsecret).
      const data={
        user:{
          id:useremail.id
        }
      }
      const authToken=jwt.sign(data,jwtsecret)
      console.log(authToken);
      return res.json({success:true,authToken:authToken})
      } catch (error) {
      console.log(error)
        res.json({ success: false })}

        //After validating the user's email and password and confirming that they match a user in the database, the code creates a JWT token.
//The payload of the JWT (the data it carries) is set to the data object. In this case, the data object includes the user's ID.
//The JWT token is then signed with a secret key (jwtsecret) to ensure its authenticity and integrity.
//Finally, the JWT token is included in the response to the client. The client can use this token to make authenticated requests to protected routes or APIs in your application, and it can also decode the token to access the user's ID or other user-specific information as needed.

    })

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
    // Extract the JWT from the request headers
    const token = req.header('Authorization');
    if (!token)  return res.status(401).json({ error: 'Unauthorized - Missing token' });

    try {
      // Verify the JWT and extract user information
      const decoded = jwt.verify(token, 'mynameispiyushnicetomeetyou');
      req.user = decoded.user.id;
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null,  file.originalname)
  }
})



const checkUser = (req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - Missing user ID' });
  }

  // Assuming you have a User model defined with Mongoose
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      // User is found, proceed to upload
      next();
    })
    .catch((err) => {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    });
};



// Initialize multer middleware
const upload = multer({ storage:storage });

// Define the endpoint for image uploads using the upload middleware
app.post('/upload',checkUser,upload.single('test'), async (req, res) => {
  try {
    if(!req.file)return res.status(400).json({error:'No file uploaded'});

    const imageData=fs.readFileSync('./uploads/'+req.file.filename);
    //console.log(imageData);
    const imagePath = './uploads/' + req.file.filename;
    const userId=req.headers['user-id'];
    const carPlateNumber = await sendImageToModel(imagePath);

    if (!carPlateNumber) return res.status(400).json({ error: 'Failed to retrieve car plate number from model API.' });
      
    const newImage = new Image({
      UserData:userId,
      Image: {
        data: imageData,
        contentType: 'image/jpg',
      },
      timestamp:Date.now(),
      carPlateNumber:carPlateNumber.toString(),
    });

    const savedImage = await newImage.save();
    console.log('Image is saved');
    //console.log(newImage.imageData);
    //console.log(newImage.Image.data.length + " Bytes Received");
    return res.status(200).json({ message: 'File uploaded and saved to the database.' });
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'Error saving image to the database.' });
  }
});


async function sendImageToModel(imagePath) {
  try {
      // Use fs.promises.readFile for asynchronous reading
     // console.log(imagePath);
      let body = new FormData();
      body.append("upload", fs.createReadStream(imagePath)); // Use createReadStream to read the file
      // body.append("regions","in")
      //console.log(body);
      
      const response = await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
          method: 'POST',
          headers: {
              Authorization: 'Token 143a40c052ea06708cd6858d964f98ebdb5046dc',
          },
          body: body,
      });

      //console.log(response);

      if (!response.ok) {
        const responseBody = await response.text(); // get response body for more details
        console.error(`Error: ${response.status} - ${response.statusText}\n${responseBody}`);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

      const json = await response.json();
      const licensePlate = json.results[0]?.plate;

      console.log('License Plate:', licensePlate);
      return licensePlate;
  } catch (error) {
      console.error('Error:', error.message);
      throw error;
  }
}


app.get('/data', authenticateUser, async (req, res) => {
    try {
      const data = await Image.find({ 'UserData': req.user }); 
      // console.log(data);
      console.log(req.user);
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Error fetching data.' });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});





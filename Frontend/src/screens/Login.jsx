import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const response = await fetch("https://tcpp-backend.onrender.com/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    setLoading(false); // Set loading to false after response

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/data");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      {/* Left background image */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/3d-data-technology-background-with-low-poly-plexus-design_1048-18066.jpg?size=626&ext=jpg&ga=GA1.1.315140480.1698958348&semt=ais')`,
          backgroundPosition: "left",
        }}
      ></div>

      {/* Right background image */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/3d-data-technology-background-with-low-poly-plexus-design_1048-18066.jpg?size=626&ext=jpg&ga=GA1.1.315140480.1698958348&semt=ais')`,
          backgroundPosition: "right",
        }}
      ></div>

      {/* Gradient overlay in between with fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black to-transparent opacity-70"></div>

      <div className="z-10 flex flex-col justify-start">
        <div>
          <h2 className="mt-10 text-center text-4xl font-poppins font-bold leading-snug text-white">
            Welcome Back, <br />
            <span className="text-teal-800">Log in to your Account</span>
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium leading-6 text-white font-poppins"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full p-2 mt-2 rounded-md"
                value={credentials.email}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl font-poppins font-medium leading-6 text-white "
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={onChange}
                required
                className="w-full p-2 mt-2 rounded-md font-poppins"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center bg-teal-900 p-3 text-white text-xl font-poppins rounded-lg"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Submitting..." : "Sign in"} {/* Show "Submitting..." while loading */}
              </button>
            </div>
            <button className="rounded-lg border-black">
              <Link
                to="/createuser"
                className="flex w-40 justify-center items-center rounded-md font-poppins text-xl bg-teal-600 p-3  text-white shadow-sm "
              >
                New user
              </Link>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

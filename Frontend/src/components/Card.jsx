import React from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

const steps = [
  {
    icon: "🚗",
    title: "Car Entry",
    description: "A car enters through the entry gate.",
  },
  {
    icon: "🕹️",
    title: "Signal from Guard",
    description:
      "The guard sends a signal using an IR transmitter detected by the receiver at Raspberry Pi.",
  },
  {
    icon: "📷",
    title: "Number Plate Recognition",
    description:
      "Camera fixed at Raspberry Pi clicks a photo of the car, sends it to an ML model to extract the number plate, and stores it in the database with a timestamp.",
  },
  {
    icon: "🖥️",
    title: "Admin Monitoring",
    description: "Admin accesses a dashboard to monitor entry and exit times.",
  },
  {
    icon: "🗄️",
    title: "Database Tracking",
    description: "Records entry and exit data for reporting and monitoring.",
  },
  {
    icon: "🚪",
    title: "Car Exit",
    description:
      "Process triggers upon capturing the exit number plate and stores the exit timings in the database.",
  },
  {
    icon: "✅",
    title: "End",
    description: "Conclude the process after tracking all necessary data.",
  },
];

const Flowchart = () => {
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


    <div className="z-10 flex justify-center items-center min-h-screen  font-poppins px-10">
      <div className="w-full max-w-6xl p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold text-white mb-6">
          Car Entry and Exit Process Flow
        </h1>

        <div className="flex flex-col items-center">
          {/* First row */}
          <div className="flex items-center w-full mb-6">
            {steps.slice(0, 3).map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center justify-center border-2 border-white p-4 rounded-lg w-1/3 h-[300px] bg-black">
                  <span className="text-5xl">{step.icon}</span>
                  <p className="text-xl text-center mt-2 text-gray-300">
                    <strong>{step.title}:</strong> {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <FaArrowRight
                    className="text-white mx-4"
                    size={30}
                  /> /* Right arrow between boxes */
                )}
              </React.Fragment>
            ))}
          </div>
          <FaArrowDown className="text-white my-4" size={30} />

          {/* Second row */}
          <div className="flex items-center w-full mb-6 justify-end">
            {steps.slice(3, 6).map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center border-2 justify-center  border-white p-4 rounded-lg w-1/3 h-[200px] bg-black">
                  <span className="text-5xl">{step.icon}</span>
                  <p className="text-xl text-center mt-2 text-gray-300">
                    <strong>{step.title}:</strong> {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <FaArrowRight
                    className="text-white mx-4"
                    size={30}
                  /> /* Right arrow between boxes */
                )}
              </React.Fragment>
            ))}
          </div>
         
        </div>
      </div>
    </div>
    </section>
  );
};

export default Flowchart;

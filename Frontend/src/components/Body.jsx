const Upper = () => {
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

      <div className="relative z-10 flex flex-col items-center justify-center w-3/5 text-center mx-10 px-10 text-white font-jetbrains">
        <h2 className="text-8xl leading-1 py-10">
          High Performance
          <br />
          <span className="text-emerald-600 text-7xl">Car Plate Recogniser</span>
        </h2>
       
        <h3 className="mt-6 text-4xl leading-snug font-semibold">
          Let`s start to secure our Area with a small step Now!!!
        </h3>
      </div>
    </section>
  );
};

export default Upper;

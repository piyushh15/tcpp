import { useState, useEffect } from 'react';
import axios from 'axios';
import { loader } from "../assets/icons";
import Navbar from '../components/Navbar';

const CarPlateViewer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          Authorization: `${authToken}`,
        };
        const response = await axios.get('https://tcpp-backend.onrender.com/data', { headers });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageSrc = (item) => {
    const base64String = new Uint8Array(item.Image.data.data)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const encodedString = btoa(base64String);
    return `data:image/${item.Image.contentType};base64,${encodedString}`;
  };

  const getIndianDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    };
    return date.toLocaleString('en-IN', options).replace(',', '');
  };


  const renderTable = () => (
    <section className="font-poppins text-white px-16">
      <div className="shadow-lg rounded-lg overflow-hidden bg-opacity-30 bg-black backdrop-blur-lg border border-gray-500">
        <div className="max-h-[73vh] overflow-y-auto no-scrollbar">
          <table className="w-full table-fixed border-collapse border border-gray-700">
            <thead className="bg-opacity-90 bg-black sticky top-0 z-10 text-xl">
              <tr>
                <th
                  scope="col"
                  className="w-1/4 py-4 px-6 text-center text-white border border-gray-700 font-semibold uppercase"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="w-1/4 py-4 px-6 text-center text-white border border-gray-700 font-semibold uppercase"
                >
                  Car Plate Number
                </th>
                
                <th
                  scope="col"
                  className="w-1/8 py-4 px-6 text-center text-white border border-gray-700 font-semibold uppercase"
                >
                  Entry Time
                </th>
                <th
                  scope="col"
                  className="w-1/8 py-4 px-6 text-center text-white border border-gray-700 font-semibold uppercase"
                >
                  Exit Time
                </th>
              </tr>
            </thead>
            <tbody className='text-xl font-normal'>
              {data.map((item, index) => {
                const entryTime = new Date(item.timestamp);
                const exitTime = new Date(entryTime.getTime() + 10 * 60 * 1000); // Add 10 minutes to entry time
                return (
                  <tr key={index} className="bg-opacity-40 bg-black border-b border-gray-700">
                    <td className="py-4 px-6 text-center flex justify-center">
                      {item.Image && item.Image.data && item.Image.contentType && (
                        <img
                          src={getImageSrc(item)}
                          alt={`Car ${index + 1}`}
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                          className="rounded-md"
                        />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">{item.carPlateNumber.toUpperCase()}</td>
                   
                    <td className="py-4 px-6 text-center">
                      {getIndianDateTime(entryTime)} {/* Use Indian date and time for entry */}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getIndianDateTime(exitTime)} {/* Use Indian date and time for exit */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  

return (
  <div className="relative w-full min-h-screen flex flex-col">
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

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent opacity-70"></div>
    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black to-transparent opacity-70"></div>

    {/* Main Content */}
    {isLoading ? (
      <div className="flex justify-center items-center h-full z-10">
        <img src={loader} alt="Loading..." />
      </div>
    ) : (
      <>
        <Navbar />
        <div className="relative flex flex-col items-center text-center py-6 mt-14 pt-14 z-10">
          <h1 className="text-white font-poppins text-5xl pb-4">Welcome Back</h1>
        </div>
        <div className="flex-grow overflow-auto px-4 z-10">{renderTable()}</div>
      </>
    )}
  </div>
);
};

export default CarPlateViewer;

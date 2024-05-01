import { Component } from 'react';
import axios from 'axios';
import {loader} from "../assets/icons"
class CarPlateViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true, // Add isLoading state to track loading status
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem('authToken');
    const headers = {
      Authorization: `${authToken}`,
    };
    axios.get('https://tcpp-backend.onrender.com/data', { headers })
      .then((response) => {
        this.setState({ data: response.data, isLoading: false }); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false }); // Set isLoading to false even if there's an error
      });
  }

  getImageSrc(item) {
    const base64String = new Uint8Array(item.Image.data.data)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const encodedString = btoa(base64String);
    return `data:image/${item.Image.contentType};base64,${encodedString}`;
  }

  getIndianDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleString('en-IN', options).replace(',', '');
  }

  renderTable() {
    return (
      <section className='padding'>
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead className="text-xs uppercase text-black-400 bg-gray-100">
              <tr>
                <th scope="col" className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                  Image
                </th>
                <th scope="col" className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                  Car Plate Number
                </th>
                <th scope="col" className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                  Date and Time
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {this.state.data.map((item, index) => (
                <tr key={index} className="text-black">
                  <td className="py-4 px-6 border-b border-gray-200">
                    {item.Image && item.Image.data && item.Image.contentType && (
                      <img
                        src={this.getImageSrc(item)}
                        alt={`Car ${index + 1}`}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    )}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.carPlateNumber.toUpperCase()}</td>
                  <td className='py-4 px-6 border-b border-gray-200'>{this.getIndianDateTime(item.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
  
    return (
      <div className="flex justify-center items-center h-full">
        {isLoading ? ( // Render loader if isLoading is true, otherwise render table
          <div className="flex justify-center items-center">
            <img src={loader} alt="Loading..." />
          </div>
        ) : (
          this.renderTable()
        )}
      </div>
    );
  }
  
}

export default CarPlateViewer;

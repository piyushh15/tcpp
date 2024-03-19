import { Component } from 'react';
import axios from 'axios';

class CarPlateViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem('authToken');
    const headers = {
      Authorization: `${authToken}`,
    };
    axios.get('http://localhost:5000/data',{headers}).then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
                  {/* <th scope="col" className="px-6 py-3">
                      Price
                  </th> */}
              </tr>
          </thead>
        <tbody className='bg-white'>
        {this.state.data.map((item, index) => (
  <tr key={index} className="text-black">
    <td className="py-4 px-6 border-b border-gray-200">
      {item.Image && item.Image.data && item.Image.contentType && (
        <img
          src={`data:image/${item.Image.contentType};base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(item.Image.data)))}`}
          alt={`Car ${index + 1}`}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      )}
    </td>
    <td className="py-4 px-6 border-b border-gray-200">{item.carPlateNumber}</td>
    <td className='py-4 px-6 border-b border-gray-200'>{item.timestamp}</td>
  </tr>
))}

        </tbody>
    </table>
</div>



      </section>
     


     
    );
  }

  render() {
    return (
      <div >
        {this.renderTable()}
      </div>
    );
  }
}

export default CarPlateViewer;

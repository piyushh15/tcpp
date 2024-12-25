import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken); 
  };

  useEffect(() => {
    checkLoginStatus();
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  return (
    <div className='px-16 py-8 absolute z-10 w-full'>
      <div className='flex justify-around'>
        <div className='flex-1 flex justify-between items-center gap-16 max-lg:hidden'>
          <a href="/"><span className="font-briem text-3xl text-white font-bold">SecureCar</span></a>
          {isLoggedIn ? (
            <>
              <ul>
                <li className="list-none"><button className="font-poppins text-2xl text-white font-semibold" onClick={handleLogout}>Logout</button></li>
              </ul>
            </>
          ) : (
            <>
              <ul className="flex gap-9">
                <li className="list-none"><Link className="font-poppins text-2xl text-white font-semibold" aria-current="page" to="/">Home</Link></li>
                <li className="list-none"><a className="font-poppins text-2xl text-white font-semibold" href="#cardSection">Working</a></li>
                <li className="list-none"><a className="font-poppins text-2xl text-white font-semibold" href="#footerSection">About Us</a></li>
              </ul>
              <ul className="flex gap-9">
                <li className="list-none"><Link className="font-poppins text-2xl text-white font-semibold" aria-current="page" to="/login">Login</Link></li>
                <li className="list-none"><Link className="font-poppins text-2xl text-white font-semibold" aria-current="page" to="/createuser">SignUp</Link></li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

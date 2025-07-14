import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            At Keproduct, we believe sustainability is more than a trend — it's a responsibility. Founded with a passion for nature and craftsmanship, we specialize in eco-conscious bags, side slings, and lifestyle products made from 100% pure hemp — one of the most durable and environmentally friendly materials on Earth.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About us</Link></li>
            <li><Link to="/shipping-delivery" className="hover:underline">ShippingDelivery</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy policy</Link></li>
            <li><Link to="/Terms-And-Conditions" className="hover:underline">Terms&Conditions</Link></li>
            <li><Link to="/Cancellation-Refund" className="hover:underline">Cancellation Refund</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 1146056588</li>
            <li>service@keproduct.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © 2024 KeProduct – All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

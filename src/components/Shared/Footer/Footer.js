import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import i1 from "../../../assets/Bkash-logo.png";
import i2 from "../../../assets/nagad.png";
import i3 from "../../../assets/rocket.png";
import i4 from "../../../assets/Dutch_Bangla_Bank.jpg";
import i5 from "../../../assets/visa-icon.png";
import i6 from "../../../assets/master-card.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const paymentLogos = [i1, i2, i3, i4, i5, i6];

  return (
    <footer className="bg-purple-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-10 justify-between">
          {/* About */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl font-bold mb-4">
              E-commerce <span className="text-violet-600">Site</span>
            </h2>
            <p className="mb-2">
              E-commerce offers stylish and elegant ladies' clothing. Quality and comfort for every woman.
            </p>
            <p className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faLocationDot} /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMobileScreen} /> +01247821156
            </p>
          </div>

          {/* Payment */}
          <div className="flex-1 min-w-[200px]">
            <h6 className="font-bold mb-2">PAYMENT</h6>
            <div className="flex flex-wrap gap-2">
              {paymentLogos.map((logo, idx) => (
                <img key={idx} src={logo} alt="payment-logo" className="h-10 w-auto rounded" />
              ))}
            </div>
          </div>

          {/* User Area */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">USER AREA</h6>
            <ul className="space-y-1">
              <li>My Account</li>
              <li>Cart</li>
              <li>
                <Link to="/bloghome" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">INFORMATION</h6>
            <ul className="space-y-1">
              <li>Information</li>
              <li>Terms & Conditions</li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Guide & Help */}
          <div className="flex-1 min-w-[150px]">
            <h6 className="font-bold mb-2">GUIDE AND HELP</h6>
            <ul className="space-y-1">
              <li>Career</li>
              <li>Order Returns</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-center font-semibold">
          &copy;{currentYear} E-commerce. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

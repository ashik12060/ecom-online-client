import React from "react";
import PhoneLogin from "../components/PhoneLogin/PhoneLogin";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { CartProvider } from "../hooks";

const LoginSeller = () => {
  return (
    <div className="bg-secondary">
      <PhoneLogin className="py-5" />
      <Footer />
    </div>
  );
};

export default LoginSeller;

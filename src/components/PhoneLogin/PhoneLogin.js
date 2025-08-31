import React from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../Firebase/PhoneAuth/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "./PhoneLogin.css";
import { Navigate } from "react-router-dom";

const PhoneLogin = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

// PhoneLogin.js (Update the onOTPVerify function)
function onOTPVerify() {
  setLoading(true);
  window.confirmationResult
    .confirm(otp)
    .then(async (res) => {
      console.log(res);
      const token = await res.user.getIdToken();
      localStorage.setItem('token', token); // Store token in localStorage
      setUser(res.user);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}




  return (
    <section className="log-bg py-5">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white fs-2">
            👍Login Success
            <Navigate to="/seller" />
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center text-white fw-bold border-bottom border-1 mb-6">
              Seller Log-in
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white log-color w-25 mx-auto mt-4 p-4 rounded-circle">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="fw-bold fs-5 text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className=" log-bg-2 border-0 fw-bold fs-5 w-100  py-3 my-3 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white log-color w-25 mx-auto mt-4 p-4 rounded-circle">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="fw-bold fs-5 py-3 text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="log-bg-2 border-0 fw-bold fs-5 w-100  py-3 my-3 text-white rounded mb-5"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhoneLogin;


// import React, { useState } from "react";
// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";
// import OtpInput from "otp-input-react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { auth } from "../../Firebase/PhoneAuth/firebase.config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import "./PhoneLogin.css";
// import { Navigate } from "react-router-dom";

// const PhoneLogin = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//         callback: (response) => {
//           onSignup();
//         },
//         "expired-callback": () => {},
//       });
//     }
//   }

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();
//     const appVerifier = window.recaptchaVerifier;
//     const formatPh = "+" + ph;
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sended successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   async function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         const idToken = await res.user.getIdToken();
//         localStorage.setItem("idToken", idToken);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }

//   return (
//     <section className="log-bg py-5">
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <h2 className="text-center text-white fs-2">
//             👍Login Success
//             <Navigate to="/seller-account" />
//           </h2>
//         ) : (
//           <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//             <h1 className="text-center text-white fw-bold border-bottom border-1 mb-6">
//               Seller Log-in
//             </h1>
//             {showOTP ? (
//               <>
//                 <div className="bg-white log-color w-25 mx-auto mt-4 p-4 rounded-circle">
//                   <BsFillShieldLockFill size={30} />
//                 </div>
//                 <label htmlFor="otp" className="fw-bold fs-5 text-white text-center">
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   OTPLength={6}
//                   otpType="number"
//                   disabled={false}
//                   autoFocus
//                   className="opt-container"
//                 ></OtpInput>
//                 <button
//                   onClick={onOTPVerify}
//                   className=" log-bg-2 border-0 fw-bold fs-5 w-100  py-3 my-3 text-white rounded"
//                 >
//                   {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                   <span>Verify OTP</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white log-color w-25 mx-auto mt-4 p-4 rounded-circle">
//                   <BsTelephoneFill size={30} />
//                 </div>
//                 <label htmlFor="" className="fw-bold fs-5 py-3 text-white text-center">
//                   Verify your phone number
//                 </label>
//                 <PhoneInput country={"bd"} value={ph} onChange={setPh} />
//                 <button
//                   onClick={onSignup}
//                   className="log-bg-2 border-0 fw-bold fs-5 w-100  py-3 my-3 text-white rounded mb-5"
//                 >
//                   {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                   <span>Send code via SMS</span>
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PhoneLogin;

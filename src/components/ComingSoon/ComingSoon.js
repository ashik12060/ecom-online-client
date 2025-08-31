// import { faFacebook, faLinkedin, faSquareInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'

// const ComingSoon = () => {
//   return (
//     <div className='flex flex-row sm:flex-column justify-evenly p-20'>
//         <div className='p-10 border-2 text-xl'>
//             <h5 className='text-4xl'>Social Media Live Links</h5>
//             <nav className="space-x-6 pt-10 text-white">
//                       <a href="/" className="bg-blue-700 px-4 py-2 rounded-full">
//                         <FontAwesomeIcon icon={faFacebook} /> Facebook
//                       </a>
//                       <a href="/" className="bg-red-600 px-4 py-2 rounded-full">
//                         <FontAwesomeIcon icon={faYoutube} /> Youtube
//                       </a>

//                       <a href="/" className="bg-pink-700 px-4 py-2 rounded-full">
//                         <FontAwesomeIcon icon={faSquareInstagram} /> Instagram
//                       </a>
//                     </nav>

//         </div>
//         <div className='p-10 border-2 '>
//             <h4 className='text-2xl font-bold'>Coming Soon ...</h4>
//         </div>
//     </div>
//   )
// }

// export default ComingSoon
import { faFacebook, faLinkedin, faSquareInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ComingSoon = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between px-6 sm:px-20 py-10 space-y-6 lg:space-y-0 lg:space-x-10 max-w-screen-xl mx-auto">
      {/* Social Media Links Section */}
      <div className="p-6 border-2 rounded-lg w-full lg:w-1/2 bg-white">
        <h5 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center lg:text-left">Social Media Live Links</h5>
        <nav className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
          <a
            href="/"
            className="flex items-center justify-center bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
          >
            <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Facebook
          </a>
          <a
            href="/"
            className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            <FontAwesomeIcon icon={faYoutube} className="mr-2" /> Youtube
          </a>
          <a
            href="/"
            className="flex items-center justify-center bg-pink-700 text-white px-4 py-2 rounded-full hover:bg-pink-800 transition"
          >
            <FontAwesomeIcon icon={faSquareInstagram} className="mr-2" /> Instagram
          </a>
        </nav>
      </div>

      {/* Coming Soon Section */}
      <div className="p-6 border-2 rounded-lg w-full lg:w-1/2 bg-white">
        <h4 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">Coming Soon ...</h4>
      </div>
    </div>
  );
};

export default ComingSoon;

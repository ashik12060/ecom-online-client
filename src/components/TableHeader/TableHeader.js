// import {
//   faAngleDown,
//   faAngleRight,
//   faBars,
//   faBed,
//   faBullhorn,
//   faChargingStation,
//   faChildReaching,
//   faGifts,
//   faPercent,
//   faPerson,
//   faPersonDress,
//   faShop,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import { Link } from "react-router-dom";


// const TableHeader = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <>
//       <table className=" w-100 d-flex container">
      
//           <tr className="border py-3 w-50 d-flex justify-content-around bg-color text-white align-items-center ">
//             <th>
//               <li className="nav-item dropdown list-unstyled text-decoration-none ">
//                 <div
//                   className="nav-link w-100"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <FontAwesomeIcon icon={faBars} />
//                   <span className="px-sm-1 px-5 fw-bold ">
//                     Browse Categories
//                   </span>
//                   <FontAwesomeIcon icon={faAngleDown} />
//                 </div>
//                 <ul className="dropdown-menu list-unstyled mt-2">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="fw-bold">
//                           <FontAwesomeIcon
//                             icon={faPerson}
//                             className="pe-1 fw-bold"
//                           />
//                           Men
//                         </span>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>

//                   <li className="custom">
//                     <a className="dropdown-item" href="#">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="fw-bold">
//                           <FontAwesomeIcon icon={faPersonDress} />
//                           Women
//                         </span>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>

//                   <li>
//                     <a className="dropdown-item" href="#">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="fw-bold">
//                           <FontAwesomeIcon icon={faChildReaching} />
//                           Baby & Kids
//                         </span>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>

//                   <li>
//                     <a className="dropdown-item" href="#">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="fw-bold">
//                           <FontAwesomeIcon icon={faChargingStation} />
//                           Electronics
//                         </span>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>

//                   <li>
//                     <a className="dropdown-item" href="#">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="fw-bold">
//                           <FontAwesomeIcon icon={faBed} />
//                           Home & Living
//                         </span>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                       </div>
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </th>
//           </tr>
      
//           <tr className="border py-2 w-50 side-bar d-flex justify-content-center align-items-center">
//           <td>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="form-control"
//             />
//           </td>
//         </tr>
       
//           <tr className=" border-lg-1 py-2  side-bar w-100 d-flex justify-content-center align-items-center">
//             <td className="font-color fw-bold">
//               <div className="px-3 side-bar">
//                 <FontAwesomeIcon className="pe-1" icon={faShop} />
//                 SHOP
//               </div>
//             </td>
//             <td>
//               <div className="pe-3 side-bar fw-bold">
//                 <FontAwesomeIcon className="pe-1" icon={faPercent} />
//                 OFFER & DISCOUNT
//               </div>
//             </td>
//             <td>
//               <div className="pe-3 fw-bold side-bar">
//                 <FontAwesomeIcon className="pe-1" icon={faGifts} />
//                 GIFT CART
//               </div>
//             </td>
//             <td className="fw-bold  side-bar">
//               <FontAwesomeIcon className="pe-1 " icon={faBullhorn} />
//               MEGA OFFER
//             </td>
//           </tr>
//           <tr className="border py-2 w-50  side-bar  d-flex justify-content-center align-items-center">
//             <th className=" side-bar">HOTLINE: 0123456789</th>
//           </tr>
//       </table>
//     </>
//   );
// };

// export default TableHeader;


// import {
//   faAngleDown,
//   faAngleRight,
//   faBars,
//   faBed,
//   faBullhorn,
//   faChargingStation,
//   faChildReaching,
//   faGifts,
//   faPercent,
//   faPerson,
//   faPersonDress,
//   faShop,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React from "react";
// import { Link } from "react-router-dom";
// import './TableHeader.css'; // Make sure to create and import a CSS file

// const TableHeader = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <div className="table-header-container ">
//       <div className="header-row">
//         <div className="browse-categories">
//           <li className="nav-item dropdown list-unstyled text-decoration-none">
//             <div
//               className="nav-link"
//               href="#"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <FontAwesomeIcon icon={faBars} />
//               <span className="px-sm-1 px-5 fw-bold text-black">Browse Categories</span>
//               <FontAwesomeIcon icon={faAngleDown} />
//             </div>
//             <ul className="dropdown-menu list-unstyled mt-2">
//               <li>
//                 <a className="dropdown-item" href="#">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold">
//                       <FontAwesomeIcon
//                         icon={faPerson}
//                         className="pe-1 fw-bold text-black"
//                       />
//                       Men
//                     </span>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li className="custom">
//                 <a className="dropdown-item" href="#">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black">
//                       <FontAwesomeIcon icon={faPersonDress} />
//                       Women
//                     </span>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black">
//                       <FontAwesomeIcon icon={faChildReaching} />
//                       Baby & Kids
//                     </span>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black">
//                       <FontAwesomeIcon icon={faChargingStation} />
//                       Electronics
//                     </span>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </div>
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black">
//                       <FontAwesomeIcon icon={faBed} />
//                       Home & Living
//                     </span>
//                     <FontAwesomeIcon icon={faAngleRight} />
//                   </div>
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </div>




//         <div className="search-products">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="form-control"
//           />
//         </div>
//         <div className="additional-info">
//         <div className="info-item text-black">
//           <FontAwesomeIcon className="pe-1" icon={faShop} />
//           SHOP
//         </div>
//         <div className="info-item text-black">
//           <FontAwesomeIcon className="pe-1" icon={faPercent} />
//           OFFER & DISCOUNT
//         </div>
//         <div className="info-item text-black">
//           <FontAwesomeIcon className="pe-1" icon={faGifts} />
//           GIFT CART
//         </div>
//         <div className="info-item text-black">
//           <FontAwesomeIcon className="pe-1" icon={faBullhorn} />
//           MEGA OFFER
//         </div>
//       </div>
//       <div className="hotline text-black">HOTLINE: 0123456789</div>
//       </div>

     
//     </div>
//   );
// };

// export default TableHeader;



import {
  faAngleDown,
  faAngleRight,
  faBars,
  faBed,
  faBullhorn,
  faChargingStation,
  faChildReaching,
  faGifts,
  faPercent,
  faPerson,
  faPersonDress,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './TableHeader.css';

const TableHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="table-header-container">
      <div className="header-row pt-4 px-5">
        <div className="browse-categories ">
          <li className="nav-item dropdown list-unstyled text-decoration-none bg-color text-white d-flex align-items-center justify-content-center p-2 mx-3 rounded">
            <a
              className="nav-link dropdown-toggle p-2"
              href="#"
              id="dropdownMenu"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon  icon={faBars} />
              <span className="px-sm-1 px-5 fw-bold mx-2 ">Browse Categories</span>
              {/* <FontAwesomeIcon icon={faAngleDown} /> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon
                        icon={faPerson}
                        className="pe-1 fw-bold"
                      />
                      Men
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="custom">
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faPersonDress} />
                      Women
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faChildReaching} />
                      Baby & Kids
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faChargingStation} />
                      Electronics
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black">
                      <FontAwesomeIcon icon={faBed} />
                      Home & Living
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </div>

        <div className="search-products  mx-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="additional-info d-none d-lg-flex gap-4">
          <div className="info-item font-color fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faShop} />
            SHOP
          </div>
          <div className="info-item text-black fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faPercent} />
            OFFER & DISCOUNT
          </div>
          {/* <div className="info-item text-black fw-bold">
            <FontAwesomeIcon className="pe-1" icon={faGifts} />
            GIFT CART
          </div> */}
          {/* <div className="info-item text-black">
            <FontAwesomeIcon className="pe-1" icon={faBullhorn} />
            MEGA OFFER
          </div> */}
        </div>

        <div className="hotline d-none d-lg-flex  fw-bold border border-1 align-items-center p-3 text-black">HOTLINE: 0123456789</div>
      </div>
    </div>
  );
};

export default TableHeader;


import { faAngleRight, faPerson, faPersonDress, faChildReaching, faChargingStation, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

const SideNav = () => {
  return (
    <div className="side-bar">
      <div className="rounded sidebar border bg-white">
        <h6 className="bg-sidebar py-4 text-center fs-5 rounded  font-color fw-bold">
          PRODUCT CATEGORIES
        </h6>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav d-flex flex-column">

                <div className="btn-group dropend d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faPerson} className="pe-1" />
                    Men
                  </button>
                  <button
                    type="button"
                    className="btn btn-white dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropend</span>
                  </button>

                  <ul className="dropdown-menu">
                    <div className="mx-2 py-2">
                      <div className="d-flex justify-content-between">
                        <li>
                          <Link
                            to="/clothing"
                            className="text-decoration-none text-black"
                          >
                            Clothing
                          </Link>
                        </li>
                        <FontAwesomeIcon
                          className="pt-1 ps-3"
                          icon={faAngleRight}
                        />
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <li>
                          <Link
                            to="/accessories"
                            className="text-decoration-none text-black"
                          >
                            Accessories
                          </Link>
                        </li>
                        <FontAwesomeIcon
                          className="pt-1 ps-3"
                          icon={faAngleRight}
                        />
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <li>
                          <Link
                            to="/shoes"
                            className="text-decoration-none text-black"
                          >
                            Shoes
                          </Link>
                        </li>
                        <FontAwesomeIcon
                          className="pt-1 ps-3"
                          icon={faAngleRight}
                        />
                      </div>
                    </div>
                  </ul>
                </div>
                <hr />

                <div className="btn-group dropend d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faPersonDress} className="pe-1" />
                    Women
                  </button>
                  <button
                    type="button"
                    className="btn btn-white dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropend</span>
                  </button>

                  <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/traditional-wear"
                          className="text-decoration-none text-black"
                        >
                          Traditional Wear
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/bags"
                          className="text-decoration-none text-black"
                        >
                          Bags
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/watches"
                          className="text-decoration-none text-black"
                        >
                          Watches
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                  </ul>
                </div>
                <hr />

                <div className="btn-group dropend d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faChildReaching} className="pe-1" />
                    Baby & Kids
                  </button>
                  <button
                    type="button"
                    className="btn btn-white dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropend</span>
                  </button>

                  <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/baby-gear"
                          className="text-decoration-none text-black"
                        >
                          Baby Gear
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/kids-toys"
                          className="text-decoration-none text-black"
                        >
                          Kids Toys
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/feeding"
                          className="text-decoration-none text-black"
                        >
                          Feeding
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/nursery"
                          className="text-decoration-none text-black"
                        >
                          Nursery
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                  </ul>
                </div>
                <hr />

                <div className="btn-group dropend d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faChargingStation} className="pe-1" />
                    Electronics
                  </button>
                  <button
                    type="button"
                    className="btn btn-white dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropend</span>
                  </button>

                  <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/computer-accessories"
                          className="text-decoration-none text-black"
                        >
                          Computer Accessories
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/mobile-accessories"
                          className="text-decoration-none text-black"
                        >
                          Mobile Accessories
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/printer"
                          className="text-decoration-none text-black"
                        >
                          Printer
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                  </ul>
                </div>
                <hr />

                <div className="btn-group dropend d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faBed} className="pe-1" />
                    Furniture
                  </button>
                  <button
                    type="button"
                    className="btn btn-white dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropend</span>
                  </button>

                  <ul className="dropdown-menu">
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/bedroom"
                          className="text-decoration-none text-black"
                        >
                          Bedroom
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/living-room"
                          className="text-decoration-none text-black"
                        >
                          Living Room
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/home-office"
                          className="text-decoration-none text-black"
                        >
                          Home Office
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mx-2 pt-2">
                      <li>
                        <Link
                          to="/kitchen-dining"
                          className="text-decoration-none text-black"
                        >
                          Kitchen & Dining
                        </Link>
                      </li>
                      <FontAwesomeIcon
                        className="pt-1 ps-3"
                        icon={faAngleRight}
                      />
                    </div>
                    <hr />
                  </ul>
                </div>
                <hr />
                
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;


//-----------------------------------------------------------------------React
import React from "react";
//-----------------------------------------------------------------------CSS
import "./navbar.css";
//-----------------------------------------------------------------------React-Router-DOM
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">
                  Inicio <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li>
                <Link to="/productos">Producos</Link>
              </li>
              <li>
                <Link to="presupuesto">Presupuesto</Link>
              </li>
              <li>
                <Link to="#">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

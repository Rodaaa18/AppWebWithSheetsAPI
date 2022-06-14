import React from 'react'
import "./navbar.css"
//R-R-D
import {
  Link
} from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/">Inicio <span className="sr-only">(current)</span></Link></li>
              <li><Link to="/productos">Producos</Link></li>
              <li><Link to="presupuesto">Presupuesto</Link></li>
              <li><Link to="#">Contacto</Link></li>
            </ul>      
          </div>
        </div>
      </nav>
  </header>
      /*<header>
        <nav className="navbar_top navbar fixed-top navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_nav"
            >
              <span className="burger navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar__home">
                <li>
                  <Link className="navbar__item" to="/">
                    INICIO
                  </Link>
                </li>
                <li>
                  <Link className="navbar__item" to="/productos">
                    PRODUCTOS
                  </Link>
                </li>
                <li>
                  <Link className="navbar__item" to="/presupuesto">
                    PRESUPUESTO
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>  */   
  );
}

export default Navbar
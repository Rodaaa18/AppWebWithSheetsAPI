import React from 'react'
import "./navbar.css"
//R-R-D
import {
  Link
} from "react-router-dom";
import swal from 'sweetalert';
const Navbar = () => {

  const alert=()=>{
    swal("Estos precios están en Dolares", "Recivirás el precio total con respecto al valor del día", "info");;
  }
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
            <ul className="nav_ul nav navbar-nav">
              <li><Link to="/">Inicio <span className="sr-only">(current)</span></Link></li>
              <div class="dropdown__btn dropdown">
                <button class="btn_dd btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Productos
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><Link to="/productos">Señalización</Link></li>
                  <li><Link onClick={alert} to="/tachos">Tachos</Link></li>
                  <li><Link onClick={alert} to="/luces-led">Luces Led</Link></li>
                  <li><Link to="/vallas">Vallas</Link></li>
                  <li><Link to="/cestos">Cestos</Link></li>
                  <li><Link to="/reductores">Reductores</Link></li>
                  <li><Link to="/pisos">Pisos</Link></li>
                </ul>
              </div>
              <li><Link to="presupuesto">Presupuesto</Link></li>
              <li><Link to="#">Contacto</Link></li>
            </ul>      
          </div>
        </div>
      </nav>
  </header>
  );
}

export default Navbar
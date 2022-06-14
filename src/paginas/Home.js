import "./Home.css";
import {Link} from "react-router-dom";
import img from "./Taller_mecanico.jpg";
import {useState} from "react";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
     <body className="body">
      <div className="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel">
      <ol className="carousel-indicators">
        <li data-target="#bs-carousel" data-slide-to="0" className="active"></li>
        <li data-target="#bs-carousel" data-slide-to="1"></li>
        <li data-target="#bs-carousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="item slides active">
          <div className="slide-1"></div>
          <div className="hero">
            <hgroup>
                <h1 id="titulo">CALIDAD</h1>        
                <h3>Contamos con los mejores Productos y Calidad del Mercado.</h3>
            </hgroup>
          </div>
        </div>
        <div className="item slides">
          <div className="slide-2"></div>
          <div className="hero">        
            <hgroup>
                <h1>SEGURIDAD</h1>        
                <h3>Trabajamos de la mano con las Normas acuales.</h3>
            </hgroup>       
          </div>
        </div>
        <div className="item slides">
          <div className="slide-3"></div>
          <div className="hero">        
            <hgroup>
                <h1>CONFIANZA</h1>        
                <h3>Nos respaldan años de trabajo con Clientes conformes.</h3>
            </hgroup>
          </div>
        </div>
      </div> 
    </div>      
       <section className="main">
          <aside className="left">
            <div className="home__body__container__aside">
              <div className="img" />
              <Link className="home__body__container__aside__title" to="" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleShow}>
                  SERVICIOS
              </Link>
            </div>
          </aside>
          <aside className="right">
            <div className="home__body__container__aside">
              <div className="img2"/>
              <Link className="home__body__container__aside__title" to="/productos">
                  PRODUCTOS
              </Link>
            </div>
          </aside>
      </section> 
    </body>
    
  )
}

export default Home
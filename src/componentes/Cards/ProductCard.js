import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = (props) => {
  const { content, handleSubmit } = props;
  const [cantidad, setCantidad] = useState(Number(content.cantidad));

  return (
    <div className="container-flex contenedor col-xs-12 col-sm-6 col-md-8 col-lg-12">
      <Card className="card_body">
        <div className="card-header">
          <h5 className="card-title">{content.descripcion}</h5>
        </div>
        <div className="card__body">
          <img
            className="card__img"
            src={content.imagen}
            alt="Imagen del Producto"
          />
          <p className="precio_unitario_text">Precio Unitario:</p>
          <p className="precio_unitario">{content.precio}</p>
          <label className="card_body_text"> Cantidad: </label>
          <input
            className="cantidad"
            type="number"
            value={cantidad}
            min="0"
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <button
          className="btn__card btn btn-secondary glyphicon glyphicon-shopping-cart"
          type="submit"
          onClick={() => handleSubmit(content, cantidad)}
        >
          {" "}
          <p id="agregar">Agregar</p>
        </button>
      </Card>
    </div>
  );
};

export default ProductCard;

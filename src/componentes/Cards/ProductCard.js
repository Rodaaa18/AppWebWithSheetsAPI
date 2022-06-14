import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = (props) => {
  const { content, handleSubmit } = props;

  const [cantidad, setCantidad] = useState(Number(content.CANTIDAD));

  return (
    <div className="col-md-12">
      <Card className="card_body">
        <div className="card-header">
          <h5 className="card-title">{content.DESCRIPCION}</h5>
        </div>
        <div className="card__body">
          <img src={content.IMAGEN} alt="Imagen del Producto" />
          Precio Unitario:
          <p>{content.PRECIO_UNITARIO}</p>
          <label className="card_body_text">
            {" "}
            Cantidad:
            <input
              className="cantidad"
              type="number"
              value={cantidad}
              min="0"
              onChange={(e) => setCantidad(e.target.value)}
            />
          </label>
        </div>
        <button
          className="btn__card btn btn-primary glyphicon glyphicon-shopping-cart"
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

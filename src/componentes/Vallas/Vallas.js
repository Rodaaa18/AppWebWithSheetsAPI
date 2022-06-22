import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../redux/actions/productActions";
import "../Productos/Productos.css";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import ProductCard from "../Cards";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const Vallas = () => {
  const [vallasList, setVallasList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const products = useSelector((state) => state.productStates.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/products/vallas").then((res) => {
      setLoading(false);
      setVallasList(res.data.filter((piso) => piso["id"]));
    });
  }, []);

  const handleSubmit = (valla, cantidad) => {
    valla.cantidad = cantidad;
    valla.total = cantidad * formatPrice(valla.precio);
    dispatch(addProducts(valla));
  };
  const formatPrice = (number) => {
    return Number(number.replace(/[$.]/g, "").replace(",", "."));
  };
  
  useEffect(() => {
    setTotal(products.reduce((prev, curr) => (prev += curr.total), 0));
  }, [products]);

  return (
    <>
    <div className="spinner">
      <ClipLoader color="black" loading={loading} size={150}/>
    </div> 
    <section className="body_card">
      <article className="container-flex">
        <div className="row">
          {!isEmpty(vallasList) &&
            vallasList.map((valla, index) => (
              <ProductCard
                key={index}
                content={valla}
                handleSubmit={handleSubmit}
                products={products}
              />
            ))}        
        </div>
        <div>
          <strong
            className="total"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="No inlcuye Precio de envío"
          >
            TOTAL CON IVA: {`$${total}`}
          </strong>
          <strong className="total__sub">(No incluye precio de envío)</strong>
          <Link className="total__sub2" to="/presupuesto">
            Ver presupuesto{" "}
          </Link>
        </div>
      </article>
    </section>
    </>
  );
};

export default Vallas;

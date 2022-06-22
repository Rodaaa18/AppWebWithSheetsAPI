import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../redux/actions/productActions";
import "../Productos/Productos.css";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import ProductCard from "../Cards";

const Tachos = () => {
  const [tachosList, setTachosList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const products = useSelector((state) => state.productStates.products);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:8000/products/tachos").then((res) => {
      setTachosList(res.data.filter((piso) => piso["id"]));
    });
  }, []);

  const handleSubmit = (tacho, cantidad) => {
    tacho.cantidad = cantidad;
    tacho.total = cantidad * formatPrice(tacho.precio);
    dispatch(addProducts(tacho));
  };
  const formatPrice = (number) => {
    return Number(number.replace(/[$.]/g, "").replace(",", "."));
  };
  
  useEffect(() => {
    setTotal(products.reduce((prev, curr) => (prev += curr.total), 0));
  }, [products]);

  return (
    <section className="body_card">
      <article className="container-flex">
        <div className="row">
          {!isEmpty(tachosList) &&
            tachosList.map((tacho, index) => (
              <ProductCard
                key={index}
                content={tacho}
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
  );
};

export default Tachos;


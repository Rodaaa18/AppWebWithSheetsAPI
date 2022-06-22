import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import axios from "axios";
import { addProducts } from "../../redux/actions/productActions";
import ClipLoader from "react-spinners/ClipLoader";
// Componentes
import ProductCard from "../Cards";

//CSS
import "./Productos.css";

// Mock data - En caso de que se bloque el request
import { productListMock } from "../../mockdata/mockProductList";

const Productos = () => {
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.productStates.products);

  const dispatch = useDispatch();
  // setProductList(response.data.filter((product) => product["id"]));
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/products/senalizacion")
      .then((response) => {
        setLoading(false);
        setProductList(response.data.filter((product) => product["id"]));
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("LISTA DE PRODUCTOS ACTUALIZADA CON MOCK DATA");
        setProductList(productListMock);
      });
  }, []);

  const handleSubmit = (product, cantidad) => {
    product.cantidad = cantidad;
    product.total = cantidad * formatPrice(product.precio);
    console.log(product);
    dispatch(addProducts(product));
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
          {!isEmpty(productList) &&
            productList.map((product, index) => (
              
              <ProductCard
                key={index}
                content={product}
                handleSubmit={handleSubmit}
                products={products}
              />
            )) } 
        </div>
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
      </article>
    </section>
    </>
  );
};

export default Productos;

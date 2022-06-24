import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import axios from "axios";
import { addProducts } from "../../redux/actions/productActions";
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert";
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
        setLoading(false);
        console.log("Error: ", error);
        console.log("LISTA DE PRODUCTOS ACTUALIZADA CON MOCK DATA");
        setProductList(productListMock);
      });
  }, []);

  const handleSubmit = (product, cantidad) => {
    let finded = products.find((products) => products.id === product.id);
    if(cantidad > 1000){
      swal({
        title: "Error",
        text: "La cantidad maxima es de 1000",
        icon: "error",
      });
      return;
    };
    if(products.length !== 0 && finded != undefined){
      if(finded){
        swal({
          title: "Alerta",
          text: `El producto ya esta en el carrito (Tienes ${finded.cantidad} agregados), desea sumarle ${cantidad}?`,
          icon: "warning",
          buttons: ["Cancelar", "Agregar"],
        }).then(resp=>{
          if(resp){
            finded.cantidad = Math.floor(finded.cantidad);
            cantidad = Math.floor(cantidad);
            if((finded.cantidad += cantidad) >1000){
              swal({
                title: "Error",
                text: "La cantidad maxima es de 1000",
                icon: "error",
              });
              return finded.cantidad -= cantidad;
            }else{
              debugger;
              finded.total = finded.cantidad * formatPrice(finded.precio);
              dispatch(addProducts(finded));
              swal({
                title: "Agregado",
                text: `se agregó ${product.descripcion} al carrito`,
                icon: "success",
                timer: 800
              });
            };      
            return;
          }else{
            swal({
              title: "Alerta",
              text: `Operación cancelada`,
              icon: "warning",
            });
          };
        });
      };
      return;
    };
    product.cantidad = cantidad;
    product.total = cantidad * formatPrice(product.precio);
    dispatch(addProducts(product)); 
    swal({
      title: "Agregado",
      text: `se agregó ${product.descripcion} al carrito`,
      icon: "success",
      timer: 800
    });
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
          TOTAL CON IVA: {`$${total.toFixed(2)}`}
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

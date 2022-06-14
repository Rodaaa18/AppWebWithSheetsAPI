import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from 'lodash';
import axios from 'axios';
import {addProducts} from "../../redux/actions/productActions";

// Componentes
import ProductCard from '../Cards';

//CSS
import "./Productos.css";

// Mock data - En caso de que se bloque el request
import { productListMock } from '../../mockdata/mockProductList';

const Productos = () => {
    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState(0);

    const products = useSelector(state => state.productStates.products)

    const dispatch = useDispatch();

    useEffect(() => {
        axios({url:'https://sheet.best/api/sheets/e123321a-0b6e-41cf-8e97-5dc15bc2ae6e'})
        .then(response => setProductList(response.data.filter(product => product["CODIGO_FABRICA"])))
        .catch(error => {
            console.log("Error: ",error)
            console.log("LISTA DE PRODUCTOS ACTUALIZADA CON MOCK DATA")
            setProductList(productListMock)
        })
    }, [])

    const handleSubmit = (product, cantidad) =>{
        product.CANTIDAD = cantidad;
        product.TOTAL =(cantidad * formatPrice(product.PRECIO_UNITARIO));

        dispatch(addProducts(product));
    }

    const formatPrice = (number) => {
        return Number(number.replace(/[$.]/g,"").replace(",","."))
    }
    useEffect(() => {
        setTotal(products.reduce((prev, curr) => prev+=curr.TOTAL,0))
    }, [products])
    
    return (
        <section className="body_card">
            <article className="container-flex">
                <div className="row">
                  {!isEmpty(productList) && productList.map((product, index) => (
                    <ProductCard  key={index} content={product} handleSubmit={handleSubmit} products={products}/> 
                    
                ))} 
                </div> 
                <strong className="total" data-bs-toggle="tooltip" data-bs-placement="top" title="No inlcuye Precio de envío">TOTAL CON IVA:{" "}{`$${total}`}</strong>         
                <strong className="total__sub">(No incluye precio de envío)</strong>  
                <Link className="total__sub2" to="/presupuesto">Ver presupuesto </Link>                     
            </article>
        </section>
    )
}

export default Productos;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Presupuesto.css";


const Presupuesto = () => {
  
  const products = useSelector((state) => state.productStates.products);
  const [total, setTotal] = useState(0);

  const calcTotal =()=>{
    setTotal(products.reduce((prev, curr) => prev += curr.TOTAL, 0))
  }
  useEffect(() => {
    calcTotal();
  }, [products]);

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.DESCRIPCION}</td>
              <td>{product.CANTIDAD}</td>
              <td>{product.TOTAL}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>TOTAL: {total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Presupuesto
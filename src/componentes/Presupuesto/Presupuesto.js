import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProducts } from "../../redux/actions/productActions";
import "./Presupuesto.css";
import axios from "axios";
import swal from "sweetalert";

const Presupuesto = () => {
  const products = useSelector((state) => state.productStates.products);
  const [total, setTotal] = useState(0);
  const [nombreRazon, setNombreRazon] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [precio_tot, setPrecio_tot] = useState(0);
  const dispatch = useDispatch();

  const calcTotal = () => {
    setTotal(products.reduce((prev, curr) => (prev += curr.total), 0));
  };

  useEffect(() => {
    calcTotal();
  }, [products]);

  const eliminarProducto = (value) => {
    swal({
      title: "¿Estas seguro?",
      text: `Eliminaras el Producto ${value.descripcion}`,
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
    }).then((resultado) => {
      if (resultado) {
        // Hicieron click en "Sí"
        dispatch(removeProducts(value));
        swal("Eliminado", `¡${value.descripcion} eliminado!`, "success");
      } else {
        // Dijeron que no
        swal({
          title: "Cancelado",
          text: `No se elimino el Producto ${value.descripcion}`,
          icon: "error",
          timer: 800,
        });
      }
    });
  };
  const enviarEmail = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8000/email/form",
          {
            nombreRazon,
            direccion,
            telefono,
            email,
            products,
            total,
            precio_tot,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if (res.data === "received") {
            swal(
              "Email enviado Correctamente!",
              "Recibirás respuesta a la brevedad",
              "success"
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="form" action="" onSubmit={enviarEmail}>
        <table className="tabla">
          <thead>
            <tr>
              <th>Descripción</th>
              <th className="thCantidad">Cantidad</th>
              <th className="thTotal">Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="tr">
                <td className="description__data">
                  <input
                    disabled="true"
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    value={product.descripcion}
                  />
                </td>
                <td className="tdCantidad">
                  <input
                    disabled="true"
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    value={product.cantidad}
                  />
                </td>
                <td className="tdTotal">
                  <input
                    disabled="true"
                    type="number"
                    name="total"
                    id="total"
                    value={product.total}
                    onChange={(e) => setPrecio_tot(e.target.value)}
                  />
                </td>
                <td className="tdBtn">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => eliminarProducto(product)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>TOTAL: </td>
              <td className="total_tot">
                <input
                  disabled="true"
                  type="number"
                  name="total_tot"
                  id="total_tot"
                  value={total}
                />
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="line" />
        <div className="form__body">
          <label htmlFor="nombreRazon">
            Nombre o Razón Social:
            <input
              type="text"
              name="nombreRazon"
              id="nombreRazon"
              onChange={(e) => setNombreRazon(e.target.value)}
            />
          </label>
          <label htmlFor="direccion" id="direccionLabel">
            Dirección (Calle, N°, Piso, Barrio, CP, Localidad, Provincia):
            <input
              type="text"
              name="direccion"
              id="direccion"
              onChange={(e) => setDireccion(e.target.value)}
            />
          </label>
          <label htmlFor="telefono">
            Teléfono:
            <input
              type="tel"
              name="telefono"
              id="telefono"
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Enviar Presupuesto
        </button>
      </form>
    </div>
  );
};

export default Presupuesto;

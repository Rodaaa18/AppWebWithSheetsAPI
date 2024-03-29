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
  const [responsable, setResponsable] = useState("");
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
    
    if(products.length === 0){
      swal("Error", "¡No se encuentran Productos!", "error");
      return;
    }
    if(nombreRazon === "" || direccion === "" || telefono === "" || email === "" || responsable === ""){
    swal("Error", "¡Todos los campos son obligatorios!", "error");
    return;
    }      
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) === false){
      swal("Error", "¡La dirección de email " + email + " es incorrecta!.", "error");
      return;
    }
    
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
            responsable,
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
            return swal(
              "¡Email enviado Correctamente!",
              "¡Recibirás respuesta a la brevedad, Los precios indicados pueden ser modificados sin previo aviso",
              "success"
            );
          }
        });
    }catch (err) {
      return swal(
        "¡No se puede enviar el Presupuesto!",
        `Fallo en la API, error ${err}`,
        "error"
      );
      console.log(err);
    } 
  };
    
  
  return (
    <div className="container">      
      <form className="form" action="" onSubmit={enviarEmail}>
      <div className="nota_center">
        <h1>Nota de Pedido</h1>
      </div>
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
                    disabled={true}
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    value={product.descripcion}
                  />
                </td>
                <td className="tdCantidad">
                  <input
                    disabled={true}
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    value={product.cantidad}
                  />
                </td>
                <td className="tdTotal">
                  <input
                    disabled={true}
                    type="text"
                    name="total"
                    id="total"
                    value={`$ ${product.total.toFixed(2).replace(".", ",")}`}
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
                  disabled={true}
                  type="text"
                  name="total_tot"
                  id="total_tot"
                  value={`$${total.toFixed(2).replace(".", ",")}`}
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
          <label htmlFor="responsable">
            Responsable:
            <input
              type="text"
              name="responsable"
              id="responsable"
              onChange={(e) => setResponsable(e.target.value)}
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
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button className="btn_color btn btn-secondary" type="submit">
          Enviar Nota de Pedido
        </button>
      </form>
    </div>
  );
};

export default Presupuesto;

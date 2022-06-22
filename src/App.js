//-----------------------------------------------------------------------Components
import Home from "./paginas/Home/Home";
import Navbar from "./componentes/Navbar/Navbar";
import Productos from "./componentes/Productos";
import Presupuesto from "./componentes/Presupuesto/Presupuesto";
//-----------------------------------------------------------------------CSS
import "./App.css";
//-----------------------------------------------------------------------React-Router-DOM
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import axios from "axios";
import Cestos from "./componentes/Cestos/Cestos";
import Tachos from "./componentes/Tachos/Tachos";
import Luces from "./componentes/Luces-Led/Luces";
import Vallas from "./componentes/Vallas/Vallas";
import Reductores from "./componentes/Reductores/Reductores";
import Pisos from "./componentes/Pisos/Pisos";

function App() {
  axios.get("http://localhost:8000/").then((res) => console.log(res));

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/productos" exact element={<Productos />} />
        <Route path="/presupuesto" exact element={<Presupuesto />} />
        <Route path="/cestos" exact element={<Cestos />} />
        <Route path="/tachos" exact element={<Tachos />} />
        <Route path="/luces-led" exact element={<Luces />} />
        <Route path="/vallas" exact element={<Vallas />} />
        <Route path="/reductores" exact element={<Reductores />} />
        <Route path="/pisos" exact element={<Pisos />} />
      </Switch>
    </Router>
  );
}

export default App;

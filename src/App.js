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

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/productos" exact element={<Productos />} />
        <Route path="/presupuesto" exact element={<Presupuesto />} />
      </Switch>
    </Router>
  );
}

export default App;

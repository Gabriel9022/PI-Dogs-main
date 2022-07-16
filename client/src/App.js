import './App.css';
import {Route, Switch} from "react-router-dom";

import Formulario from "../src/componentes/Formulario";
import Home from "../src/componentes/Home";
import Landing from "../src/componentes/Landing";
import Nav from "../src/componentes/Nav";
import Detail from "../src/componentes/Detail";


function App() {
  return (
    
    <Switch> 
    <Route exact path="/" component={Landing} />
    <>
    <Nav />
    <Route exact path="/home" component={Home} />
    <Route exact path="/detail/:id" component={Detail} />
    <Route exact path="/formulario"component={Formulario} />
    </>
  </Switch>
  
  );
}

export default App;

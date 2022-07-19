import './App.css';
import {Route, Switch} from "react-router-dom";

import Formulario from "../src/componentes/Formulario";
import Home from "../src/componentes/Home";
import Landing from "../src/componentes/Landing";
import Nav from "../src/componentes/Nav";
import Detail from "../src/componentes/Detail"
import {useState} from "react";

function App() {

  const [currentPage, setCurrentPage] = useState(0)

  return (
    
    <Switch> 
    <Route exact path="/" component={Landing} />
    <>
    <Nav currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <Route exact path="/home"> 
    <Home currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </Route>
    <Route exact path="/detail/:id" component={Detail} />
    <Route exact path="/formulario"component={Formulario} />
    </>
  </Switch>
  
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Layout/footer";
import NavBar from "./components/Layout/navBar";
import Home from './components/Pages/Home'
import Empresa from "./components/Pages/Empresa";
import Contatos from "./components/Pages/Contatos";
import Projetos from "./components/Pages/Projetos";
import NovoProjetos from "./components/Pages/NovoProjetos";
import Project from "./components/Pages/Project";

import Container from "./components/Layout/Container";

function App() {
  return (
    <div className="App">

      <Router>
        <NavBar />

          <Container mudar="altura">
          <Routes>
            <Route  path='/' element={<Home />}/>
            <Route  path='/Empresa' element={<Empresa />}/>
            <Route  path='/Contatos' element={<Contatos />}  />
            <Route  path='/Projetos' element={ <Projetos />} />
            <Route  path='/Novoprojetos' element={<NovoProjetos/>}/>
            <Route  path='/Project/:id' element={<Project/>}/>
            </Routes>
          </Container>

        <Footer />
      </Router>


    </div>
  );
}

export default App;

import {Routes, Route } from 'react-router-dom';
import Principal from './components/views/Principal';
import Cadastro from './components/views/Cadastro';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/Cadastro' element={<Cadastro />} />
        </Routes>
    </div>
  );
}

export default App;
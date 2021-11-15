import logo from './logo.svg'
import './App.css'
import './components/layout/NavBar'
import Navabar from './components/layout/NavBar'
import Header from './components/layout/Header'
import Main from './components/layout/Main';

function App() {
  return (
    <div className="App">
      <Navabar/>
      <Header/>
      <Main/>     

    </div>
  );
}

export default App;

import logo from '../../logo.svg'
import '../css/Principal.css';
import '../layout/NavBar';
import Navabar from '../layout/NavBar';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function Principal() {
  return (
    <div className="Principal">
      <Navabar/>
      <Header/>
      <Main/>
      <Footer/>     

    </div>
  );
}

export default Principal;

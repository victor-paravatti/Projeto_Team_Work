import React, { Component } from "react";
import M from 'materialize-css/dist/js/materialize.min.js'

class Header extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
          });
    }



    render() {
        return (
            <div>
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img src="https://lorempixel.com/580/250/nature/1"/> 
                            <div className ="caption center-align">
                            <h3>É hora de brilahar!</h3>
                            <h5 className ="light grey-text text-lighten-3">O trabalho em equipe engrandece as pessoas</h5>
                            </div>
                        </li>
                        <li>
                            <img src="https://lorempixel.com/580/250/nature/2"/> 
                            <div className ="caption left-align">
                            <h3>Temos integração com GitHub para vc ficar desperocupado</h3>
                            <h5 className ="light grey-text text-lighten-3">Indo sempre na vanguarda da tecnologia</h5>
                            </div>
                        </li>
                        <li>
                            <img src="https://lorempixel.com/580/250/nature/3"/> 
                            <div className ="caption right-align">
                            <h3>Nunca para de sonhar com uma equipe unida </h3>
                            <h5 className ="light grey-text text-lighten-3">Pense grande 
                            </h5>
                            </div>
                        </li>
                        <li>
                            <img src="https://lorempixel.com/580/250/nature/4"/> 
                            <div className ="caption center-align">
                            <h3>Siga o seu caminho </h3>
                            <h5 className ="light grey-text text-lighten-3"></h5>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default Header

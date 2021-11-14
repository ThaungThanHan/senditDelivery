import '../styles/Header.scss';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <div class="Header">
                    <div style={{display:'flex',justifyContent:'space-around',width:'10rem'}}class="Header--left">
                        <p>human</p>
                        <p>Contact Us</p>
                    </div>
                    <Link to="/"><h1 class="Header_logo">MovieSearch</h1></Link>
            </div>
        );
    }
}

export default Header;
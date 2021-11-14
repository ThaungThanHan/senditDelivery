import '../styles/Frontpage.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
const Frontpage  = () => {
        return (
            <div class="Frontpage">
                <Header/>
                <div class="trackingsearch">
                    <h2 class="trackingsearch--title">
                        Track your parcels to see where they are!
                    </h2>
                    <input class="trackingsearch--search" placeholder="Enter your tracking ID" type="search" />
                    <h4>or if you would like to order pickup,</h4>
                    <a href="/sendpickuporder">Send pickup order now!</a>
                </div>
                <div class="calltoaction">
                    <div class="calltoaction--1">
                        one
                    </div>
                    <div class="calltoaction--2">
                        Join us!
                    </div>
                    <div class="calltoaction--3">
                        Two
                    </div>
                </div>
            </div>
        );
    };

export default Frontpage;
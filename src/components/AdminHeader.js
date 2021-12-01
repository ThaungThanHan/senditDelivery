import '../styles/AdminHeader.scss';
import React, { Component } from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../firebaseconfig'
import { onAuthStateChanged, signOut, getAuth } from '@firebase/auth';
import { useEffect } from 'react/cjs/react.development';
const AdminHeader = () => {
        const [user,setUser] = useState({});
        useEffect(()=>{
          onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
        })
        })

        const signout = () => {
          const auth = getAuth();
          signOut(auth);
        }
        return (
            <nav style={{marginLeft:0,zIndex:0}}className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">Dashboard</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">
                    {user ? user.email : null}
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a onClick={()=>signout()} className="nav-link">
                    {user ? "Signout" : null }
                </a>
              </li>
            </ul>
        
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                  <i className="fas fa-search"></i>
                </a>
                <div className="navbar-search-block">
                  <form className="form-inline">
                    <div className="input-group input-group-sm">
                      <input class="form-control form-control-navbar" type="search" placeHolder="Search" aria-label="Search"/>
                      <div className="input-group-append">
                        <button class="btn btn-navbar" type="submit">
                          <i className="fas fa-search"></i>
                        </button>
                        <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </nav>
        );
    }

export default AdminHeader;
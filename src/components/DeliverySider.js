import '../styles/AdminDashboard.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';

const DeliverySider = () => {
    return (
        
<aside style={{top:"9.5rem",height:"100%"}}  className="adminsider">
<div className="sidebar">
  <nav className="mt-2">
    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      <li className="nav-item">
        <a href="#" className="nav-link">
          <p>
            Orders
            <i className="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a href="/delivery/dashboard" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Available Orders</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/delivery/your_orders" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Your Orders</p>
            </a>
          </li>
        </ul>
      </li>
      </ul>
      </nav>
      </div>
      </aside>
    )
}

export default DeliverySider;



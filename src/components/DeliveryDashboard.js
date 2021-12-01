import '../styles/AdminDashboard.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import DeliverySider from './DeliverySider';
import AvailableOrders from './AvailableOrders';
import DeliveryOrders from './DeliveryOrders';
import {auth} from '../firebaseconfig';
import { onAuthStateChanged } from '@firebase/auth';


const DeliveryDashboard = () => {
    const [currentNav,setcurrentNav] = useState("");
    useEffect(()=>{
        const currenturl = window.location.href;
        const lastsegment = currenturl.substring(currenturl.lastIndexOf('/')+1);
        setcurrentNav(lastsegment);
    },[])
    return(
        <div style={{minWidth:"0rem"}}>
            <AdminHeader/>
            <div class="dashboardbody">
                <DeliverySider/>
                <div class="dashboardbody--body">
                    {currentNav == "dashboard" ?
                    <AvailableOrders/>
                : <DeliveryOrders/>}

                </div>
            </div>
        </div>
    )
}

export default  DeliveryDashboard;
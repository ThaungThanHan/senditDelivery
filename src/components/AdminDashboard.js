import '../styles/AdminDashboard.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import AdminSider from './AdminSider';
import PendingOrders from './PendingOrders';
import {auth} from '../firebaseconfig';
import { onAuthStateChanged } from '@firebase/auth';

const AdminDashboard = () => {
    const [currentNav,setcurrentNav] = useState("");
    useEffect(()=>{
        const currenturl = window.location.href;
        const lastsegment = currenturl.substring(currenturl.lastIndexOf('/')+1);
        setcurrentNav(lastsegment);
        console.log(lastsegment)
    },[])
    return(
        <div style={{minWidth:"0rem"}}>
            <AdminHeader/>
            <div class="dashboardbody">
                <AdminSider/>
                <div class="dashboardbody--body">
                    <PendingOrders/>
                </div>
            </div>
        </div>
    )
}

export default  AdminDashboard;
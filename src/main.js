import React from 'react';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Frontpage from './components/Frontpage';
import CreatePickup from './components/createpickuporder';
import AdminLogin from './components/adminlogin';
import AdminDashboard from './components/AdminDashboard';
import PendingOrders from './components/PendingOrders';
import DeliveryLogin from './components/DeliveryLogin';
import DeliveryDashboard from './components/DeliveryDashboard';
const Main = () => {
    return(
        <div>
        <Router>
            <Switch>
            <Route path="/" exact><Frontpage/></Route>
            <Route path="/sendpickuporder" exact><CreatePickup/></Route>\
            <Route path="/admin/login" exact><AdminLogin/></Route>
            <Route path="/admin/dashboard" exact><AdminDashboard/></Route>
            <Route path="/admin/dashboard/pendingorders" exact><PendingOrders/></Route>
            <Route path="/delivery/login" exact><DeliveryLogin/></Route>
            <Route path="/delivery/dashboard" exact><DeliveryDashboard/></Route>
            <Route path="/delivery/your_orders" exact><DeliveryDashboard/></Route>
            </Switch>
        </Router>
        </div>
    )
};

export default Main;
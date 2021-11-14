import '../styles/createpickuporder.scss';
import React, { Component } from 'react';
import Header from './Header';
import {useState, useEffect} from 'react';
import {db} from '../firebaseconfig';
import {collection,addDoc} from 'firebase/firestore';
import {Link} from 'react-router-dom';
const CreatePickup = () => {
    const[newName,setnewName] = useState("");
    const[newPhone,setnewPhone] = useState("");
    const[newAddress,setnewAddress] = useState("");
    const[newCity,setnewCity] = useState("");
    const[newTypeofitem,setnewTypeofitem] = useState("");
    const[newRname,setnewRname] = useState("");
    const[newRphone,setnewRphone] = useState("");
    const[newRaddress,setnewRaddress] = useState("");
    const[newRcity,setnewRcity] = useState("");

    const puordersCollectionRef = collection(db,"pickuporders");

    const createOrder = async() => {
        await addDoc(puordersCollectionRef,{name:newName,phone:newPhone,address:newAddress,city:newCity,
        typeofitem:newTypeofitem,r_name:newRname,r_phone:newRphone,r_address:newRaddress,r_city:newRcity});
        window.location.href = "/";
    }
    return(
            <div>
            <Header/>
            <div class="pickuppage">
                <div class="pickupform">
                    <h3 style={{textAlign:"center",marginBottom:'0.5rem'}}>Create a pickup form</h3>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Name</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewName(event.target.value);}} placeholder="Enter Your Name"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Phone Number</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewPhone(event.target.value)}} placeholder="Enter Your Phone Number"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Address</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewAddress(event.target.value)}} placeholder="Enter Your Address"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">City</label>
                            <select onChange={(event)=>{setnewCity(event.target.value)}}  name="cities" class="pickupform-searchbar--search">
                                <option>Select Your City</option>
                                <option value="Yangon">Yangon</option>
                                <option value="Mandalay">Mandalay</option>
                                <option value="Naypyitaw">Naypyitaw</option>
                            </select>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Type of Item</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewTypeofitem(event.target.value)}} placeholder="Enter Your Type of Item"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Receiver's Name</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewRname(event.target.value)}} placeholder="Enter Receiver's Name"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Receiver's Phone</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewRphone(event.target.value)}} placeholder="Enter Receiver's Phone"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Receiver's Address</label>
                            <input class="pickupform-searchbar--search" 
                            onChange={(event)=>{setnewRaddress(event.target.value)}} placeholder="Enter Receiver's Address"/>
                        </div>
                        <div class="pickupform-searchbar">
                            <label class="pickupform-searchbar--label">Receiver's City</label>
                            <select onChange={(event)=>{setnewRcity(event.target.value)}}  name="cities" class="pickupform-searchbar--search">
                                <option>Select Receiver's City</option>
                                <option value="Yangon">Yangon</option>
                                <option value="Mandalay">Mandalay</option>
                                <option value="Naypyitaw">Naypyitaw</option>
                            </select>
                        </div>
                        <button onClick={createOrder} style={{marginTop:"1rem",marginLeft:"10rem"}}>Send Pickup Order</button>
                </div>
                <div class="puforminstruction">
                    <p>instructions</p>
                </div>
            </div>
            </div>
        );
}
export default CreatePickup;
import '../styles/adminlogin.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import {auth} from '../firebaseconfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
const AdminLogin  = () => {
        const [loginEmail,setloginEmail] = useState("");
        const [loginPass,setloginPass] = useState("")
        const [user,setUser] = useState({});

        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })

        const login = async() => {
            try{
                const user = signInWithEmailAndPassword(auth,loginEmail,loginPass);
                window.location.href="/admin/dashboard";
            }catch(error){
                console.log(error.message);
            }
        }
        return (
            <div class="adminlogin">
                <AdminHeader/>

                <div className="form-horizontal">
                <div className="card-body">
                  <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input onChange={(event)=>{setloginEmail(event.target.value)}}
                       type="email" class="form-control" id="inputEmail3" placeHolder="Email"/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                      <input type="password"  onChange={(event)=>{setloginPass(event.target.value)}}
                      class="form-control" id="inputPassword3" placeHolder="Password"/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                      <div className="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck2"/>
                        <label class="htmlForm-check-label" for="exampleCheck2">Remember me</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button onClick={login} className="btn btn-info">Sign in</button>
                </div>
              </div>
            </div>
        );
    };

export default AdminLogin;
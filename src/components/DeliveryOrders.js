import '../styles/AdminDashboard.scss';
import React from 'react';
import ReactModal from 'react-modal';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import {db} from '../firebaseconfig';
import {collection,getDocs,getDoc,doc,updateDoc,addDoc,deleteDoc, query,where} from 'firebase/firestore';
import {getAuth,onAuthStateChanged, sendEmailVerification} from '@firebase/auth';
import {auth} from '../firebaseconfig'

const DeliveryOrders = () => {
    const [isOpen,setisOpen] = useState(false);
    const [isOpenConfirm,setisOpenConfirm] = useState(false);
    const [orders,setOrders] = useState([]);
    const [showOrder,setshowOrder] = useState([]);
    const [User,setUser] = useState({});
    const [confirmOrder,setconfirmOrder] = useState([]);
    const PickupOrdersCollectionRef = collection(db,"pickuporders");
    const OrdersCollectionRef = collection(db,"orders");
    const ActionsCollectionRef = collection(db,"actions")
    
    const showinfo = async(id) => {
      // const q = query(collection(db,"pickuporders"), where("id","==",id));
      const docRef = doc(db,"orders",id);
      const orderDoc = await getDoc(docRef);
      // setshowOrder(orderDoc.docs.map((doc)=>({...doc.data()})));
      console.log(orderDoc.data().name)
      setshowOrder(orderDoc.data());
      console.log(showOrder);
      setisOpen(true);
    }

    const ModalClose = () => {
      setshowOrder({});
      setisOpen(!isOpen)
    }

    const confirmmodal = async(id) => {
      const docRef = doc(db,"orders",id);
      const orderDoc = await getDoc(docRef);
      setconfirmOrder(confirmOrder=>[...confirmOrder,orderDoc.data(),id]);
      setisOpenConfirm(true);


    }
    const confirmorder = async(id,userid) => {
      const docRef = doc(db,"orders",id);
      const newField = {status:"ready to deliver"};
      await updateDoc(docRef,newField);
      const userRef = doc(db,"users",userid);
      const userDoc = await getDoc(userRef);

      if(userDoc && userDoc.data().city == "Yangon"){
        var actiontype = "Arrived at Yangon Warehouse";
      }else if(userDoc && userDoc.data().city == "Mandalay"){
        var actiontype = "Arrived at Mandalay Warehouse";
      }

      const today = new Date();
      const datetime = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
      console.log(datetime)
      console.log(actiontype)
      await addDoc(ActionsCollectionRef,{datetime:datetime,doneby:userDoc.data().name,type:actiontype});

      // console.log(orderDoc.data().address)

    }
    useEffect(()=>{
        const getOrders = async () => {
            const q = query(collection(db,"orders"), where("status","==","picking up"));
            const data = await getDocs(q);
            setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getOrders();
        onAuthStateChanged(auth,(currentUser) => {
          setUser(currentUser);
      })
      console.log(User.uid)
    },[]);
    return(
    <div>
        {showOrder ?
                <ReactModal className="infomodal" isOpen={isOpen}>
                <div style={{maxHeight:'30rem'}}class="card-body table-responsive p-0">
                        <table class="table table-head-fixed text-nowrap">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Address</th>
                              <th>City</th>
                              <th>Item Type</th>
                              <th>Receiver's Name</th>
                              <th>Receiver's Address</th>
                              <th>Receiver's City</th>
                              <th>Receiver's Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{showOrder.id}</td>
                              <td>{showOrder.name}</td>
                              <td><span class="tag tag-primary">{showOrder.phone}</span></td>
                              <td>{showOrder.address}</td>
                              <td>{showOrder.city}</td>
                              <td>{showOrder.itemtype}</td>
                              <td>{showOrder.r_name}</td>
                              <td>{showOrder.r_address}</td>
                              <td>{showOrder.r_city}</td>
                              <td>{showOrder.r_phone}</td>
                            </tr>
                          </tbody>
                        </table>
                        <button onClick={ModalClose}
                        style={{position:"absolute",marginTop:"3rem",width:"5rem",marginLeft:"50rem"}}>
                          Exit
                        </button>
                      </div>
                </ReactModal>
      :
      ""        
      }
        <ReactModal isOpen={isOpenConfirm} className="confirmmodal">
          <h4 style={{textAlign:"center"}}>Are you sure you want to confirm? </h4>
          <div class="confirmmodal--buttons">
            <button onClick={()=>{confirmorder(confirmOrder[1],User.uid)}} class="confirmmodal--buttons-btn">Yes</button>
            <button class="confirmmodal--buttons-btn">No</button>
          </div>
        </ReactModal>

        <h3>Your Orders</h3><hr/>
        <div style={{zIndex:0}} class="row">
          <div class="col-12">
            <div style={{zIndex:0}} class="card">
              <div class="card-header">
                <h3 class="card-title">Fixed Header Table</h3>
                <div class="card-tools">
                  <div class="input-group input-group-sm">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search"/>

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{border:"1px solid red",maxHeight:'30rem'}}class="card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order)=>(
                      <tr>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td><span class="tag tag-primary">{order.status}</span></td>
                      <td>
                          <div class="pendingorder-action">
                            <button onClick = {()=>{showinfo(order.id)}}
                              class="pendingorder-action--button-confirm">Show info</button>
                            <button onClick={()=>{confirmmodal(order.id)}}
                              class="pendingorder-action--button-confirm">Done</button>
                            <button class="pendingorder-action--button-cancel">Cancel</button>
                           </div>
                      </td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
    </div>
    )
}

export default DeliveryOrders;
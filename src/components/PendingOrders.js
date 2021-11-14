import '../styles/AdminDashboard.scss';
import React from 'react';
import ReactModal from 'react-modal';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import {db} from '../firebaseconfig';
import {collection,getDocs,getDoc,doc,updateDoc} from 'firebase/firestore';

const PendingOrders = () => {
    const [isOpen,setisOpen] = useState(false);
    const [isOpenConfirm,setisOpenConfirm] = useState(false);
    const [orders,setOrders] = useState([]);
    const [showOrder,setshowOrder] = useState([]);
    const [confirmOrder,setconfirmOrder] = useState([]);
    const OrdersCollectionRef = collection(db,"pickuporders");
    
    const showinfo = async(id) => {
      // const q = query(collection(db,"pickuporders"), where("id","==",id));
      const docRef = doc(db,"pickuporders",id);
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
      const docRef = doc(db,"pickuporders",id);
      const orderDoc = await getDoc(docRef);
      setconfirmOrder(confirmOrder=>[...confirmOrder,orderDoc.data(),id]);
      setisOpenConfirm(true);
    }
    const confirmorder = async(id) => {
      const newtrackID = 'SI' + Math.floor(100000 + Math.random() * 900000);
      const docRef = doc(db,"pickuporders",id);
      const newField = {trackID:newtrackID,status:"ready for pickup"}
      await updateDoc(docRef,newField);
      window.location.href="/admin/dashboard"
    }
    useEffect(()=>{
        const getPickupOrders = async () => {
            const data = await getDocs(OrdersCollectionRef)
            setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getPickupOrders();
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
                              <th>Date</th>
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
                              <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" showTime="0">{showOrder.date}</SimpleDateTime></td>
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
            <button onClick={()=>{confirmorder(confirmOrder[1])}} class="confirmmodal--buttons-btn">Yes</button>
            <button class="confirmmodal--buttons-btn">No</button>
          </div>
        </ReactModal>

        <h3>Pending Orders</h3><hr/>
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
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order)=>(
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td><SimpleDateTime dateFormat="DMY" dateSeparator="/" showTime="0">{order.date}</SimpleDateTime></td>
                      <td><span class="tag tag-primary">{order.status}</span></td>
                      <td>
                          <div class="pendingorder-action">
                            <button onClick = {()=>{showinfo(order.id)}}
                             class="pendingorder-action--button-confirm">Show info</button>
                            <button onClick={()=>{confirmmodal(order.id)}}
                             class="pendingorder-action--button-confirm">Confirm</button>
                            <button class="pendingorder-action--button-cancel">Cancel</button>
                          </div>
                      </td>
                    </tr>
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

export default PendingOrders;
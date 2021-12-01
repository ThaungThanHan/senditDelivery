import '../styles/AdminDashboard.scss';
import React from 'react';
import ReactModal from 'react-modal';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import AdminHeader from './AdminHeader';
import {db} from '../firebaseconfig';
import {collection,getDocs,getDoc,doc,updateDoc,addDoc,deleteDoc, query,where} from 'firebase/firestore';

const AvailableOrders = () => {
    const [isOpen,setisOpen] = useState(false);
    const [isOpenConfirm,setisOpenConfirm] = useState(false);
    const [orders,setOrders] = useState([]);
    const [showOrder,setshowOrder] = useState([]);
    const [confirmOrder,setconfirmOrder] = useState([]);
    const PickupOrdersCollectionRef = collection(db,"pickuporders");
    const OrdersCollectionRef = collection(db,"orders");
    
    const showinfo = async(id, status) => {
      if(status == "pending"){
        const docRef = doc(db,"pickuporders",id);
        const orderDoc = await getDoc(docRef);
        setshowOrder(orderDoc.data());
      }else if(status == "ready to deliver"){
        const docRef = doc(db,"orders",id);
        const orderDoc = await getDoc(docRef);
        setshowOrder(orderDoc.data());
      }
      console.log(showOrder)
      setisOpen(true);
    }

    const ModalClose = () => {
      setshowOrder({});
      setisOpen(!isOpen)
    }

    const confirmmodal = async(id,status) => {
      if(status == "pending"){
        const docRef = doc(db,"pickuporders",id);
        const orderDoc = await getDoc(docRef);
        setconfirmOrder(confirmOrder=>[...confirmOrder,orderDoc.data(),id]);
      }if(status == "ready to deliver"){
        const docRef = doc(db,"orders",id);
        const orderDoc = await getDoc(docRef);
        setconfirmOrder(confirmOrder=>[...confirmOrder,orderDoc.data(),id]);      
      }
        setisOpenConfirm(true);
    }
    const confirmorder = async(id,status) => {
      if(status == "pending"){
        const docRef = doc(db,"pickuporders",id);
        const orderDoc = await getDoc(docRef);
        await addDoc(OrdersCollectionRef,{name:orderDoc.data().name,phone:orderDoc.data().phone,address:orderDoc.data().address,
          city:orderDoc.data().city,itemtype:orderDoc.data().itemtype,r_name:orderDoc.data().r_name,
          r_phone:orderDoc.data().r_phone,r_address:orderDoc.data().r_address,r_city:orderDoc.data().r_city,
          status:"picking up",});
        await deleteDoc(doc(db,"pickuporders",id));
      }else if(status == "ready to deliver"){
        const docRef = doc(db,"orders",id);
        const orderDoc = await getDoc(docRef);
        
      }
      // console.log(status)

    }
    useEffect(()=>{
        const getPickupOrders = async () => {
            const q = query(collection(db,"pickuporders"), where("status","==","ready for pickup"));
            const q2 = query(collection(db,"orders"),where("status","==","ready to deliver"))
            const data = await getDocs(q);
            const data2 = await getDocs(q2);
            setOrders((data.docs.map((doc)=>({...doc.data(),id:doc.id}))));
        }
        console.log(orders)
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
            <button onClick={()=>{confirmorder(confirmOrder[1],confirmOrder[0].status)}} class="confirmmodal--buttons-btn">Yes</button>
            <button class="confirmmodal--buttons-btn">No</button>
          </div>
        </ReactModal>

        <h3>Available Orders</h3><hr/>
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
                            <button onClick = {()=>{showinfo(order.id,order.status)}}
                              class="pendingorder-action--button-confirm">Show info</button>
                            <button onClick={()=>{confirmmodal(order.id,order.status)}}
                              class="pendingorder-action--button-confirm">Confirm</button>
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

export default AvailableOrders;
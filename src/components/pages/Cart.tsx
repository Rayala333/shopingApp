import React,{useEffect} from 'react';

import { useAppSelecter,useAppDispatch } from '../redux/hooks';
import { removeItem,incrreseItemQuantity,decreaseItemQuantity,getCartTotal} from '../redux/ProductSlice';

import { Link } from 'react-router-dom';

// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import '../css/Cart.css'


const Cart = () => {

  const dispatch = useAppDispatch()

  const products  = useAppSelecter((state)=>state.products)
  const {cart,totalPrice,totalQuantity} = products;

  
  useEffect(()=>{
    dispatch(getCartTotal())
},[cart,dispatch])

  
  return (
    cart.length <= 0 ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh",flexDirection:"column",border:"none"}}>
                          <h3>Cart is empty</h3> 
                          <Link to='/'>
                          <div className="fa-1x" >
                           <i className="fa-solid fa-circle-plus fa-beat" style={{fontSize:"10px",cursor:"pointer",border:"none"}}> click hear to add productes</i>
                          </div></Link>
                        </div>
                        :
    <section className="h-100 gradient-custom">
    <div className="container py-2">
      <div className="row d-flex justify-content-center my-4">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header py-3">
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <h5 className="mb-0">Cart - {cart.length} items</h5>
                  <Link to='/'>
                  <span className="fa-1x">
                    <i className="fa-solid fa-forward fa-beat"></i> click hear to shop
                  </span>
                </Link>

              </div>
              
            </div>
            <div className="card-body">
              {/* <!-- Single item --> */}
              {
                cart.map((e,i)=>(
                  <>
                  <div className="row">
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    {/* <!-- Image --> */}
                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light" style={{display:"flex",justifyContent:"center"}}>
                      <img src={e.image}
                        className="w-50" alt='myimage' />
                      <a href="#!">
                        <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                      </a>
                    </div>
                    {/* <!-- Image --> */}
                  </div>
  
                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    {/* <!-- Data --> */}
                    <p><strong>{e.title}</strong></p>
                    <p>Price: {e.price}</p>
    
                    <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                      title="Remove item" onClick={()=>dispatch(removeItem(e))}>
                      <i className="fas fa-trash"></i>
                    </button>
                    <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                      title="Move to the wish list">
                      <i className="fas fa-heart"></i>
                    </button>
                    {/* <!-- Data --> */}
                  </div>
  
                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    {/* <!-- Quantity --> */}
                    <div className="d-flex mb-4" style={{maxWidth: "300px"}}>
                      <button className="btn btn-primary px-3 me-2" onClick={()=>dispatch(decreaseItemQuantity(e))} 
                                                                  disabled={e.quantity <= 1 ? true : false}>
                        <i className="fas fa-minus"></i>
                      </button>
    
                      <div className="form-outline">
                        {/* <input id="form1" min="0" name="quantity" value={e.quantity} type="number" className="form-control" />
                        <label className="form-label" htmlFor="form1">{e.quantity}</label> */}
                        <input id="form1" min="0" name="quantity" value={e.quantity}  className="form-control" style={{textAlign:"center"}} onChange={()=>null}/>
                      </div>
    
                      <button className="btn btn-primary px-3 ms-2" onClick={()=>dispatch(incrreseItemQuantity(e))}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    {/* <!-- Quantity --> */}
    
                    {/* <!-- Price --> */}
                    <p className="text-start text-md-center">
                      <strong>${e.quantity*e.price}</strong>
                    </p>
                    {/* <!-- Price --> */}
                  </div>
                  </div>
                  <hr className="my-4" />
                  </>
                ))
              }
              
              

              {/* <!-- Single item --> */}
            </div>
          </div>
          {/* <div className="card mb-4">
            <div className="card-body">
              <p><strong>Expected shipping delivery</strong></p>
              <p className="mb-0">12.10.2020 - 14.10.2020</p>
            </div>
          </div> */}
          <div className="card mb-4 mb-lg-0">
            <div className="card-body">
              <p><strong>We accept</strong></p>
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa" />
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express" />
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard" />
              <img className="me-2" width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                alt="PayPal acceptance mark" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Item's Quntaty
                  <span>{totalQuantity}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span><strong>${totalPrice}</strong></span>
                </li>
              </ul>
              <Link to='/'>
              <button type="button" className="btn btn-primary btn-lg btn-block">
                Go to checkout
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
            
  )
}

export default Cart
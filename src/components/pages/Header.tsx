import React,{useState,useEffect} from 'react';
import '../css/Header.css'

import {MDBNavbar,MDBContainer,MDBIcon,MDBNavbarNav,MDBNavbarItem,MDBNavbarToggler,MDBCollapse,
    MDBNavbarLink,MDBBtn,MDBBadge } from 'mdb-react-ui-kit';

import { NavLink } from 'react-router-dom';
import { useAppDispatch,useAppSelecter} from '../redux/hooks';
import { searchProduct } from '../redux/ProductSlice';

const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [search,setSearch] = useState<string>('')

    const dispatch = useAppDispatch()

    const products  = useAppSelecter((state)=>state.products)
    const {cart} = products;

    useEffect(()=>{
        dispatch(searchProduct(search))
    },[dispatch,search])
    
  return (
        <>
        <MDBNavbar expand='lg' light bgColor='light' className='d-none d-lg-block d-xl-block d-md-block sticky-top'>
            <MDBContainer fluid>
                <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0  d-flex align-items-center'>
                    <NavLink to='/' >
                        <MDBIcon fab icon="edge" style={{fontSize:"1.8rem",marginRight:"20px"}}/>
                    </NavLink>  
                    <MDBCollapse navbar open={open} >
                        <MDBNavbarItem className='d-flex  ' >
                            <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct(""))}>
                                        AllProducts
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("electronics"))} >
                                    Electronic
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("men's clothing"))} >
                                    Clothes
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("jewelery"))} >
                                    Jewelery
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBCollapse>
                </MDBNavbarNav>

                <form className='d-flex justify-content-center ' style={{marginLeft:"-300px"}} >
                    <input type='search' className='form-control ' placeholder='Type query' 
                    aria-label='Search'  />
                </form>
                <NavLink to='/cart'>
                    <MDBBtn size='lg' floating style={{ backgroundColor: '#ac2bac' }}  >
                        <MDBIcon fas icon="shopping-basket" size='2x' />
                        
                        <MDBBadge color='danger' notification pill className='position-absolute  top-50  start-75 translate-middle  bg-danger border border-light rounded-circle'>
                            {cart.length}
                            
                        </MDBBadge>
                    </MDBBtn>
                </NavLink>
            </MDBContainer>
        </MDBNavbar>

        {/* //nav bar for mobile */}
        {/* nav bar header */}

        <MDBContainer fluid  className='d-block d-sm-block d-md-none w-100 mb-container sticky-top' >
        
        <MDBNavbar style={{background:"#565656"}} className='sticky-top mb-nav'>
            <MDBContainer fluid  >
                {/* <MDBIcon fas icon="american-sign-language-interpreting"  /> */}
                {/* <MDBIcon fas icon="cat"    /> */}
                <MDBIcon fab icon="edge" style={{color:"#D7CEC7",fontSize:"1.8rem"}}   />
                
                <form className='d-flex justify-content-center ' >
                        <input type='search' className='form-control  ' placeholder='Type query' style={{background:"#d4c4c4"}}
                        aria-label='Search' onChange={(e)=>setSearch(e.target.value)}  />
                </form>
                
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={()=>setOpen(!open)}
                    style={{marginRight:"-10px",color:"#D7CEC7"}}
                >
                    {
                        !open? <MDBIcon icon='bars' fas /> : <MDBIcon fas icon="times" style={{fontSize:"1.5rem"}} />
                    }
                    
                </MDBNavbarToggler>

                <MDBCollapse navbar open={open}>
                    <MDBNavbarNav className='mr-auto m-2 mb-lg-0'>
                        <MDBNavbarItem onClick={()=>setOpen(false)} >
                            
                                <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct(""))}  style={{color:"#D7CEC7",cursor:"pointer"}}>
                                    AllProducts
                                </MDBNavbarLink>
                            
                                <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("electronics"))} style={{color:"#D7CEC7",cursor:"pointer"}}>
                                    Electronics
                                </MDBNavbarLink>
                                <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("men's clothing"))} style={{color:"#D7CEC7",cursor:"pointer"}} >
                                    Clothes
                                </MDBNavbarLink>
                                <MDBNavbarLink active aria-current='page' onClick={()=>dispatch(searchProduct("jewelery"))}  style={{color:"#D7CEC7",cursor:"pointer"}}>
                                    Jewelery
                                </MDBNavbarLink>
                            
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
                
                
            </MDBContainer>

        </MDBNavbar>
        
        {/* //nav footer */}

         <MDBNavbar style={{background:"#565656"}}  className='fixed-bottom '>
            <MDBContainer fluid className='my-2 mx-4' style={{color:"#fff", fontSize:"1.2rem"}}  >
                
              <NavLink to='/' style={{color:"#fff"}}>
                <MDBIcon fas icon="home" />
              </NavLink>
                 
                <MDBIcon fas icon="user" />

                <NavLink to='/cart' style={{color:"#fff"}}>
                    <MDBIcon fas icon="cart-arrow-down" >
                        <MDBBadge color='danger' notification pill className='  translate-middle   '>
                            {cart.length}
                        </MDBBadge>
                    </MDBIcon>
                </NavLink>

            </MDBContainer>

        </MDBNavbar>
         
    </MDBContainer>
        </>
  )
}

export default Header
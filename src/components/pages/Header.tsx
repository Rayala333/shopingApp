import React,{useState} from 'react';
import '../css/Header.css'

import {MDBNavbar,MDBContainer,MDBIcon,MDBNavbarNav,MDBNavbarItem,MDBNavbarToggler,MDBCollapse,
    MDBNavbarLink,MDBBtn,MDBBadge } from 'mdb-react-ui-kit';



const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
    
  return (
        <>
        <MDBNavbar expand='lg' light bgColor='light' className='d-none d-lg-block d-xl-block d-md-block sticky-top'>
            <MDBContainer fluid>
                <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0  d-flex align-items-center'>
                    <MDBIcon fab icon="edge" style={{fontSize:"1.8rem",marginRight:"20px"}}/>
                    <MDBCollapse navbar open={open} >
                        <MDBNavbarItem className='d-flex  ' >
                            <MDBNavbarLink active aria-current='page' >
                                        AllProducts
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page' >
                                    Electronic
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page'  >
                                    Clothes
                            </MDBNavbarLink>
                            <MDBNavbarLink active aria-current='page' >
                                    Jewelery
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBCollapse>
                </MDBNavbarNav>

                <form className='d-flex justify-content-center ' style={{marginLeft:"-300px"}} >
                    <input type='search' className='form-control ' placeholder='Type query' 
                    aria-label='Search'  />
                </form>

                <MDBBtn size='lg' floating style={{ backgroundColor: '#ac2bac' }}  >
                    <MDBIcon fas icon="shopping-basket" size='2x' />
                    
                    <MDBBadge color='danger' notification pill className='position-absolute  top-50  start-75 translate-middle  bg-danger border border-light rounded-circle'>
                        0
                        
                    </MDBBadge>
                </MDBBtn>

            </MDBContainer>
        </MDBNavbar>

        {/* //nav bar for mobile */}
        {/* nav bar header */}

        <MDBContainer fluid  className='d-block d-sm-block d-md-none w-100 mb-container sticky-top' >
        
        <MDBNavbar dark bgColor='primary' className='sticky-top mb-nav'>
            <MDBContainer fluid  >
                {/* <MDBIcon fas icon="american-sign-language-interpreting"  /> */}
                {/* <MDBIcon fas icon="cat"    /> */}
                <MDBIcon fab icon="edge" style={{color:"#fff",fontSize:"1.8rem"}}   />
                
                <form className='d-flex justify-content-center ' >
                        <input type='search' className='form-control  ' placeholder='Type query' 
                        aria-label='Search'   />
                </form>
                
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={()=>setOpen(!open)}
                    style={{marginRight:"-10px",color:"#fff"}}
                >
                    {
                        !open? <MDBIcon icon='bars' fas /> : <MDBIcon fas icon="times" style={{fontSize:"1.5rem"}} />
                    }
                    
                </MDBNavbarToggler>

                <MDBCollapse navbar open={open}>
                    <MDBNavbarNav className='mr-auto m-2 mb-lg-0'>
                        <MDBNavbarItem onClick={()=>setOpen(false)}>
                            
                                <MDBNavbarLink active aria-current='page'  >
                                    AllProducts
                                </MDBNavbarLink>
                            
                                <MDBNavbarLink active aria-current='page' >
                                    Electronics
                                </MDBNavbarLink>
                                <MDBNavbarLink active aria-current='page' >
                                    Clothes
                                </MDBNavbarLink>
                                <MDBNavbarLink active aria-current='page' >
                                    Jewelery
                                </MDBNavbarLink>
                            
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
                
                
            </MDBContainer>

        </MDBNavbar>
        
        {/* //nav footer */}

         <MDBNavbar dark bgColor='primary' className='fixed-bottom '>
            <MDBContainer fluid className='my-2 mx-4' style={{color:"#fff", fontSize:"1.2rem"}}  >
                
              
                    <MDBIcon fas icon="home" />
               
                
                <MDBIcon fas icon="user" />

                
                    <MDBIcon fas icon="cart-arrow-down" >
                        <MDBBadge color='danger' notification pill className='  translate-middle   '>
                            0
                        </MDBBadge>
                    </MDBIcon>
               

            </MDBContainer>

        </MDBNavbar>
         
    </MDBContainer>
        </>
  )
}

export default Header
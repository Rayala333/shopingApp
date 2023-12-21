import React, { useEffect } from 'react';
import '../css/Product.css'

import {MDBCard,MDBCardImage,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardLink} from 'mdb-react-ui-kit';
import { useAppDispatch,useAppSelecter } from '../redux/hooks';
import { getProducts,addtoCart} from '../redux/ProductSlice';
import { useNavigate } from 'react-router-dom';

import { BallTriangle } from  'react-loader-spinner'

const Products = () => {

    const dispatch = useAppDispatch()

    const navgate = useNavigate()

    const products  = useAppSelecter((state)=>state.products)
    const {loading,items,searchData} = products

    // console.log(items,"item")
    
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch,searchData])

    const filterData = items.filter((ele,i)=>{
        if(searchData.length===0){
          return ele
        }else{
          return ele.category.toLowerCase().includes(searchData.toLowerCase())
        }
      })
  return (
    <>
    {
        // loading? <h1 style={{display:"flex",justifyContent:"center",height:"100vh",alignItems:"center"}}>Loading</h1>
      loading? <span style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}> <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#3B71CA"
      ariaLabel="ball-triangle-loading"
      visible={true}
    /></span>
        : 
        <>
          <div className='d-none d-lg-block d-xl-block d-md-block' >
            <div className='container'>
              {
                filterData.map((e,i)=>(
                  <MDBCard className='Card' key={i}>
                      <MDBCardImage src={e.image} alt='...' position='top'  className='cartimage'/>
                      <MDBCardBody>
                          <MDBCardTitle>Title</MDBCardTitle>
                          <MDBCardText>Cart Text</MDBCardText>
                          <MDBCardLink onClick={()=>dispatch(addtoCart(e))} style={{cursor:"pointer"}}>Add To Cart</MDBCardLink>
                          <MDBCardLink href='#'>BY</MDBCardLink>
                      </MDBCardBody>
                  </MDBCard>
                ))
              }
            </div>
          </div>
          <div className='d-block d-sm-block d-md-none w-100'>
              <div className='container1'>
                {
                  filterData.map((e,i)=>(
                    <MDBCard className='card1' key={i} >
                        <MDBCardImage src={e.image} alt='...' position='top'  className='cartimage1'/>
                        <MDBCardBody className='cartbody1'>
                            <MDBCardTitle style={{fontSize:"1rem",height:"35px"}}>{e.title}</MDBCardTitle>
                            <MDBCardTitle style={{fontSize:"0.8rem"}}>${e.price}</MDBCardTitle><hr/>
                            <MDBCardLink href='#' style={{marginTop:"-20px",textAlign:"center"}} onClick={()=>dispatch(addtoCart(e),navgate('/cart'))}>Add To Cart</MDBCardLink>
                        </MDBCardBody>
                        {/* <MDBCardFooter>
                            <MDBCardLink href='#'>Add To Cart</MDBCardLink>
                        </MDBCardFooter> */}
                    </MDBCard>
                  ))
                }
              </div>
          </div>
          
      </>
      }
    </>
  )
}

export default Products
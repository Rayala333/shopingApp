import React from 'react';

import { useAppSelecter } from '../redux/hooks';


const Cart = () => {
  

  const products  = useAppSelecter((state)=>state.products)
  const {cart} = products;

  console.log(cart,"cart")

  console.log()
  return (
    <div>{JSON.stringify(cart)}</div>
  )
}

export default Cart
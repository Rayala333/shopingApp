import React from 'react';

import { useAppDispatch,useAppSelecter } from '../redux/hooks';


const Cart = () => {
  const dispatch = useAppDispatch()

  const products  = useAppSelecter((state)=>state.products)
  const {loading,cart} = products;

  console.log(cart,"cart")

  console.log()
  return (
    <div>Cart</div>
  )
}

export default Cart
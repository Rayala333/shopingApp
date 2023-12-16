import React, { useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const getData = async()=>{
        const result =   await axios.get("http://localhost:3005/products")
        console.log(result.data)
        return result.data
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>Products</div>
  )
}

export default Products
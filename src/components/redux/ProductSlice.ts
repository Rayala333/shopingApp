import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit'

import {RootState} from './Store'

import axios from 'axios';

const storedCart = localStorage.getItem("cart");
const initialCart = storedCart ? JSON.parse(storedCart) : [] ;

interface Item {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    quantity:number;
    image:string
}

interface CounterState {
    loading:boolean,
    items:Item[],
    error:string|null,
    searchData:string,
    cart:Item[] 
  }
const initialState : CounterState = {
    loading:false,
    items:[],
    error:null,
    searchData:"",
    cart:[...initialCart]
}

export const getProducts = createAsyncThunk("getProducts", async()=>{
    const response = await axios.get('https://products-4p5b.onrender.com/products');
    try{
        const result = await response.data 
        // console.log(result,"result")
        return result 
    }catch(error){
        return error
    }
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProduct : (state,action)=>{
            state.searchData = action.payload
            // console.log(action.payload,"searching")
                },
        addtoCart : (state,action)=>{
            let find = state.cart.findIndex((item)=>item.id===action.payload.id)
            if(find>=0){
                state.cart[find].quantity+=1
            }else{
                state.cart.push(action.payload)
                // console.log(action.payload)
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
                state.loading=true
        });
        builder.addCase(getProducts.fulfilled,(state, action: PayloadAction<Item[]>)=>{
                state.loading=false;
                // console.log(action.payload)
                state.items = action.payload
        });
        // builder.addCase(getProducts.rejected,(state, action: PayloadAction<string>)=>{
        //         state.loading=false;
        //         state.error=action.payload
        // })
    }
  });

  export const {searchProduct,addtoCart} = productSlice.actions

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;


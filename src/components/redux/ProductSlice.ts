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
    error:null|string,
    searchData:string,
    cart:Item[] ,
    totalQuantity:number,
    totalPrice:number
  }
const initialState : CounterState = {
    loading:false,
    items:[],
    error:null,
    searchData:"",
    cart:[...initialCart],
    totalQuantity: 0,
    totalPrice:0
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
                },
        removeItem : (state,action)=>{
            state.cart = state.cart.filter((item)=>item.id!==action.payload.id)

            localStorage.setItem("cart", JSON.stringify(state.cart));
                },
        incrreseItemQuantity : (state,action)=>{
                    state.cart = state.cart.map((item)=>{
                        if(item.id===action.payload.id){
                          return {...item,quantity:item.quantity+1}
                        }
                        return item
                    })
    
                    localStorage.setItem("cart", JSON.stringify(state.cart));
            },
        decreaseItemQuantity : (state,action)=>{
                state.cart = state.cart.map((item)=>{
                    if(item.id===action.payload.id){
                      return {...item,quantity:item.quantity-1}
                    }
                    return item
                })
                localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        getCartTotal : (state)=>{
            let {totalQuantity,totalPrice} = state.cart.reduce((cartTotal,cartItem)=>{
                                const {price,quantity} = cartItem
                                const itemTotal = price*quantity
                                cartTotal.totalPrice +=itemTotal
                                cartTotal.totalQuantity += quantity
                                return cartTotal  
            },
            {
                totalPrice:0,
                totalQuantity:0
            }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2))
            // state.totalPrice = totalPrice
            state.totalQuantity = totalQuantity

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
        builder.addCase(getProducts.rejected,(state, action:PayloadAction<any,string>)=>{
                state.loading=false;
                state.error=action.payload;
        })
    }
  });

  export const {searchProduct,addtoCart,removeItem,incrreseItemQuantity,decreaseItemQuantity,getCartTotal} = productSlice.actions

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;


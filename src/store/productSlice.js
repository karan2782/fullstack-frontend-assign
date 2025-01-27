import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        productList:[]
    },
    reducers:{
        addProduct: (state, action)=>{
            state.productList.push(action.payload)
        },
        getProduct: (state)=>{
            return state.productList
        }
    }
})

export const productReducer = productSlice.reducer 
export const {addProduct, getProduct} = productSlice.actions
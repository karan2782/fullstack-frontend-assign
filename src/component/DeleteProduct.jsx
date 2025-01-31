import { Box } from '@chakra-ui/react'
import {Button} from "../components/ui/button"
import React from 'react'

function DeleteProduct({productId, getProducts}) {

    const onDelete = async() =>{
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`https://fullstack-backend-assign.onrender.com/api/product/${productId}`, {
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            const data = await res.json()
            alert(data.message)
            getProducts()
        } catch (error) {
            alert(`Error in deleting ${error}`)
        }
    }
        
  return (
    <Box>
        <Button onClick={onDelete} backgroundColor="red.600">DELETE</Button>
    </Box>
  )
}

export default DeleteProduct

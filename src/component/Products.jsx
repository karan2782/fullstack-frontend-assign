import { Box, Fieldset, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FileUploadTrigger,
  FileUploadRoot,
  FileUploadList,
} from "../components/ui/file-upload";
import { Button } from "../components/ui/button";
import { HiUpload } from "react-icons/hi";


function Products() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();


  console.log(products);
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(name, description, image)

    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("image",image)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://fullstack-backend-assign.onrender.com/api/product`, {
        method:"POST",
        headers:{
          "Authorization":`Bearer ${token}`
        },
        body:formData
      })
      const data = await res.json()
      console.log(data);
      alert(data.message)
    } catch (error) {
      alert(`Error in product creating ${error}`)
    }


  }

  return (
    <Box>

      <Stack alignItems="center" py='8'  >
        <form onSubmit={handleSubmit}>
          <Fieldset.Root
          rounded='md'
            p={["4", "6", "8"]}
            w={["xs", "sm", "md", "lg"]}
            boxShadow= "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          >
            <Stack>
              <Fieldset.Legend textAlign='center' fontSize={["18px", "20px", "26px"]}>Create a product</Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field label="Product Name">
                <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              </Field>

              <Field label="Description">
                <Textarea type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
              </Field>

              
              <Field label="Upload Image">
                <FileUploadRoot>
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="md">
                      <HiUpload />
                    </Button>
                  </FileUploadTrigger>
                  <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
                </FileUploadRoot>
                </Field>
            

              <Button type="submit" backgroundColor='teal'>Create Product</Button>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Stack>
    </Box>
  );
}

export default Products;

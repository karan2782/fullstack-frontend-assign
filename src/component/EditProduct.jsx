import { Box, Fieldset, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import React, { useState } from "react";
import { Button } from "../components/ui/button";

function EditProduct({ product, setUpdateId, getProducts }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    
    
    try {
   
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/product/${product._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      alert(data.message);
      getProducts()
    } catch (error) {
      alert(`Error in updating ${error}`);
    }
    setUpdateId(null)
  };

  return (
    <Box>
      <form onSubmit={handleUpdate}>
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend
              textAlign="center"
              fontWeight="bold"
              fontSize={["18px", "20px", "26px"]}
            >
              Edit Product
            </Fieldset.Legend>
          </Stack>

          <Fieldset.Content>
            <Field label="Name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Field>

            <Field label="Description">
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Field>

            <Button type="submit">Update</Button>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </Box>
  );
}

export default EditProduct;

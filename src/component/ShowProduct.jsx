import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Image, Stack, Text } from "@chakra-ui/react";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

function ShowProduct() {
  const [products, setProducts] = useState([]);

  const [updateId, setUpdateId] = useState(null);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/product`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      //   console.log(data);
      setProducts(data.products);
    } catch (error) {
      alert(`Error in fetching products ${error}`);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //   console.log("products", products);

  return (
    <Box>
      <Text fontSize={["20px"]}>Products</Text>

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap="6"
        p="5"
      >
        {products?.map((item) => (
          <Stack
            border="1px solid black"
            key={item._id}
            align="center"
            p="4"
            justify="space-between"
          >
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Box >
              <Image src={item.image} width="100%" />
            </Box>

            <Stack direction={["column", "row"]} justify="space-around">
              <DeleteProduct productId={item._id} getProducts={getProducts} />

              <Button
                backgroundColor={updateId == item._id ? "red.400" : "green.600"}
                onClick={() =>
                  setUpdateId((prevId) =>
                    prevId == item._id ? null : item._id
                  )
                }
              >
                {updateId == item._id ? "Cancel Editing" : "Edit"}
              </Button>
            </Stack>

            {updateId == item._id && <EditProduct setUpdateId={setUpdateId} product={item} getProducts={getProducts}  />}
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}

export default ShowProduct;

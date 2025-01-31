import React, { useState } from "react";
import { Box, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", "password", email, password);

    try {
      const res = await fetch(`https://fullstack-backend-assign.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      console.log(data);
      alert(data.message);
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/products");
      }
    } catch (error) {
      alert(`Error in login error: ${error}`);
    }
  };

  return (
    <Stack
      justify="center"
      alignItems="center"
      border="2px solid"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Fieldset.Root
          rounded="md"
          width={["xs", "sm", "md", "lg"]}
          p={["3", "5", "6"]}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Stack>
            <Fieldset.Legend
              textAlign="center"
              fontWeight="bold"
              fontSize={["18px", "20px", "26px"]}
            >
              Login
            </Fieldset.Legend>
          </Stack>

          <Fieldset.Content>
            <Field label="Email">
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field label="Password">
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Button type="submit" backgroundColor="teal">
              Login
            </Button>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </Stack>
  );
}

export default LoginForm;

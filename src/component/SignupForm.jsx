import { Box, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import {useNavigate} from "react-router-dom"
import {
  NativeSelectRoot,
  NativeSelectField,
} from "../components/ui/native-select";
import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    gender: "male",
    role:"user",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const user = await fetch(`https://fullstack-backend-assign.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await user.json();

      alert(data.message);
      if(user.ok){
        navigate("/login")
      }
    } catch (error) {
      alert(`Error in creating user ${error}`);
    }
  };

  return (
    <Stack justify="center" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Fieldset.Root
          rounded="md"
          size="lg"
          width={["xs", "sm", "md", "lg"]}
          p={["3", "5", "6"]}
          mt="8"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Stack>
            <Fieldset.Legend
              textAlign="center"
              fontWeight="bold"
              fontSize={["18px", "20px", "26px"]}
            >
              SignUP
            </Fieldset.Legend>
            <Fieldset.HelperText textAlign="center">
              Please provide your information to signup.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            

            <Field label="Full Name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Field>

            <Field label="Email">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Field>

            <Field label="Password">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Field>

            <Field label="Gender">
              <NativeSelectRoot>
                <NativeSelectField
                  name="gender"
                  items={["male", "female", "other"]}
                  value={formData.gender}
                  onChange={handleChange}
                />
              </NativeSelectRoot>
            </Field>

            <Field label="Role">
              <NativeSelectRoot>
                <NativeSelectField
                  name="role"
                  items={["user", "admin"]}
                  value={formData.role}
                  onChange={handleChange}
                />
              </NativeSelectRoot>
            </Field>


            <Button type="submit" backgroundColor="teal">
              Signup
            </Button>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </Stack>
  );
}

export default SignupForm;

import React, { useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/core";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";

import { useAuth } from "../context/AuthContext";

export const Login: React.FC = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "hi+i@alexdunne.net",
    password: "password",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setForm((form) => {
      return {
        ...form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(form);
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box width="100%" maxWidth="28rem">
        <Box bg="white" rounded="md" px={4} py={4} pt={4}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} px={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  width="100%"
                  variant="outline"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  width="100%"
                  variant="outline"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Button
                type="submit"
                width="100%"
                variantColor="blue"
                border="none"
                _focus={{
                  outline: "none",
                  boxShadow: "md",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

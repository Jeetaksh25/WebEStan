import React, { useEffect, useState } from "react";
import { Box, Input, VStack, Button, Container, Text, Spinner, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthStore } from "../store/useAuthStore.js";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  useEffect(() => {
    if (isLoggingIn && !authUser) {
      return (
        <VStack gap={2} justifyContent={"center"} minH={"100vh"}>
          <Spinner
            size="xl"
            thickness="10px"
            speed="0.65s"
            emptyColor="orange"
            color="blue.500"
            justifyContent={"center"}
            css={{ "--spinner-track-color": "colors.gray.400" }}
            borderWidth={"4px"}
          />
          <Text
            fontSize={"2xl"}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            Loading...
          </Text>
        </VStack>
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Container
      w={"full"}
      minH={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      mt={-10}
    >
      <VStack gap={10}>
        <Heading fontSize={"4xl"}>Login</Heading>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={{ base: "100%", sm: "90%", md: "80%", lg: "60%", xl: "50%" }}
        h={"max-content"}
        bg={useColorModeValue("gray.200", "gray.800")}
        mx={"auto"}
        p={5}
        rounded={"md"}

      >
        <VStack gap={4}>
          <Input
            placeholder="Enter Email"
            name="email"
            type="email"
            bg={useColorModeValue("gray.100", "gray.700")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <PasswordInput
            placeholder="Enter Password"
            name="password"
            type="password"
            bg={useColorModeValue("gray.100", "gray.700")}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            visible={showPassword}
            onVisibleChange={setShowPassword}
          />

          <Link to="/signup">Don't have an account</Link>

          <Button onClick={handleSubmit}>Login</Button>
        </VStack>
      </Box>

      </VStack>

    </Container>
  );
};

export default LoginPage;

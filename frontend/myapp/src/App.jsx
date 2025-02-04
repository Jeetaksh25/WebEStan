import { useState, useEffect } from "react";
import { axiosInstance } from "./lib/axios.js";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Text, VStack, Spinner, Container, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode.jsx";

import NavBar from "./comps/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/Profile.jsx";
import Tasks from "./pages/Tasks.jsx";
import Test from "./pages/Test.jsx";
import Connect from "./pages/Connect.jsx";
import Footer from "./comps/Footer.jsx";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
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

  return (
    <>
      <Container w={"100%"} minH={"100vh"} minW={"100%"} bg={useColorModeValue("rgb(254, 240, 216)", "gray.900")}>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/tasks"
            element={authUser ? <Tasks /> : <Navigate to="/login" />}
          />
          <Route path="/test" element={<Test />} />
          <Route
            path="/connect"
            element={authUser ? <Connect /> : <Navigate to="/login" />}
          />
          <Route
            path="/chatbot"
            element={authUser ?
              (<Flex
                direction="column"
                justify="center"
                align="center"
                height="100vh"
                px={4}
              >
                <iframe
                  src="chatbot.htm"
                  width="80%" 
                  height="80%" 
                  style={{ border: "none" }}
                  title="Chatbot"
                ></iframe>
              </Flex>)
              : <Navigate to="/login" />
            }
          />
        </Routes>
      </Container>

      <Toaster />
      <Footer />
    </>
  );
}

export default App;

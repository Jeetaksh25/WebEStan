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
import Chat from "./pages/Chat.jsx";
import Chatbot from "./pages/ChatBot.jsx";

import Loader from "./comps/Loader.jsx";

function App() {
  const { authUser, isCheckingAuth, checkAuth, onlineUsers } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <Loader minH={"100vh"} h={"100%"} />
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
              (<Chatbot/>)
              : <Navigate to="/login" />
            }
          />
          <Route
            path="/freechat"
            element={authUser ? <Chat /> : <Navigate to="/login" />}
          />

        </Routes>
      </Container>

      <Toaster />
      <Footer />
    </>
  );
}

export default App;

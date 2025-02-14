import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Flex,
  IconButton,
  Icon,
  Input,
  Button,
  Textarea,
  Container,
} from "@chakra-ui/react";
import {
  ArrowUpward,
  AttachFile, 
  Close,
  KeyboardArrowDown,
  SentimentSatisfied,
} from "@mui/icons-material";
import Loader from "../comps/Loader";
import { useAIBotStore } from "../store/useAIBotStore";
import { useColorModeValue } from "../components/ui/color-mode";
import Bubble from "../comps/Bubble";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { FaRegImage } from "react-icons/fa6";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    generateBotResponse,
    handleOutgoingMessage,
    isBotLoading,
    resetChat,
    chatHistory,
  } = useAIBotStore();

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      handleOutgoingMessage({
        text: message,
        file: file ? { data: file.data, mime_type: file.type } : null,
      });
      setMessage("");
      setFile(null);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setFile({
        data: base64,
        type: file.type,
        name: file.name,
      });
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const removeFile = () => {
    setFile(null);
  };

  if (isBotLoading) {
    return <Loader />;
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        e.target.getAttribute("data-emoji") !== "true"
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <Container
      w={"6xl"}
      minH={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w={"full"}
        p={10}
        bg={useColorModeValue("rgb(254, 244, 226)", "gray.800")}
        shadow={"md"}
        rounded={"xl"}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Chatbot
          </Text>
        </Flex>

        <Box
          flex={1}
          overflowY="auto"
          h="350px"
          p={5}
          borderRadius="md"
          ref={chatContainerRef}
          bg={useColorModeValue("rgb(255, 255, 255)", "gray.800")}
        >
          {chatHistory.map((msg, index) => (
            <Bubble
              key={index}
              message={msg}
              isMyMessage={msg.role === "user"}
            />
          ))}
        </Box>

        <Flex as="form" mt={3} align="center" onSubmit={sendMessage} gap={2}>
          <Icon
            as={FaRegSmile}
            fontSize={"40px"}
            _hover={{ cursor: "pointer", bg: "gray.300" }}
            p={2}
            transition={"all 0.2s ease-in-out"}
            rounded={"md"}
            data-emoji="true"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          <Input
            type="file"
            display="none"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Icon
              aria-label="Attach file"
              as={FaRegImage}
              fontSize={"30px"}
              _hover={{
                cursor: "pointer",
                color: "blue.500",
                transform: "scale(1.2)",
              }}
              p={0.5}
              transition={"all 0.3s ease-in-out"}
            />
          </label>
          {file && (
            <Flex align="center">
              <Text fontSize="sm">{file.name}</Text>
              <IconButton
                icon={<Close />}
                aria-label="Remove file"
                size="xs"
                onClick={removeFile}
              />
            </Flex>
          )}
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type Prompt ..."
            size="sm"
            resize="none"
          />
          <Icon
            as={IoSend}
            fontSize={"30px"}
            onClick={sendMessage}
            _hover={{
              cursor: "pointer",
              color: "blue.500",
              transform: "scale(1.2)",
            }}
            transition={"all 0.3s ease-in-out"}
          />
        </Flex>
      </Box>

      {showEmojiPicker && (
        <Box
          position="absolute"
          bottom="50px"
          left="10px"
          zIndex="30"
          ref={emojiPickerRef}
        >
          <EmojiPicker
            onEmojiClick={(emojiData) =>
              setText((prev) => prev + emojiData.emoji)
            }
          />
        </Box>
      )}
    </Container>
  );
}

import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  IconButton,
  Container,
  Heading,
  Input,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useChatStore } from "../store/useChatStore";
import React, { useEffect } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import Loader from "./Loader";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

const ChatBubble = ({ message, selectedUser }) => {
  const { authUser } = useAuthStore();
  const isMyMessage = message.senderId === authUser._id;

  const createdAtDate = new Date(message.createdAt);

  const getFormattedDate = (date) => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === now.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formattedTime = createdAtDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <HStack
      spacing={4}
      my={5}
      justifyContent={isMyMessage ? "flex-end" : "flex-start"}
    >
      <VStack alignItems={isMyMessage ? "flex-end" : "flex-start"} gap={1} m={0} p={0}>
        <VStack
          align={"start"}
          maxW={"350px"}
          minW={"100px"}
          gap={1}
          p={4}
          bg={
            isMyMessage
              ? useColorModeValue("rgb(226, 254, 226)", "gray.700")
              : useColorModeValue("rgb(254, 244, 226)", "gray.700")
          }
          color={
            isMyMessage
              ? useColorModeValue("black", "white")
              : useColorModeValue("black", "white")
          }
          roundedTopLeft={"2xl"}
          roundedTopRight={"2xl"}
          roundedBottomLeft={isMyMessage ? "2xl" : "none"}
          roundedBottomRight={isMyMessage ? "none" : "2xl"}
          h={"max-content"}
          justifyContent={"center"}
          overflow={"auto"}
          shadow={useColorModeValue("md", "md")}
        >
          <Text fontSize="md">{message.text}</Text>
          <Text fontSize="xs">
            {getFormattedDate(createdAtDate)} • {formattedTime}
          </Text>
        </VStack>
        {!isMyMessage ? (
          <Text>
            • {isMyMessage ? "You" : selectedUser?.fullName || "Unknown User"} 
          </Text>
        ) : (
          <Text>
            {isMyMessage ? "You" : selectedUser?.fullName || "Unknown User"} •
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default ChatBubble;

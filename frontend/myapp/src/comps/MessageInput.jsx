import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Icon, HStack, VStack, Text } from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useChatStore } from "../store/useChatStore";

const wordsDictionary = [
  "Hello", "Hey", "How", "How are you", "Happy", "Help", "Hope",
  "Good", "Great", "Game", "Going", "Got", "Give", "Thanks",
  "There", "Tomorrow", "Today", "Talk", "Try", "Text", "Team"
];

const MessageInput = ({ messagesContainerRef }) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const emojiPickerRef = useRef(null);
  const { sendMessages } = useChatStore();
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const updateSuggestions = (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const words = input.split(" ");
    const lastWord = words[words.length - 1].toLowerCase();
    const matches = wordsDictionary
      .filter((word) => word.toLowerCase().startsWith(lastWord))
      .slice(0, 5); 

    setSuggestions(matches);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    updateSuggestions(e.target.value);
  };


  const handleKeyDown = (e) => {
    if (suggestions.length === 0) {
      if(e.key === "Enter"){
        handleSendMessage(e);
      }
      return ;
    }


    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    }
  };


  const selectSuggestion = (word) => {
    const words = text.split(" ");
    words[words.length - 1] = word;
    setText(words.join(" ") + " ");
    setSuggestions([]);
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    await sendMessages({ text });
    setText("");
    setSuggestions([]);

    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

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
    <Box w={"full"} p={0} mt={3} border={"black solid 2px"} position="relative" rounded={"md"}>
      <HStack h={"100%"} px={2} justify={"space-between"}>
        <Icon as={FaRegSmile} fontSize={"30px"} _hover={{ cursor: "pointer", bg: "gray.300" }} p={1}
          transition={"all 0.2s ease-in-out"} rounded={"md"} data-emoji="true"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />
        <VStack position="relative" width="100%">
          <Input px={2} py={1} h={"100%"} _focus={{ outline: "none", border: "none" }} outline={"none"}
            border={"none"} fontSize={"xl"} value={text} onChange={handleInputChange} placeholder="Type a message"
            onKeyDown={handleKeyDown}
          />

          {suggestions.length > 0 && (
            <Box position="absolute" bottom="110%" left={0} w="full" bg="white" boxShadow="md" borderRadius="md"
              zIndex={10} overflow="hidden">
              {suggestions.map((word, index) => (
                <Text key={word} px={3} py={2} cursor="pointer" bg={index === selectedIndex ? "gray.300" : "white"}
                  _hover={{ bg: "gray.200" }} onClick={() => selectSuggestion(word)}>
                  {word}
                </Text>
              ))}
            </Box>
          )}
        </VStack>


        <Icon as={IoSend} fontSize={"30px"} onClick={handleSendMessage} _hover={{
          cursor: "pointer", color: "blue.500", transform: "scale(1.2)"
        }} transition={"all 0.3s ease-in-out"} />
      </HStack>

      {showEmojiPicker && (
        <Box position="absolute" bottom="50px" left="10px" zIndex="30" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={(emojiData) => setText((prev) => prev + emojiData.emoji)} />
        </Box>
      )}
    </Box>
  );
};

export default MessageInput;

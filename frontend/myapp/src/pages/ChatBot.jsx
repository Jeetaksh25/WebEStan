import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, Flex, IconButton, Input, Button, Textarea } from '@chakra-ui/react';
import { ArrowUpward, AttachFile, Close, KeyboardArrowDown, SentimentSatisfied } from "@mui/icons-material";
import Loader from '../comps/Loader';
import { useAIBotStore } from '../store/useAIBotStore';

export default function Chatbot() {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    const chatContainerRef = useRef(null);

    const { generateBotResponse, handleOutgoingMessage, isBotLoading, resetChat, chatHistory } = useAIBotStore();

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            handleOutgoingMessage({ text: message, file: file ? { data: file.data, mime_type: file.type } : null });
            setMessage("");
            setFile(null);
        }
    };

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }, [chatHistory]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await toBase64(file);
            setFile({
                data: base64,
                type: file.type,
                name: file.name
            });
        }
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
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

    return (
        <Box w={{ base: "100%", md: "400px" }} h="500px" bg="gray.800" color="white" p={4} borderRadius="md" shadow="md">
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="xl" fontWeight="bold">Chatbot</Text>
                <IconButton icon={<KeyboardArrowDown />} aria-label="Close chatbot" />
            </Flex>

            <Box flex={1} overflowY="auto" h="350px" p={2} bg="gray.700" borderRadius="md" ref={chatContainerRef}>
                {chatHistory.map((msg, index) => (
                    <Flex key={index} justify={msg.role === "user" ? "flex-end" : "flex-start"} my={1}>
                        <Box bg={msg.role === "user" ? "blue.500" : "gray.600"} px={3} py={2} borderRadius="md" maxW="75%">
                            <Text>{msg.parts[0].text}</Text>
                            {msg.parts[1]?.inline_data && (
                                <Text fontSize="sm" color="gray.300">File attached</Text>
                            )}
                        </Box>
                    </Flex>
                ))}
            </Box>

            <Flex as="form" mt={3} align="center" onSubmit={sendMessage} gap={2}>
                <IconButton icon={<SentimentSatisfied />} aria-label="Emojis" />
                <Input type="file" display="none" id="file-upload" onChange={handleFileChange} />
                <label htmlFor="file-upload">
                    <IconButton icon={<AttachFile />} aria-label="Attach file" as="span" />
                </label>
                {file && (
                    <Flex align="center">
                        <Text fontSize="sm">{file.name}</Text>
                        <IconButton icon={<Close />} aria-label="Remove file" size="xs" onClick={removeFile} />
                    </Flex>
                )}
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message.." size="sm" resize="none" />
                <Button type="submit" colorScheme="blue">
                    <ArrowUpward />
                </Button>
            </Flex>
        </Box>
    );
}
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchResponse() {
    if (prompt === "") return alert("Write prompt");
    setNewRequestLoading(true);
    setPrompt("");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
        method: "post",
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      const message = {
        question: prompt,
        answer: response.data.candidates[0].content.parts[0].text,
      };

      setMessages((prev) => [...prev, message]);
      setNewRequestLoading(false);

      await axios.post(
        `${server}/api/chat/${selected}`,
        {
          question: prompt,
          answer: message.answer,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
      setNewRequestLoading(false);
    }
  }

  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setChats(data);
      if (data.length > 0) setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function createChat() {
    setCreateLod(true);
    try {
      await axios.post(
        `${server}/api/chat/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      fetchChats();
      setCreateLod(false);
    } catch (error) {
      toast.error("Something went wrong");
      setCreateLod(false);
    }
  }

  async function fetchMessages() {
    if (!selected) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ✅ UPDATED deleteChat FUNCTION
  async function deleteChat(id) {
    if (!id) {
      console.error("❌ No chat ID provided to deleteChat");
      alert("Chat ID is undefined!");
      return;
    }

    try {
      console.log("🗑️ Deleting chat with ID:", id);

      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      fetchChats();
      window.location.reload();
    } catch (error) {
      console.log("❌ Error while deleting chat:", error);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);

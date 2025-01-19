import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";
import axios from "axios"; // Add axios for file upload

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null); // State for selected file
  const [fileResponse, setFileResponse] = useState(null); // State for upload response

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFileResponse(response.data.filePath); // Save uploaded file path
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i}>
                    <div className="mb-4 p-4 rounded bg-blue-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <CgProfile />
                      </div>
                      {e.question}
                    </div>

                    <div className="mb-4 p-4 rounded bg-gray-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <FaRobot />
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No chat yet</p>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center gap-2"
          >
            <input
              className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="p-4 bg-gray-700 rounded text-white cursor-pointer"
            >
              Upload
            </label>
            <button
              type="button"
              onClick={uploadFile}
              className="p-4 bg-gray-700 text-white"
            >
              Upload File
            </button>
            <button className="p-4 bg-gray-700 rounded-r text-2xl text-white">
              <IoMdSend />
            </button>
          </form>

          {fileResponse && (
            <div className="mt-4">
              {fileResponse.endsWith(".pdf") ? (
                <a href={fileResponse} target="_blank" rel="noopener noreferrer">
                  View Uploaded PDF
                </a>
              ) : (
                <img
                  src={fileResponse}
                  alt="Uploaded"
                  className="max-w-full h-auto"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

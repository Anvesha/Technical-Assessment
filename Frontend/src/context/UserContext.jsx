import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 Login with email
  const loginUser = async (email, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });
      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // ✅ Verify OTP and get token
  const verifyUser = async (otp, navigate) => {
    const verifyToken = localStorage.getItem("verifyToken");
    if (!verifyToken) return toast.error("Missing verification token");

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, { otp, verifyToken });
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // 👤 Fetch current user if token exists
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.error("Fetch user failed:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout and redirect
  const logoutUser = (navigate) => {
    localStorage.clear();
    setIsAuth(false);
    setUser(null);
    toast.success("Logged out successfully");
    if (navigate) navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        loading,
        logoutUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook for context access
export const UserData = () => useContext(UserContext);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp),navigate);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-lg w-full md:w-[500px]"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl mb-4">Enter OTP</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="otp">
            OTP:
          </label>
          <input
            type="numeric"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 border-rounded hover:bg-blue-700">
          {btnLoading? <LoadingSpinner/> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;

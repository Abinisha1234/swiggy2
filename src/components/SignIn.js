import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Toggle between Sign-In and Sign-Up
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (username && password) {
      // Store user data in localStorage (for demo purposes; use secure storage in real apps)
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setError("");
      alert("Sign-up successful! Redirecting to Home page.");
      navigate("/"); // Redirect to Home page after successful sign-up
    } else {
      setError("Please fill in both username and password.");
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      setError("");
      alert("Sign-in successful! Redirecting to Home page.");
      navigate("/"); // Redirect to Home page after successful sign-in
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isSignUp ? "Create an Account" : "Sign In"}
      </h1>
      <form
        onSubmit={isSignUp ? handleSignUp : handleSignIn}
        className="flex flex-col items-center w-80 bg-gray-100 p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button
        onClick={toggleMode}
        className="mt-4 text-blue-600 hover:underline"
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default SignIn;

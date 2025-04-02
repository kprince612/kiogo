import React, { useState } from "react";
import "./App.css";

const allowedEmails = ["princekhandelwal412@gmail.com"]; // List of allowed emails

function App() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const validateEmail = (email) => {
    return allowedEmails.includes(email.toLowerCase()); // Check against full email
  };

  const sendVerificationCode = () => {
    setEmailError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("This email is not allowed. Please use the approved email.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setCodeSent(true);

    console.log(`Verification code for ${email}: ${code}`);
    alert(`A verification code was sent to ${email}.\n(Check the console for the demo code)`);
  };

  const verifyCode = () => {
    setVerificationError("");

    if (inputCode === verificationCode) {
      setIsLoggedIn(true);
    } else {
      setVerificationError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Login System</h2>
          {!codeSent ? (
            <div className="email-section">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {emailError && <p className="error">{emailError}</p>}
              <button onClick={sendVerificationCode}>Send Verification Code</button>
            </div>
          ) : (
            <div className="code-section">
              <label>Enter Verification Code:</label>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter the code"
              />
              {verificationError && <p className="error">{verificationError}</p>}
              <button onClick={verifyCode}>Verify & Login</button>
            </div>
          )}
        </div>
      ) : (
        <div className="welcome-container">
          <h2>Welcome, {email}!</h2>
          <p>You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
}

export default App;

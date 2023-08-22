import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "./Reducers/AuthSlice";
import Footer from "./Footer";
import NavBar from "./NavBar";
const Login = () => {
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email1 || !password1) {
      setErrorMessage1("Please enter your email and password.");
      return;
    }
    const success = await dispatch(login(email1, password1, navigate));
    if (!success) {
      setErrorMessage1("Incorrect email or password.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!email2 || !password2 || !name || !password_confirmation) {
      setErrorMessage2("Please enter your information.");
      return;
    }
    if (password2 !== password_confirmation) {
      setErrorMessage2("Passwords do not match.");
      return;
    }
    const success = await dispatch(
      register(name, email2, password2, password_confirmation, navigate)
    );
    if (!success) {
      setErrorMessage2(
        "Password minimum is 8 characters and email should contain '@'"
      );
    }
  };
  useEffect(() => {
    setErrorMessage1("");
    setErrorMessage2("");
  }, [email1, email2, password1, password2, name]);
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
          <div className="login-reg-panel">
      <motion.div
        className="login-info-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLogin ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div class="overlay-panel">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start journey with us</p>
          <button className="btnlog" onClick={handleToggle}>
            Register
          </button>
        </div>
      </motion.div>

      <motion.div
        className="register-info-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLogin ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div class="overlay-panel2">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <button className="btnlog" onClick={handleToggle}>
            Login
          </button>
        </div>
      </motion.div>

      <motion.div
        className="white-panel"
        initial={{ x: "100%" }}
        animate={{ x: isLogin ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        {isLogin ? (
          <motion.div
            className="login-show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>LOGIN</h2>
            <input
              type="text"
              placeholder="Email"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
            />
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword1 ? faEye : faEyeSlash}
              id="toggle-password1"
              onClick={togglePassword1}
            />
            {errorMessage1 && <p className="error-message">{errorMessage1}</p>}
            <button className="btnlog" onClick={handleLogin}>
              Login
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="register-show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>REGISTER</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword2 ? faEye : faEyeSlash}
              id="toggle-password2"
              onClick={togglePassword2}
            />
            <input
              type={showPassword3 ? "text" : "password"}
              placeholder="Confirm Password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword3 ? faEye : faEyeSlash}
              id="toggle-password3"
              onClick={togglePassword3}
            />
            {errorMessage2 && <p className="error-message">{errorMessage2}</p>}
            <button className="btnlog" onClick={handleRegister}>
              Register
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
    

    </div>
  );
};

export default Login;

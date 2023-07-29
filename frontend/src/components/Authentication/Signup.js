// @ts-nocheck
import React, { useState } from "react";
import HomePage from "../../Pages/Homepage";
import {
  Avatar,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./LoginFromStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router";
import { ChatState } from "../../Context/ChatProvider";
import Loader from "../layouts/Loader";
const Signup = () => {
  const classes = useStyles();
  const toast = useToast();
  const history = useHistory();
  const { setIsAuth } = ChatState();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
   // eslint-disable-next-line
  const [picPreview, setPicPreview] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);

  const submitHandler = async () => {
    setIsLoginDisabled(true);
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("pic", pic);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/user", formData, config);

      if (data) {
        toast({
          title: "User Created Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsLoginDisabled(false);
        setIsAuth(true);
        setIsAuth(true);
      }

      history.push("/chats");
    } catch (error) {
      setIsLoginDisabled(false);
      toast({
        title: error.response.statusText,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
      newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
  };

  const handleAvatarChange = (event) => {
    setPicLoading(true);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPicPreview(reader.result);
        setPic(reader.result);
        setPicLoading(false);
      };
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const isSignInDisabled = !(
    email &&
    password &&
    isValidEmail &&
    confirmPassword &&
    name
  );
  return (
    <>
      <HomePage />

      {picLoading || isLoginDisabled ? (
        <Loader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading} style={{color: "Black"}}>
              Sign Up to Your Account
            </Typography>
              <TextField 
              label="Name"
              variant="outlined"
              fullWidth
              className={`${classes.nameInput} ${classes.textField}`}
              value={name}
                onChange={handleNameChange}
                
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={`${classes.emailInput} ${classes.textField}`}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail}
              helperText={
                !isValidEmail && "Please enter a valid email address."
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className={classes.showPasswordButton}
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              value={password}
              onChange={handlePasswordChange}
            />
              <TextField
                
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    className={classes.showPasswordButton}
                    onClick={handleShowPasswordClick}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

              <div className={classes.root} style={{color: "Black"}}>
                <h1>Upload Your Profile Picture ➡️</h1>
               
              <input
                accept="image/*"
                className={classes.input}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
                <label htmlFor="avatar-input" >
                  
                <Button
                  variant="contained"
                    color="default"
                    
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={classes.button}
                  >
                   
                  <Typography variant="subtitle1">Upload</Typography>
                </Button>
              </label>
            </div>

           
       
            <Button
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              onClick={submitHandler}
            >
              Create Account
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem", color :"black" }}
            >
              Already have an account?
              <Link to="/" className={classes.createAccount}>
                Login
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;

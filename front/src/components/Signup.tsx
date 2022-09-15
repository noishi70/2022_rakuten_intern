import { ChangeEvent, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import axios from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Modal from "./Modal"

type user = {
  username: string;
  password: string;
};


const Signup = () => {
  const [username, getUserName] = useState("");
  const [useremail, getUserEmail] = useState("");
  const [password, getPassWord] = useState("");
  const [showModal, setShowModal] = useState(false);

  const signup = async() => {
    let url = process.env.REACT_APP_API + '/api/auth/provisional_signup';
    const response = await axios.post(url, {email: useremail, name: username, password: password});
    setShowModal(true);
  }

  const ShowModal = () => {
    setShowModal(true);
  };

  return (
    <Grid>
    <Paper
      elevation={3}
      sx={{
        p: 4,
        height: "70vh",
        width: "280px",
        m: "20px auto",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
        alignItems="center"
      >
        <Avatar sx={{ bgcolor: teal[400] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant={"h5"} sx={{ m: "30px" }}>
          Sign In
        </Typography>
      </Grid>
      <TextField
        onChange={(e) => getUserName(e.target.value)}
        label="Username"
        variant="standard"
        value = {username}
        fullWidth
        required
      />
      <TextField
        onChange={(e) => getUserEmail(e.target.value)}
        label="Email"
        variant="standard"
        value = {useremail}
        fullWidth
        required
      />
      <TextField
        onChange={(e) => getPassWord(e.target.value)}
        type="password"
        label="Password"
        variant="standard"
        value = {password}
        fullWidth
        required
      />
      <Box mt={3}>
        <Button
          onClick={() => signup()}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          サインアップ
        </Button>
        <Typography variant="caption" display="block">
          アカウントを持っていますか？
          <Link href="/">ログイン</Link>
        </Typography>
        <Modal showFlag={showModal} setShowModal={setShowModal}/>
      </Box>
    </Paper>
  </Grid>

  );
};

export default Signup;


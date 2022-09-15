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

type user = {
  username: string;
  password: string;
};

type props = {
  setLogin?: (user: user) => void;
};

const Login = (props:props) => {
  const [username, getUserName] = useState("");
  const [password, getPassWord] = useState("");

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
          onChange={(e) => getPassWord(e.target.value)}
          type="password"
          label="Password"
          variant="standard"
          value = {password}
          fullWidth
          required
        />
        {/* ラベルとチェックボックス */}
        <FormControlLabel
          labelPlacement="end"
          label="パスワードを忘れました"
          control={<Checkbox name="checkboxA" size="small" color="primary" />}
        />
        <Box mt={3}>
          <Button
            onClick={() => props.setLogin?.({username,password})}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            サインイン
          </Button>

          <Typography variant="caption">
            <Link href="#">パスワードを忘れましたか？</Link>
          </Typography>
          <Typography variant="caption" display="block">
            アカウントを持っていますか？
            <Link href="/signup">アカウントを作成</Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;

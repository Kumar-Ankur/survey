// components/LoginScreen.js
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    const payload = {
      username,
      password,
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
      .then((res) => {
        if (res.message === 'Login successfully') {
          navigate("/dashboard");
        } else {
          setLoginError(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "6rem" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        {loginError.length > 0 && (
          <Typography variant="h6" align="center" gutterBottom style={{ color: 'red'}}>
            {loginError}
          </Typography>
        )}
        <Typography variant="h4" align="center" gutterBottom>
          {t("login")}
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              disabled={!username || !password}
            >
              {t("login")}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

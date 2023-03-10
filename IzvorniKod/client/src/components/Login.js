import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth'
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ErrorInput} from '../util/ErrorInput'
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';
import axios from '../api/axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {Navigate, useNavigate, Link as ReactLink, useLocation} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import jwt_decode from "jwt-decode";


const LOGIN_URL = "/login";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sahisti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const {setAuth, persist, setPersist} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [usernameEmailCount, setuserNameEmailCount] = useState(false);
  const [passwordCount, setpasswordCount] = useState(false);

  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    setValidUser(user.length !== 0);
  }, [user]);

  useEffect(() => {
    setValidPwd(pwd.length !== 0);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(()=>{
    localStorage.setItem("persist", persist);
  },[persist])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 500);
    
    try{
      const response = await axios.post(LOGIN_URL, 
                JSON.stringify({
                                userName: user,  
                                pwd: pwd}), 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
       
        const accessToken = response?.data?.accessToken;
        setAuth({user, accessToken});                           
       setTimeout(() => {
        setSuccess(true);
        setErrMsg("");
      }, 500);

      navigate(from, {replace: true})
    } catch(err){
      if(!err?.response){
        setErrMsg('Nema odgovora sa servera');
      } else {
        setErrMsg(err.response.data.error)
      }
    }

  };

  const togglePersist = ()=>{
    setPersist(prev => !prev);
  }


  return (
    <>
    {success === true && <Navigate to="/"/>}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {success === false && (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              {errMsg && <Alert severity="error">
                            <AlertTitle>Pogreška</AlertTitle>
                                <strong>{errMsg}</strong>
                        </Alert>}
              <Typography component="h1" variant="h5">
                Prijava
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={11}>
                    <TextField
                      autoFocus
                      inputProps={{ maxLength: 24 }}
                      required
                      fullWidth
                      id="userNameEmail"
                      label="Unesite svoj username"
                      name="userNameEmail"
                      onChange={(e) => {
                        setUser(e.target.value);
                        setuserNameEmailCount(true);
                      }}
                      error={ErrorInput(usernameEmailCount, validUser, userFocus)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validUser ? "validLogin" : "hide"}
                      size="xl"
                    />
                  </Grid>

                  <Grid item xs={12} sm={11}>
                    <TextField
                      inputProps={{ maxLength: 24 }}
                      required
                      fullWidth
                      name="pwd"
                      label="Password"
                      type="password"
                      id="pwd"
                      onChange={(e) => {
                        setPwd(e.target.value);
                        setpasswordCount(true);
                      }}
                      onFocus={() => {
                        setPwdFocus(true);
                      }}
                      onBlur={() => {
                        setPwdFocus(false);
                      }}
                      error={ErrorInput(passwordCount, validPwd, pwdFocus)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "validLogin" : "hide"}
                      size="xl"
                    />
                  </Grid>
                </Grid>
                <Button
                  disabled={
                    !validPwd ||
                    !validUser
                      ? true
                      : false
                  }
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Prijavi se!
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid item >
                  <FormGroup>
                  <FormControlLabel control={<Checkbox id="persis" onChange={togglePersist} checked={persist} />} label="Zapamti me!" />
                </FormGroup>
                  </Grid>
              

                  <Grid item>
                    <Link href="/register" variant="body2">
                      Nemaš profil? Registriraj se!
                    </Link>
                  </Grid>
                </Grid>
               
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export { Login };

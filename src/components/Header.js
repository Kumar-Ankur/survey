import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (e, enable) => {
    if(enable) {
        i18n.changeLanguage('hn')
    } else {
        i18n.changeLanguage('en')
    }
    
  }

  const redirectToLogin = () => {
    navigate('/login');
  }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {t("companyName")}
        </Typography>

        <Button variant="text" style={{ marginRight: '2rem'}} onClick={redirectToLogin}>{t('login')}</Button>

        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="hn"
              control={<><LanguageIcon /> <Switch color="primary" onChange={handleLanguageChange}/></>}
              label="Hindi"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

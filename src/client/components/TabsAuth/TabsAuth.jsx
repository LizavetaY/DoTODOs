import React from 'react';
import { Stack, Tab, Tabs } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { LoginForm } from '../LoginForm';
import { SignUpForm } from '../SignUpForm';
import { TabPanel } from '../TabPanel';

export const TabsAuth = ({
  loadingLoginData = false,
  loginOnSubmit = () => {},
  loadingSignUp = false,
  signUpOnSubmit = () => {}
}) => {
  const [tab, setTab] = React.useState(0);

  const { themeMode } = useThemeMode();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChange} aria-label="Auth tabs">
        <Tab
          label="Login"
          id="auth-tab-0"
          aria-controls="auth-tabpanel-0"
          sx={{ minWidth: '150px' }}
        />
        <Tab
          label="Sign Up"
          id="auth-tab-1"
          aria-controls="auth-tabpanel-1"
          sx={{ ml: '10px', minWidth: '150px' }}
        />
      </Tabs>

      <Stack
        padding="50px 20px 20px"
        borderRadius="0 20px 20px"
        bgcolor={themeMode === 'light' ? '#fff' : blueGrey[700]}
      >
        <TabPanel value={tab} index={0}>
          <LoginForm onSubmit={loginOnSubmit} isLoading={loadingLoginData} />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <SignUpForm onSubmit={signUpOnSubmit} isLoading={loadingSignUp} />
        </TabPanel>
      </Stack>
    </>
  );
};

TabsAuth.propTypes = {
  loadingLoginData: PropTypes.bool,
  loginOnSubmit: PropTypes.func.isRequired,
  loadingSignUp: PropTypes.bool,
  signUpOnSubmit: PropTypes.func.isRequired
};

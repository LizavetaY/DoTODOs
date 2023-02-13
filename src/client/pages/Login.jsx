import React from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DoneOutline } from '@mui/icons-material';
import { Icon, Stack, Typography } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';

import { SIGN_UP } from '@/api/mutation/user';
import { LOGIN } from '@/api/query/authorization';
import { ContentWrapper, TabsAuth, ThemeButton } from '@/components';
import { handleLogin } from '@/helpers';
import { useNavigateParams, useThemeMode } from '@/hooks';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

export const Login = () => {
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');

  const dispatch = useDispatch();

  const navigate = useNavigateParams();

  const { themeMode } = useThemeMode();

  const [login, { loading: loadingLoginData }] = useLazyQuery(LOGIN, {
    variables: {
      email: loginEmail,
      password: loginPassword
    },
    onCompleted: (data) => {
      handleLogin(data.login.token, navigate);
    },
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const [signUp, { loading: loadingSignUp }] = useMutation(SIGN_UP, {
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const loginOnSubmit = (data) => {
    setLoginEmail(data.email);
    setLoginPassword(data.password);

    login();
  };

  const signUpOnSubmit = (data, resetForm) => {
    signUp({
      variables: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password
      },
      onCompleted: () => {
        dispatch(
          openNotificationBar({
            typeOfBar: 'success',
            text: 'Sign up was successful'
          })
        );

        setLoginEmail(data.email);
        setLoginPassword(data.password);

        login();

        resetForm();
      }
    });
  };

  return (
    <ContentWrapper type="main">
      <Stack
        position="relative"
        direction="column"
        alignItems="center"
        flexGrow="2"
        margin="50px 100px"
        padding="50px"
        minHeight="70%"
        borderRadius="20px"
        bgcolor={themeMode == 'light' ? '#fff' : blueGrey[700]}
      >
        <ThemeButton
          stylesObj={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            border: `2px solid ${themeMode == 'light' ? blue[600] : grey[300]}`
          }}
        />
        <Stack position="relative" direction="row">
          <Icon sx={{ mr: '5px', width: '45px', height: '45px' }}>
            <DoneOutline
              sx={{ width: '100%', height: '100%' }}
              aria-label="DoTODOs logo"
            />
          </Icon>
          <Typography variant="h1" sx={{ fontSize: '46px' }}>
            DoTODOs
          </Typography>
        </Stack>

        <Typography variant="h3" sx={{ mt: '40px' }}>
          Hi there!
        </Typography>

        <Typography variant="h3" sx={{ mt: '40px' }}>
          Do you have many tasks to keep under control?
        </Typography>
        <Typography variant="h3" sx={{ mt: '10px' }}>
          Do you want to remember what you did the past week?
        </Typography>
        <Typography variant="h3" sx={{ mt: '10px' }}>
          This app is made to help you organize your TODO list.
        </Typography>
        <Typography variant="h3" sx={{ mt: '40px' }}>
          Just sign up to manage your TODOs!
        </Typography>
      </Stack>

      <Stack
        direction="column"
        flexGrow="1"
        padding="60px 30px"
        maxWidth="500px"
        height="100%"
        bgcolor={themeMode == 'light' ? blue[50] : blueGrey[600]}
      >
        <TabsAuth
          loadingLoginData={loadingLoginData}
          loginOnSubmit={loginOnSubmit}
          loadingSignUp={loadingSignUp}
          signUpOnSubmit={signUpOnSubmit}
        />
      </Stack>
    </ContentWrapper>
  );
};

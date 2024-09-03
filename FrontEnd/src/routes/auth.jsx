import { lazy } from 'react';

const Login = lazy(() => import('src/pages/Auth/Login'));
const Register = lazy(() => import('src/pages/Auth/Register'));
const ForgotPassword = lazy(() => import('src/pages/Auth/ForgotPassword'));
const ChangePassword = lazy(() => import('src/pages/Auth/ChangePassword'));

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forgot_password",
        element: <ForgotPassword />
      },
      {
        path: "change_password",
        element: <ChangePassword />
      },
    ],
  },
];

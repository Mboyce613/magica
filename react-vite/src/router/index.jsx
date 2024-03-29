import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import CreateAvatarPage from '../components/Avatar/createAvatarPage';
import Splash from '../components/Splash/Splash';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "makeAvatar",
        element: <CreateAvatarPage />,
      },
      {
        path: "home",
        element: <HomePage />
      }
    ],
  },
]);

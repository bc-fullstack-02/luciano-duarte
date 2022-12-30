//IMPORTS/////////////////////////////
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./Pages/Login"
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Friends from './Pages/Friends'
import ProfilePage from './Pages/ProfilePage'
import PostDetail from './Pages/PostDetail'
/* import NotificationsPage from './Pages/NotificationsPage' */
import ProfileEditPage from './Pages/ProfileEditPage'
import "./index.css";

//FUNÇÃO QUE DEFINE AS ROTAS/////////////////////////////
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
  {
    path: '/posts/:postId',
    element: <PostDetail />,
  },
  {
    path: "/profileeditpage",
    element: <ProfileEditPage />
  },
  /* {
    path: '/notifications',
    element: <NotificationsPage />,
  }, */
]);

function App() {
  return < RouterProvider router={router} />
}

export default App

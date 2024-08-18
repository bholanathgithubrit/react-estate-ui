import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import {Layout,  RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage.jsx"
import NewPostPage from "./routes/newPostPage/NewPostPage.jsx";
import {listPageLoader, singlePostLoader} from "./lib/loders.js"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/> 
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePostLoader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:'/add',
          element:<NewPostPage/>
        }
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/layout";
import Events from "./components/Events/Events";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Admin from "./components/Admin/Admin";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import RoleContextProvider from "./Context/RoleContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin/ProtectedAdmin"
import { ToastContainer } from "react-toastify";
let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      {
        path: "Admin",
        element: ( <ProtectedRoute> <ProtectedAdmin>   <Admin /> </ProtectedAdmin></ProtectedRoute>    ),
       
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RoleContextProvider>
        <RouterProvider router={routers} />
         <ToastContainer position="top-right" autoClose={3000} />
      </RoleContextProvider>
    </UserContextProvider>
  );
}

export default App;

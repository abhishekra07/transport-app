import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidenav/Sidebar";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SideWrapper from "./components/SideWrapper/SideWrapper";
import ArrivalForm from "./pages/ArrivalForm/ArrivalForm";
import DispatchForm from "./pages/DispatchForm/DispatchForm";
import Employee from "./pages/Employee/Employee";
import Fleet from "./pages/Fleet/Fleet";
import Product from "./pages/Product/Product";
import Party from "./pages/Party/Party";

function App() {
  const Layout = () => {
    return (
      <div className="container">
        <Sidebar />
        <div
          style={{ flexGrow: "15", display: "flex", flexDirection: "column" }}
        >
          <Header />
          <Outlet />
        </div>
        <SideWrapper />
      </div>
    );
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/arrival-form",
          element: <ArrivalForm />,
        },
        {
          path: "/dispatch-form",
          element: <DispatchForm />,
        },
        {
          path: "/employee",
          element: <Employee />,
        },
        {
          path: "/fleet",
          element: <Fleet />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/party",
          element: <Party />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

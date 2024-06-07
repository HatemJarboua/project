import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateProject from "../Pages/CreateProject";
import MyProjects from "../Pages/MyProjects";
import Workload from "../Pages/Workload";
import UpdateProject from "../Pages/UpdateProject";
import Login from "../components/Login";
import ProjectDetails from "../Pages/ProjectDetails";
import AuthPage from "../Pages/AuthPage";
import About from "../Pages/About"; // Importation de la page À Propos
import Services from "../Pages/Services";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About /> // Route pour la page À Propos
      },
      {
        path: "/services",
        element: <Services /> // Route pour la page Contact
      },
      {
        path: "/post-projet",
        element: <CreateProject />
      },
      {
        path: "/my-project",
        element: <MyProjects />
      },
      {
        path: "/workload",
        element: <Workload />
      },
      {
        path: "edit-project/:id",
        element: <UpdateProject />,
        loader: ({ params }) => fetch(`${process.env.REACT_APP_API_BASE_URL}/all-projects/${params.id}`)
      },
      {
        path: "/project/:id",
        element: <ProjectDetails />
      },
      
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
]);

export default router;

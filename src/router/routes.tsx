import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import {
  createBrowserRouter,
  RouteObject,
  useRouteError,
} from "react-router-dom";

interface ModuleArr {
  path: string;
  label: string;
}

export const moduleArr: ModuleArr[] = [
  { path: "postcode", label: "Postcode" },
  { path: "waste-type", label: "Waste Type" },
  { path: "select-skip", label: "Select Skip" },
  { path: "permit-check", label: "Permit Check" },
  { path: "choose-date", label: "Choose Date" },
  { path: "payment", label: "Payment" },
];

const childrenRoutes: RouteObject[] = moduleArr.map(({ path, label }) => ({
  path,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
    errorElement: <ErrorBoundary />,
    children: childrenRoutes,
    // children: [
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    // ],
  },
]);
// return <RouterProvider router={router} />;

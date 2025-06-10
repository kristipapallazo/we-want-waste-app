import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();

  console.log("error :>> ", error);

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred."}
      </p>
    </div>
  );
}

// export const errorBoundary = {
//   element: <ErrorBoundary />,
//   errorElement: <ErrorBoundary />,
// };

export default ErrorBoundary;

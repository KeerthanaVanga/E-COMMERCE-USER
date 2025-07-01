import { useRouteError, useNavigate } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "An error occurred";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data?.message || "Internal Server Error";
  }

  if (error.status === 404) {
    title = "Page Not Found";
    message = "The resource or page you are looking for does not exist.";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        {error.status || "Error"}
      </h1>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;

import { Link } from "react-router-dom";

function unauthorize() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>You are unauthorize to access this page </h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default unauthorize;

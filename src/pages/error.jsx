import { Link } from "react-router-dom";
import { Button } from "../components";

const ErrorPage = () => {
  return (
    <>
      <div className="h-[75vh] flex flex-col gap-3 justify-center items-center text-center">
        <svg
          className="size-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl/none">
          Oops, page not found!
        </h1>
        <p className="text-muted-foreground mt-4 w-1/3 text-balance md:text-base/relaxed lg:text-xl/snug">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Button className="mt-2">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;

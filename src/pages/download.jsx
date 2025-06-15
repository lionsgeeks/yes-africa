import { Button } from "../components";

const DownloadPage = () => {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center text-center px-4">
      <svg
        className="size-20 text-alpha mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v12m0 0l-3-3m3 3l3-3m-6 6h6m2 4H6a2 2 0 01-2-2V6a2 2 0 012-2h3m6 0h3a2 2 0 012 2v12a2 2 0 01-2 2z"
        />
      </svg>

      <h1 className="text-3xl md:text-5xl font-bold text-alpha">Download Our App</h1>
      <p className="mt-4 max-w-xl text-muted-foreground text-balance">
        Get the latest version of our mobile app. Click the button below to start the download.
      </p>

      <a
        href="https://expo.dev/artifacts/eas/fumx3PTAJZEWhZV3m5LgJH.apk"
        
        className="mt-6"
      >
        <Button className="bg-beta hover:bg-yellow-600 text-white text-lg px-6 py-3 rounded-xl shadow-md">
          Download APK
        </Button>
      </a>
    </div>
  );
};

export default DownloadPage;

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NextPage } from "next";

// Define a NotFound component that handles the 404 page
const NotFound: NextPage = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">Oops! Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* If there are search parameters, display them for debugging */}
      {searchParams && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">Search Params:</h3>
          <pre className="bg-gray-200 p-4 rounded">
            {JSON.stringify(
              Object.fromEntries(searchParams.entries()),
              null,
              2
            )}
          </pre>
        </div>
      )}

      <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
        Go back to homepage
      </a>
    </div>
  );
};

// Wrap the NotFound component with Suspense
const NotFoundPageWrapper: NextPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFound />
    </Suspense>
  );
};

// Export the NotFoundPageWrapper as default
export default NotFoundPageWrapper;

// Mark the page as dynamic
export const dynamic = "force-dynamic";

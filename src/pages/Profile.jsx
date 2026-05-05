import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../api/profile";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        if (isMounted) {
          setUser(await getProfile());
        }
      } catch {
        if (isMounted) {
          setShouldRedirect(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0052ff] border-t-transparent"></div>
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 md:px-14 md:py-24">
        <div className="mb-10">
          <p className="mb-3 text-[14px] font-semibold text-[#1652f0]">
            Account
          </p>
          <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-black md:text-[48px]">
            Profile
          </h1>
        </div>

        <div className="border-t border-[#e5e7eb]">
          <div className="grid grid-cols-1 border-b border-[#e5e7eb] py-6 md:grid-cols-[220px_1fr] md:gap-10">
            <p className="text-[14px] font-semibold text-[#5b616e]">Name</p>
            <p className="mt-2 text-[18px] font-semibold text-black md:mt-0">
              {user?.name || "Not available"}
            </p>
          </div>

          <div className="grid grid-cols-1 border-b border-[#e5e7eb] py-6 md:grid-cols-[220px_1fr] md:gap-10">
            <p className="text-[14px] font-semibold text-[#5b616e]">Email</p>
            <p className="mt-2 text-[18px] font-semibold text-black md:mt-0">
              {user?.email || "Not available"}
            </p>
          </div>

          <div className="grid grid-cols-1 border-b border-[#e5e7eb] py-6 md:grid-cols-[220px_1fr] md:gap-10">
            <p className="text-[14px] font-semibold text-[#5b616e]">Joined</p>
            <p className="mt-2 text-[18px] font-semibold text-black md:mt-0">
              {joinDate}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;

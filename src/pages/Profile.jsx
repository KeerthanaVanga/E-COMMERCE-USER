import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/AuthService";
const Profile = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) =>
      profile({
        signal,
      }),
  });
  if (isPending) {
    return <p className="text-center mt-10">Loading Profile</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-2xl shadow-lg text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {data.name[0].toUpperCase()}
          </div>
        </div>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-gray-600">{data.email}</p>
      </div>
    </div>
  );
};

export default Profile;

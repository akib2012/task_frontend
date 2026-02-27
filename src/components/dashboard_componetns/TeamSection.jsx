import { useEffect, useState } from "react";

export const TeamSection = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://task-api-eight-flax.vercel.app/api/users",
        );
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">User List</h3>
        <button className="text-[10px] font-bold border border-gray-100 px-4 py-1.5 rounded-full hover:bg-gray-50">
          + Add Member
        </button>
      </div>

      <div className="space-y-5">
        {team.map((m, i) => (
          <div key={m.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/150?u=${m.email}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold leading-tight">{m.name}</p>
                <p className="text-[10px] text-gray-400">
                  Email:{" "}
                  <span className="text-gray-600 font-medium">{m.email}</span>
                </p>
                <p className="text-[10px] text-gray-400">
                  Joined:{" "}
                  <span className="text-gray-600 font-medium">
                    {m.joinDate}
                  </span>
                </p>
              </div>
            </div>

            <span
              className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${
                m.status === "active"
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

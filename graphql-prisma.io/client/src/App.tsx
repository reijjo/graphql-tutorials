import { UserDisplay } from "./components/UserDisplay";
import type { User } from "./utils/types";

function App() {
  const users: User[] = [
    {
      name: "Not a Prisma Fan",
      messages: [
        {
          body: "Prisma rocks",
        },
        {
          body: "Actually, it sucks",
        },
      ],
    },
  ];

  return (
    <div className="bg-zinc-800 flex-col h-screen w-full flex items-center justify-center p-4 gap-y-12 ">
      {users.map((user, index) => (
        <UserDisplay key={index} user={user} />
      ))}
    </div>
  );
}

export default App;

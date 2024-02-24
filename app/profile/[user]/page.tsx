"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

type ProfileProps = {
  params: any;
};

export default function Profile() {
  const session = useSession();
  const [buttonText, setButtonText] = useState("Log out");

  const name = session.data?.user?.name || "You are not signed in";
  const img = session.data?.user?.image as string;
  const email = session.data?.user?.email;

  const logout = () => {
    session.status === 'authenticated' ? signOut() : ("/login");
  };

  console.log("name:", name);

  return (
    <article className=" flex flex-row flex-wrap justify-start items-center gap-3 mx-10 my-3 p-4 bg-gradient-to-tl bg-blue-700 rounded-lg">
      <Avatar className="relative h-10 w-10 mx-4">
        <AvatarImage src={img} />
        <AvatarFallback className="h-10 w-10 text-gray-300 font-bold text-sm bg-gradient-to-r from-blue-500 to-indigo-300">{`${name.at(0)?.toUpperCase()}${name.at(1)?.toUpperCase()}`}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="h-full text-left font-bold text-md"> {name} </p>
        <p className="h-full text-left font-regular text-xs text-gray-400">
          {" "}{email}{" "}
        </p>
      </div>
      <Button className="my-2 pt-2" onClick={logout} disabled={session.status === 'unauthenticated'}>
        Log out
      </Button>
    </article>
  );
}

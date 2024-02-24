"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

type HeaderProps = {
  text: string;
};
export default function Header({ text }: HeaderProps) {
  return (
    <nav className="flex sticky top-0 justify-between items-center py-2 backdrop-blur-sm text-2xl font-bold shadow-lg z-50">
      <Link href={"/"}>
        <p className="justify-start lg:px-10 px-6 text-background"> {text} </p>
      </Link>
      <AuthButton className="lg:me-10 me-4"/>
    </nav>
  );
}
type AuthButtonProps = {
  className:string
}
export function AuthButton({className}: AuthButtonProps) {
  const { data: session } = useSession();
  console.log("session present ?", session);
  const name = session?.user?.name || "AB";
  const img = session?.user?.image as string;

  

  return (
    <div className={className}>
      {!session && (
        <Link href={"/profile/login"}>
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-300 rounded-lg m-2 w-20 h-8">
            <button className="absolute flex items-center justify-center bottom-1 right-1 text-xs rounded-lg backdrop-blur-[40px] bg-white/20 w-full h-full">
            Sign In
            </button>
          </div>

        </Link>
      )}

      {session && (
        <Link className="flex flex-row me-5" href={`/profile/${name}`}>
          <Avatar>
            <AvatarImage src={img} />
            <AvatarFallback className="h-10 w-10 text-gray-300 font-bold text-sm bg-gradient-to-r from-blue-500 to-indigo-300">{`${name.at(0)?.toUpperCase()}${name.at(1)?.toUpperCase()}`}</AvatarFallback>
          </Avatar>
        </Link>
      )}
    </div>
  );
}

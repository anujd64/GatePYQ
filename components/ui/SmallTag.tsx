import Link from "next/link";

type SmallTagProps = {
  text : string;
}
export default function SmallTag({text}:SmallTagProps) {
  return (
    <Link href={`/questions/${text}/1`}>
      <button className="text-xs py-2 px-4 rounded-2xl mx-2 my-2 bg-gradient-to-r from-blue-700 to-indigo-500">{text}</button>
    </Link>
  );
}

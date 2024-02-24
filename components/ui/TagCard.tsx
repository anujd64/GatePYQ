import Link from "next/link";

type TagCardProps = {
  text : string;
}
export default async function TagCard({text}:TagCardProps) {
  return (
    <Link href={`/questions/${text}/1`}>
      <button className="m-2 items-center bg-gray-900 rounded-md font-semibold box-border text-white cursor-pointer inline-flex h-12 justify-center leading-none overflow-hidden relative text-left no-underline transition-shadow duration-[0.15s,transform] delay-[0.15s] select-none touch-manipulation whitespace-nowrap will-change-[box-shadow,transform] lg:text-lg text-sm px-4 border-0 focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] hover:-translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset] active:translate-y-0.5"
>{text}</button>
    </Link>

  );
}



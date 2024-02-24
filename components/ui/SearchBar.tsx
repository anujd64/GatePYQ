import { useState } from "react";

type SearchBarProps = {
}
export default function SearchBar() {
    const [value, setValue] = useState('');
  return (
      <input 
      className="py-2 px-4 mx-auto my-6 h-18 w-full text-white bg-transparent outline-none border-b border-gray-500" 
      onChange={e => { setValue(e.currentTarget.value); }}
      placeholder="Search a topic"/>
  );
}

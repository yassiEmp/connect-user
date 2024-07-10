"use client";
import Image from "next/image";
import { useRef } from "react";
export default function Home() {
  const inputRef = useRef(null);
  async function handleClick() {
    //make an api call
    const response = await fetch("http://localhost:3000/api/addUser", {
      method: "POST",
      body: JSON.stringify({ mac: inputRef.current.value }),
    });
    console.log(inputRef.current.value);
  }
  return (
    <main className="flex ">
      <div className="width-full h-full">
        <input type="text" ref={inputRef} />
        <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded-md">ajouter</button>
        <button onClick={handleClick} className="bg-red-500 text-white p-2 rounded-md">supprimer</button>
      </div>
    </main>
  );
}

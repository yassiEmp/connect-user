"use client";
import { useRef } from "react";
export default function Home() {
  const macInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const numInputRef = useRef(null);
  async function handleClick(e) {
    e.preventDefault()
    //make an api call
    const response = await fetch("http://localhost:3000/api/addUser", {
      method: "POST",
      body: JSON.stringify({
        mac: macInputRef.current.value,
        name: nameInputRef.current.value,
        time: parseFloat(timeInputRef.current.value),
        numero: numInputRef.current.value,
      }),
    });
    console.log(timeInputRef.current.value)
    alert( response.status == 200 ? "ok la creation a reussi":"il y as eu une erreur")
  }
  return (
    <main className="flex w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <form className="h-1/5 w-3/5 flex items-center justify-around flex-col">
          <div className="w-80 flex justify-between">
            <label htmlFor="mac">mac</label>
            <input type="text" ref={macInputRef} defaultValue={""} />
          </div>
          <div className="w-80 flex justify-between">
            <label htmlFor="mac">numero</label>
            <input type="number" ref={numInputRef} defaultValue={97513003} />
          </div>
          <div className="w-80 flex justify-between">
            <label htmlFor="time">time en jours (1,7,31) </label>
            <input type="number" ref={timeInputRef} defaultValue={1} />
          </div>
          <div className="w-80 flex justify-between">
            <label htmlFor="name">name</label>
            <input type="text" ref={nameInputRef} defaultValue={"Guest"} />
          </div>
          <button
            onClick={(e)=>handleClick(e)}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            ajouter
          </button>
        </form>
      </div>
    </main>
  );
}

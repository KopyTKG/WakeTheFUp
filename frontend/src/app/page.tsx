"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
const server = io("http://localhost:8080/");

export default function Home() {
  useEffect(() => {
    setInterval(() => {
      server.emit("ping", "10.25.0.25:22");
    }, 1000);

    server.on("pong", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-40 h-20 px-10 py-5 bg-gray-400">
        <button
          onClick={() => server.emit("wake", "04:42:1a:ed:7a:0b")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Wake
        </button>
      </div>
    </main>
  );
}

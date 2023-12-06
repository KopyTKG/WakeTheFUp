"use client";
import Device from "@/modules/device";
import { useEffect } from "react";
import { io } from "socket.io-client";
const server = io(process.env.NEXT_PUBLIC_BASE?.toString() || "");

export default function Home() {
  useEffect(() => {
    server.on("pong", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <main className="container  grid  justify-center sm:content-center sm:mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-5 py-10">
      <Device
        server={server}
        ip="10.25.0.25"
        mac="04:42:1a:ed:7a:0b"
        device={"PC"}
        pass={process.env.NEXT_PUBLIC_PASSWORD}
        user="kopy"
        command={`echo "${process.env.NEXT_PUBLIC_PASSWORD}" | sudo -S shutdown now`}
      />
      <Device
        server={server}
        ip="10.25.0.110"
        mac="00:00:00:00:00:00"
        device={"Laptop"}
        pass={process.env.NEXT_PUBLIC_PASSWORD}
        user="kopy"
        command={`echo "${process.env.NEXT_PUBLIC_PASSWORD}" | sudo -S shutdown now`}
      />
      <Device
        server={server}
        ip="10.25.0.2"
        mac="00:00:00:00:00:00"
        device={"Switch"}
        pass={process.env.NEXT_PUBLIC_PASSWORD}
        user="kopy"
        command={`echo "${process.env.NEXT_PUBLIC_PASSWORD}" | sudo -S shutdown now`}
      />
      <Device
        server={server}
        ip="10.25.0.228"
        mac="00:00:00:00:00:00"
        device={"Phone"}
        pass={process.env.NEXT_PUBLIC_PASSWORD}
        user="kopy"
        command={`echo "${process.env.NEXT_PUBLIC_PASSWORD}" | sudo -S shutdown now`}
      />
    </main>
  );
}

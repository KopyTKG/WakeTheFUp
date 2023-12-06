"use client";
import { PowerIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Device({ server, ip, mac, device, pass, user, command }: any) {
  const [alive, setAlive] = useState(false);
  const [open, isOpen] = useState(false);
  useEffect(() => {
    setInterval(() => {
      server.emit("ping", ip);
    }, 2000);
  }, [ip, server]);

  useEffect(() => {
    server.on("pong", (data: string) => {
      const status = JSON.parse(data);
      if(status.ip === ip) {

        if (status.value === "alive") {
          setAlive(true);
        } else {
          setAlive(false);
        }
      }
    });
  }, [ip, server]);

  function setEvent() {
    if (alive) {
      server.emit(
        "off",
        JSON.stringify({
          ip: ip,
          pass: pass,
          user: user,
          command: command,
        })
      );
    } else {
      server.emit("wake", mac);
    }
    isOpen(false);
  }

  const content = (
    <PopoverContent className="dark bg-background text-foreground px-4 py-2">
      {(titleProps) => (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Are you sure?</h1>
          <h2 {...titleProps} className="text-xl wrap w-48 text-center">
            Do you really want to {alive ? "turn off" : "turn on"}{" "}
            <span className="font-bold">{device}</span>:
          </h2>
          <div className="flex flex-row gap-3">
            <Button
              color="default"
              onClick={() => {
                isOpen(false);
              }}>
              No
            </Button>
            <Button onClick={() => setEvent()} color="danger">
              Yes
            </Button>
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <Card className="max-w-[16rem] place-self-center">
      <CardBody className="flex flex-row gap-3 items-center">
        <Popover
          offset={10}
          placement="bottom"
          backdrop="blur"
          isOpen={open}
          onOpenChange={(open) => isOpen(open)}>
          <PopoverTrigger>
            <Button
              color={alive ? "success" : "danger"}
              size="lg"
              radius="full"
              isIconOnly
              className="mx-2">
              <PowerIcon className="h-8 w-8" />
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>

        <div>
          <h2 className="text-xl font-bold">{device}</h2>
          <div className="text-md font-bold">
            <div className={"w-3 h-3 inline-block rounded-full mr-2" + (alive ? " bg-green-500" : " bg-red-500")}></div>
            {alive ? "Online" : "Offline"}
          </div>
          <p className="text-sm">{ip}</p>
          <p className="text-sm">{mac}</p>
        </div>
      </CardBody>
    </Card>
  );
}

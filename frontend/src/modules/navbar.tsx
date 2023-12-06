import {
  Cog6ToothIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <div className="w-screen flex justify-between py-3 px-4 bg-transparent">
        <div className="absolute top-0 left-0 w-screen h-14 blur-lg bg-transparent"/>
          <div >
            <Button
              as={Link}
              color="default"
              variant="light"
              radius="full"
              href="/">
              <HomeIcon className="w-6 h-6" /> Home
            </Button>
            <Button
              as={Link}
              color="default"
              variant="light"
              radius="full"
              href="/">
              <UserGroupIcon className="w-6 h-6" /> Users
            </Button>
            <Button
              as={Link}
              color="default"
              variant="light"
              radius="full"
              href="/">
              <Cog6ToothIcon className="w-6 h-6" /> Settings
            </Button>
          </div>
          <div>
            <Button>Add</Button>
          </div>
      </div>
    </>
  );
}

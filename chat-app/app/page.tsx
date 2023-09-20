"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useState } from "react";
const cookies = new Cookies();

export default function Home() {
  const router = useRouter();
  const [auths] = useState(cookies.get("auth-token"));
  if (auths) {
    router.push("/room");
  } else {
    router.push("/signIn");
  }
  return (
    <>
      <section>
        <h2>Welcome to chatting app</h2>
      </section>
      <div>
        
      </div>

      {/* <Link href="/room">Room</Link> */}
    </>
  );
}

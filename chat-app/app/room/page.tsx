"use client";
import React, { useState } from "react";
import { useRouter} from "next/navigation";
import {auth} from "../../firebase.config";
function Room() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const userdata:any = auth.currentUser?.uid

  return (
    <>
      <div>
        <h3>Room</h3>
        <label>Enter Room Id:</label>
        <input
          type="text"
          value={roomId}
          name="roomId"
          onChange={(e: any) => setRoomId(e.target.value)}
        />
        <br />

        <button
          type="submit"
          onClick={() =>router.push(`/chat?room=${roomId}`)
          }
        >
          
          Join Room
        </button>
      </div>
    </>
  );
}

export default Room;

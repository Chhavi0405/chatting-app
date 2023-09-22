'use client'

import React, { useState,useEffect } from 'react'
import { auth, db } from "@/firebase.config";
import { addDoc,
  setDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc, } from 'firebase/firestore';
  import { useRouter,useSearchParams} from "next/navigation";
function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef: any = collection(db, "messages");
  const router = useRouter();
  const [filterRoom,setFilterRoom] = useState([])
  const searchParams = useSearchParams();
  const room = searchParams?.get("room");
  console.log(room,"params")
  
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy('createdAt'));
    const unsuscribe: any = onSnapshot(queryMessages, (snapshot) => {
      let mess: any = [];
      snapshot.forEach((doc: any) => {
        mess.push({ ...doc.data(), id: doc.id });
      });
      let x:any
      const filterRooms = mess.filter((data: any) => data?.room === room);
      console.log(filterRooms ,"filtered")
      console.log(mess,"effect")
      setMessages(mess);
      setFilterRoom(filterRooms)
    });
    return () => unsuscribe;
  },[]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room
    });

    setNewMessage("");
  };
 
  return (
   <>
<section>
  Welcome to room :{room}
</section>

<div> { 
    filterRoom.map( (msg :any) => {
        console.log(msg,"msg");
        return <div  key={msg.id} > 
        <span>{msg.user} : </span>
        {msg.text}</div>
    })
} </div>
<div>
<form onSubmit={handleSubmit}>
        <input
          placeholder="type mesage"
          onChange={(e:any)=>setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Send</button>
      </form>
</div>
   </>
  )
}

export default Chat
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
  where, } from 'firebase/firestore';
  import { useRouter,useSearchParams} from "next/navigation";
function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef: any = collection(db, "messages");
  const router = useRouter();

  const searchParams = useSearchParams();
  const room = searchParams?.get("room");
  console.log(room,"params")
  
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy('createdAt'));
    const unsuscribe: any = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc: any) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
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
    messages.map( (msg :any) => {
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
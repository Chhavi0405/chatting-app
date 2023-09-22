"use client";
import { provider, auth } from "../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    // const data = result.user;
  console.log(result,"userdata")
    cookies.set("auth-token", result.user.refreshToken);
    router.push("/room");
  
  };
  return (
    <>
      <div>SignIn with Google to use App </div>
      <button type="submit" onClick={signInWithGoogle}>
        SignIn
      </button>
    </>
  );
}

export default SignIn;

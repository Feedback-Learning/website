import { type NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Layout } from "../components/Layout";
import Reaction from "../components/Reaction";
import Chat from "../components/Chat";
import { MessageObject, supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

const Home: NextPage = () => {  

  const session = useSession();

  const router = useRouter();
  
  useEffect(() => {
    
  })

  async function sendMessage(messageObject: MessageObject) {
    let {data, error} = await supabase.from('messages').insert(messageObject)
    console.log(data, error)
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-end items-center w-full h-full pl-6 pb-6 pr-6 gap-4 overflow-hidden">
          <Chat/>
          <div className="flex flex-row justify-between gap-2 w-full">
            <Reaction>👍</Reaction>
            <Reaction>👎</Reaction>
            <Reaction>😲</Reaction>
            <Reaction>🤔</Reaction>
            <Reaction>🎉</Reaction>
            <Reaction>👏</Reaction>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
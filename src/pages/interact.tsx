import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Layout } from "../components/Layout";
import Reaction from "../components/Reaction";
import Message from "../components/ChatInput";
import Chat from "../components/Chat";

const Home: NextPage = () => {
        
  const session = useSession()

  return (
    <>
      <Layout session={session}>
        <div className="flex flex-col justify-end items-center w-full h-full pl-10 pb-10 pr-10 gap-4 overflow-hidden">
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
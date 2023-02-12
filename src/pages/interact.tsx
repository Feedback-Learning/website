import { type NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import Reaction from "../components/Reaction";
import Chat from "../components/Chat";

const Home: NextPage = () => {  

  return (
    <>
      <Layout>
        <div className="flex flex-col justify-end items-center w-full h-full gap-4 overflow-hidden">
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
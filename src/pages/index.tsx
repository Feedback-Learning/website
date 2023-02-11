import { type NextPage } from "next";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from "next/head";
import React from "react";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  let supabaseClient = useSupabaseClient()
  const user = useUser();
        
  const session = useSession()

  return (
    <>
    <Layout session={session}>
        {(!user) ?
          <Auth redirectTo="http://localhost:3000/" appearance={{ theme: ThemeSupa }} supabaseClient={supabaseClient} providers={['google']} socialLayout="horizontal"/>
          :
          <>
            {/* <Link href={"/createClass"}>
              <Button>Create a class</Button>
            </Link> */}
            <Button>Join a class</Button>
            <Button onClick={() => supabaseClient.auth.signOut()}>Sign out</Button>
          </>
        }
      </Layout>
    </>
  );
};

export default Home;
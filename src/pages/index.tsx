import { type NextPage } from "next";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from "next/head";
import React, { Dispatch, FormEvent, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { User, useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { supabase, UserObject } from "../utils/supabaseClient";
import { profile } from "console";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  let supabaseClient = useSupabaseClient()
  const user = useUser();
  const [profileData, setProfileData] = useState<UserObject>()

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient.from('profiles').select('*').eq("user_id", user?.id)
      if (data == null) return;
      if (error) {
        console.error(error)
        return
      }
      setProfileData(data[0])
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  const Dashboard = () => {
    return (<>
      <h1> Welcome {profileData?.name}</h1>
      <Button>Join a class</Button>
      <Button onClick={() => supabaseClient.auth.signOut()}>Sign out</Button>
    </>)
  }

  
  async function submitProfileData() {  
    const {data, error } = await supabaseClient.from('profiles').insert({})
    if (data == null) return;
    if (error) {
      console.error(error)
      return
    }
  }

  return (
    <>
      <Layout>
        {
          (!user) ? <Auth redirectTo="http://localhost:3000/" appearance={{ theme: ThemeSupa }} supabaseClient={supabaseClient} providers={['google']} socialLayout="horizontal"/>
          :
          <Dashboard/>
        }
        <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
      </Layout>
    </>
  );
};

export default Home;

/* 
:
            (!profileData) ?
              <ProfileForm/>
              :
              <Dashboard/>
*/

function ProfileForm() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <h1> Let's get to know you... </h1>
      <label>Name: </label>
      <input type="text"></input>
      <label>Pronouns: </label>
      <input type="text"></input>
      <div className="h-fit w-fit">
        <Button>
          Next
        </Button>
      </div>
      
    </div>
  )
}
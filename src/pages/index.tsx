import { type NextPage } from "next";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from "next/head";
import React, { Dispatch, FormEvent, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { User, useSession, useSupabaseClient, useUser, Session } from "@supabase/auth-helpers-react";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { Database } from '../utils/database'
import { useRouter } from "next/router";
type Profiles = Database['public']['Tables']['profiles']['Row']

const REDIRECT_URL = process.env.URL

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState<boolean>()
  const [name, setName] = useState<Profiles['name']>()
  const [pronouns, setPronouns] = useState<Profiles['pronouns']>(null)
  const session = useSession()

  async function getProfile() {
    try { 
      setLoading(true)
      if (!user) return
      const { data, error, status } = await supabaseClient.from('profiles').select('*').eq("user_id", user.id).single()

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name)
        setPronouns(data.pronouns)
        setHasProfile(true)
      } else {
        setHasProfile(false)
      }
    } catch (error) {
      alert(`Error: ${JSON.stringify(error)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile().catch(error => console.log(error))
  }, [session])

  const Dashboard = (props : { session: Session}) => {
    const [classId, setClassId] = useState<string>()

    return (<div className="h-full flex flex-col justify-center items-center gap-3">
      <h1> Welcome {name}</h1>
      <input type="text" onChange={(event) => setClassId(event.target.value)} placeholder="Enter a class code..."></input>
      <Button onClick={() => { router.push(`/interact?class=${classId as string}`).catch(error => {console.log(error)})}}>Join a class</Button>
      <Button onClick={() => { supabaseClient.auth.signOut().catch(error => {console.log(error)}) } }>Sign out</Button>
    </div>)
  }
  return (
    <>
      <Layout>
        {
          (!session) ?
            <Auth redirectTo={REDIRECT_URL} appearance={{ theme: ThemeSupa }} supabaseClient={supabaseClient} providers={['google']} socialLayout="horizontal"/>
            :
            (!hasProfile) ?
              <ProfileForm session={session}/> 
              :
              <Dashboard session={session}></Dashboard>
        }
      </Layout>
    </>
  );
};

export default Home;

function ProfileForm(props: {session: Session}) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [name, setName] = useState<string>()
  const [pronouns, setPronouns] = useState<string>()

  async function submitProfileData() {
    try {
      if (!user) throw Error("No user!")
      const { error } = await supabase.from('profiles').insert({
        user_id: user.id,
        name: name,
        pronouns: pronouns,
      })

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(`Error: ${JSON.stringify(error)}`)
    } finally {}
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <h1> Let&apos;s get to know you... </h1>
      <label>Name: </label>
      <input type="text"  onChange={(event) => setName(event.target.value)}></input>
      <label>Pronouns: </label>
      <input type="text" onChange={(event) => setPronouns(event.target.value)}></input>
      <div className="h-fit w-fit">
        <Button onClick={() => { submitProfileData().catch(error => {console.log(error)}) }}>
          Next
        </Button>
      </div>
      
    </div>
  )
}
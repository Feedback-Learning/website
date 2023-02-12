import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Database } from "../utils/database";
import Message from "./Message"
type Classes = Database['public']['Tables']['classes']['Row']
type Messages = Database['public']['Tables']['messages']['Row']
type Profiles = Database['public']['Tables']['profiles']['Row']

function ChatHistory() {
  const user = useUser()
  const supabase = useSupabaseClient<Database>();

  const [sClass, setClass] = useState<Classes>();
  const [chatMessages, setChatMessages] = useState<Array<Messages>>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const router = useRouter();
  const session = useSession();

  async function fetchUser(user_id: string) {
    return (await supabase.from('profiles').select('*').eq('user_id', user_id)).data
  }

  async function fetchClass(class_id: number) {
    return (await supabase.from('classes').select('*').eq('id', class_id).single()).data
  } 

  function subscribeToClass(classId: number) {
    const messages = supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `class=eq.${classId}` },
      (payload) => {
        console.log(payload)
        let message: Messages = (payload.new as unknown) as Messages
        fetchUser(message.user as string).then((user) => {
          let newMessage = message as unknown as {
            user: Profiles
          }
          
          if (!user) {
            newMessage.user = { user_id: "", name: "Undefined", pronouns: "" } as Profiles
          } else {
            newMessage.user = user[0] as unknown as Profiles
          }

          setChatMessages((messages) => [message, ...messages])
        })
      }
    )
    .subscribe()
  }

  async function getClass(id: string) {
    try { 
      setLoading(true)
      if (!user) return
      const { data, error, status } = await supabase.from('classes').select('*').eq('id', id).single()

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setClass(data);
        subscribeToClass(data.id);
      } else {
        setChatMessages(() => [
          {
            class: 0,
            content: "Error! Class ID is invalid.",
            id: -1,
            is_reaction: false,
            user: {
              name: "System Message",
              pronouns: "",
              id: ""
            },
            created_at: new Date().toUTCString(),
            error: true,
          } 
        ])
      }
    } catch (error) {
      alert(`Error: ${JSON.stringify(error)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!router.query || router.query == null || Object.keys(router.query).length == 0) return;
    if (router.query.class == null) {
      router.push('/')
      return;
    }
    getClass(router.query.class as string)
  }, [router])

  return (
    <div className="w-full h-full rounded-xl flex justify-start items-center gap-4 flex-col-reverse overflow-y-scroll pb-2 pr-2">
      {
        chatMessages?.map((message) => {
          return <Message key={message.id} message={message}/>
        })
      }
    </div>
  )
}

export default ChatHistory
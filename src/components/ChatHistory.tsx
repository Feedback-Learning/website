import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { MessageObject, UserObject } from "../utils/supabaseClient";
import Message from "./Message"

function ChatHistory() {
  const supabase =  useSupabaseClient();
  const user = useUser()

  const [chatMessages, setChatMessages] = useState<Array<MessageObject>>([]);

  const session = useSession()

  async function fetchUser(user_id: string) {
    return (await supabase.from('profiles').select('*').eq('user_id', user_id)).data
  }

  useEffect(() => {
    const messages = supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: "class=eq.2" },
      (payload) => {
        console.log(payload)
        let message: MessageObject = (payload.new as unknown) as MessageObject
        fetchUser(message.user as string).then((user) => {
          
          if (!user) {
            message.user = { id: "", name: "Undefined", pronouns: "" } as UserObject
          } else {
            message.user = user[0] as unknown as UserObject
          }

          setChatMessages((messages) => [message, ...messages])
        })
      }
    )
    .subscribe()
  }, [])

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
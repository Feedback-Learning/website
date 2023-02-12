import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MessageObject, supabase } from "../utils/supabaseClient";

function ChatInput() {
  const [messageText, setMessageText] = useState("")

  const router = useRouter()

  const session = useSession()
  const user = useUser();

  async function sendMessage() {
    console.log(user)
    let messageObject = {
      content: messageText,
      is_reaction: false,
      user: user?.id,
      class: 2
    }
    const { data, error } = await supabase.from('messages').insert(messageObject)
    console.log(data)
    console.log(error)

  }

  return (
    <div className="flex flex-row w-full h-14 bg-white rounded-full px-4 text-3xl shadow-md">
      <input type="text" className="flex-auto w-8/12 h-full bg-transparent ml-2" onChange={(event) => { setMessageText(event.target.value) }}></input>
      <div className="h-full flex justify-center items-center leading-none active:scale-110" onClick={sendMessage}>
        <svg className="h-3/5 aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default ChatInput;
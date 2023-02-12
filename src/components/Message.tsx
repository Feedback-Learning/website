import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { MessageObject, UserObject } from "../utils/supabaseClient";

function Message(props: { message: MessageObject }) {
  const [isUpvoted, setIsUpVoted] = useState()

  return <div className="w-full h-fit bg-white rounded-3xl flex flex-row px-3 py-3 text-lg shadow-md">
    <div className="h-full aspect-square flex justify-center items-center text-5xl">
      <svg fill="rgba(0,0,0,0.1)" className="h-4/5 aspect-square translate-y-1 stroke-slate-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 15h14l-7-8z"/>
      </svg>
    </div>
    <div className="flex flex-col w-full h-full">
      <div className="block w-full h-full">
        <span className="font-bold">
          {(props.message.user as UserObject).name}
        </span>
        <span className="italic ml-2 font-thin text-base">
          {(props.message.user as UserObject).pronouns}
        </span>
        <span className="ml-2 text-base font-thin float-right">
          {new Date(props.message.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </span>
      </div>
      <div>
        {props.message.content}
      </div>
    </div>
  </div>
}

export default Message;
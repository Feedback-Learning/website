import { User } from "@supabase/supabase-js";
import { MessageObject, UserObject } from "../utils/supabaseClient";

function Message(props: { message: MessageObject }) {
  return <div className="w-full bg-white rounded-3xl h-fit px-5 py-3 text-lg shadow-md">
    <div>
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
}

export default Message;
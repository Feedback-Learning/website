import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../utils/supabaseClient";

function Reaction(props: { children: string }) {

  const user = useUser();

  async function sendReaction() {
    let messageObject = {
      content: props.children,
      is_reaction: true,
      user: user?.id,
      class: 2
    }
    const { data, error } = await supabase.from('messages').insert(messageObject)
    console.log(data)
    console.log(error)

  }

  return (
    <div 
    onClick={sendReaction}
    className="text-2xl w-28 aspect-square flex justify-center items-center bg-white rounded-full drop-shadow-md select-none cursor-pointer active:translate-y-0.5 hover:bg-gray-100"
    >
      {props.children}
    </div>
  );
}

export default Reaction;
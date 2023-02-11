import Message from "./Message"

function ChatHistory() {
  return (
    <div className="w-full h-full rounded-xl flex justify-start items-center gap-4 flex-col-reverse overflow-y-scroll pb-2 pr-2">
      <Message author="Jacob Snarr">
        Hello!
      </Message>
      <Message author="Devin Rankin">
        What is the question?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
      <Message author="Jackie Gan">
        Who is they?
      </Message>
    </div>
  )
}

export default ChatHistory
function Message(props: { author: String, children: String }) {
  return <div className="w-full bg-white rounded-3xl h-fit px-6 py-4 text-2xl shadow-md">
    <div className="font-bold">
      {props.author}
    </div>
    <div>
      {props.children}
    </div>
  </div>
}

export default Message;
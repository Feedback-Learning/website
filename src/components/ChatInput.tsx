
function ChatInput() {
  return (
    <div className="flex flex-row w-full h-20 bg-white rounded-full px-4 text-3xl shadow-md">
      <input type="text" className="flex-auto w-8/12 h-full bg-transparent ml-2"></input>
      <div className="h-full flex justify-center items-center leading-none">
        <svg className="h-3/5 aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default ChatInput;
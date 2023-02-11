function Reaction(props: { children: string }) {
  return (
    <div className="text-3xl w-28 aspect-square flex justify-center items-center bg-white rounded-full drop-shadow-md select-none cursor-pointer active:translate-y-0.5 hover:bg-gray-100">
      {props.children}
    </div>
  );
}

export default Reaction;
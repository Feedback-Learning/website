function CreateClassForm(props: { children: string }) {
    return (
      <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full drop-shadow-md select-none cursor-pointer active:translate-y-0.5 hover:bg-gray-100">
        {props.children}
      </div>
    );
  }
  
  export default CreateClassForm;
import { MouseEventHandler } from "react";

function Button(props: { children: string, onClick?: MouseEventHandler<HTMLDivElement> | undefined }) {
  return (
    <div className="p-4 bg-white rounded-full select-none cursor-pointer shadow-md active:translate-y-0.5" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Button;
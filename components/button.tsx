import { ReactNode } from "react";


const Button = ({ children, onClick, url }: {children: ReactNode, onClick: ()=> void, url?: string}) => {
  return (
    <button
      onClick={()=> onClick()}
      className="
        bg-red-600 
        text-white 
        font-bold 
        px-8 
        py-3 
        rounded 
        transition 
        transform 
        hover:bg-red-700 
        hover:scale-105 
        active:scale-95
        tracking-wider
      "
    >
      {children}
    </button>
  );
};

export default Button;

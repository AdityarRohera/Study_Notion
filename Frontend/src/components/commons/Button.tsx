// import React from 'react'

// button varient
import type { ReactElement } from "react";


interface ButtonProps {
    variant : "primary" | "secondary" | "redish";
    size : "sm" | "md" | "lg"|"xl"
    text : string;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    className? : string;
    onchange? : (e : any) => void;
    onClick? : (e: any) => void;
}

const buttonVariant = {
    primary : "bg-yellow-300 text-black",
    secondary : "bg-gray-800 text-white",
    redish : "bg-red-600 text-white"
}
const sizeVariant = {
    sm : "w-[50px] h-[50px]",
    md : "w-[100px]  h-[50px]",
    lg : "w-[200px] h-[50px]",
    xl : "w-full h-[50px]"
}

const commonVariant = {
    property : "rounded-2xl flex justify-center items-center gap-4 font-medium cursor-pointer"
}

function Button({variant , size , text , startIcon , endIcon , className , onchange , onClick} : ButtonProps) {
  return <button  className={`${buttonVariant[variant]} ${sizeVariant[size]} ${commonVariant.property} ${className ?? ""}`} onChange={onchange} onClick={onClick} >
    {startIcon ? startIcon : ""}
    {text}
    {endIcon ? endIcon : ""}
    </button>
}

export default Button;

<div>
  <button className="border "></button>
</div>

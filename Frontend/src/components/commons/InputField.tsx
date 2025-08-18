// import React from 'react'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

interface InputFieldType {
    type : string;
    placeholder? : string;
    name? : string;
    id? : string;
    value? : string;
    startIcon ? : any;
    endIcon ? : any;
    passwordType ? :string;
    varient? : 'Primary' | 'Secondary';
    size : string
    changeHandler? : (event : any) => void;
    iconChangeHandler? : (e : any) => void;
}

const InputFieldVarient : any = {
    Primary : "bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg  focus:ring-0 focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white",

    Secondary : "bg-white text-gray-900 text-xl border-0 border-b-2 border-black rounded-lg focus:ring-0 focus:border-black block w-full p-2.5 placeholder-gray-500",
}

const InputFieldSize : any = {
    sm : "w-[120px] h-[50px]",
    md : "w-[245px] h-[50px]",
    lg : "w-[490px] h-[50px]",
    xl : "w-full h-[50px]",
}

const commonProperties = "flex gap-2"

function InputField({type , placeholder , name , id , value , varient , size ,  startIcon , endIcon , passwordType, changeHandler , iconChangeHandler} : InputFieldType) {
  return (
    <div className={`relative ${commonProperties} ${InputFieldSize[size]}} `}>

        {startIcon && (
           <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {startIcon}
          </span>
        )}

        <input className={`${varient ? InputFieldVarient[varient] : InputFieldVarient?.Primary}${InputFieldSize[size]} ${startIcon ? 'pl-14' : ''} ${endIcon ? 'pr-14 ' : ''}`} type={type} placeholder={placeholder} name={name} id={id} value={value} onChange={changeHandler} />

        {endIcon && (
         <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
        </span>
        )}

        {passwordType && (
         <button type="button" name={name} onClick={iconChangeHandler} className="absolute inset-y-0 right-0 flex items-center pr-3">
             {passwordType === "password" ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
        )}
        
    </div>
  )
}

export default InputField;
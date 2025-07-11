// import React from 'react'

type HeadingProps = {
    variant? : "primary" | "secondary";
    size? : "sm" | "md" | "lg"; 
    text : string;
    highLight? : {
        start : number;
        end : number;
    }
}

const headingvariant = {
    primary : "text-white",
    secondary : "text-black"
}

const headingSize = {
    sm : "text-2xl fond-bold",
    md : "text-3xl fond-semibold",
    lg : "text-4xl font-extrabold"
}

const colors = {
    blue : "text-blue-400",
    green : "text-green-200"
}

function Heading({text , variant , size , highLight} : HeadingProps) {

    // Apply color logic
    // let newText;
    // if(changeColor){
    //     let heading = text.split(" ");
    //     for(let t=changeColor.start-1; t<changeColor.end-1; t++){
    //             if(t == changeColor.end-2){
    //                 heading[t].style.backgroundColor = colors.blue
    //             } else{
    //                 heading[t].style.backgroundColor = colors.green;
    //             }
    //     }
    //     text = heading.join(" ")
    // }
    // now merge it

    // another logic
     const heading = text.split(" ");
     const coloredWords = [];

  for (let i = 0; i < heading.length; i++) {
    let colorClass = "";

    const wordPosition = i + 1;

    if (highLight && wordPosition >= highLight.start && wordPosition <= highLight.end) {
      if (wordPosition === highLight.end) {
        colorClass = colors.green;
      } else {
        colorClass = colors.blue;
      }
    }

    coloredWords.push(
      <span key={i} className={colorClass}>
        {heading[i]}{" "}
      </span>
    );

  }
    



  return (
    <h1 className ={`${variant ? headingvariant[variant] : headingvariant.primary} ${size ? headingSize[size!] : headingSize.md} `}>
        {coloredWords}
    </h1>
  )
}

export default Heading

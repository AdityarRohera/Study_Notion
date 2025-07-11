// import React from 'react'
import Heading from '../commons/Heading'

type autoCodeLayout = {
    text : string,
    para : string,
    btnText : string,
    clickHandler : () => void;
}

function AutoCodebarLayout({text , para , btnText , clickHandler } : autoCodeLayout) {
  return (
    <div className="  flex gap-10 p-2 w-[80vw] h-[35vh]">

        {/* About section */}
      <div className=" flex flex-col gap-8 items-start p-2 min-w-[200px]">
          <Heading text={text}  size="lg" highLight={{start:3 , end:4}}/>
          <p>{para}</p>
          <button></button>
          <button onClick={clickHandler}>{btnText}</button>
      </div>
      

      {/* Auto-code */}
      <div className=" flex flex-col gap-8 p-2 min-w-[200px]">
            <p>{para}</p>
      </div>
    </div>
  )
}

export default AutoCodebarLayout


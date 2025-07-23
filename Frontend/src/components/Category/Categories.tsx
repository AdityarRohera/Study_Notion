// import React from 'react'
import { useParams } from "react-router-dom"
import WebDevlopment from "../../pages/WebDevlopment"
import Python from "../../pages/Python"
import DSA from "../../pages/DSA";
import NoPage from "../../pages/NoPage";

function Categories() {
    let {catalogName} = useParams();
    const categoryRender = [{path : 'DSA' , component : DSA } ,
                            {path : 'Python' , component : Python},
                            {path : 'Web Development' , component : WebDevlopment },
                           ]
  return (
    <div>
      {
        categoryRender.map((category : any , index : any) : any => {
            return catalogName ? 
            (
                category.path === catalogName && <category.component key={index}/>
            ) : 
            (
                <NoPage/>
            )
        })
      }
    </div>
  )
}

export default Categories
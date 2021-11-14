import React from 'react'
import { useState,useEffect } from 'react'
import "./index.css"

import {GrChapterPrevious,GrFormPrevious,GrFormNext,GrChapterNext} from "react-icons/gr"

function Pagination(props) {
    const {members,pageHandler}=props

  

    const [page,setPage]=useState(1);

    let pageNumbers=[]
    for (let n=1; n<Math.ceil(members.length/10)+1; n++){
        pageNumbers.push(n);
    }

   const selectedPage=(eachPage)=>{

       setPage(eachPage)
       pageHandler(eachPage)
   }

  
    useEffect(() => {
        setPage(page)
    }, [page])


   const nextPage=()=>{
       if(page<pageNumbers.length){
           setPage(page=>page+1);
           pageHandler(page+1)
       }
      
     
   }

   const previousPage=()=>{
       if(page>1){
        setPage(page=>page-1);
        pageHandler(page-1)
           
       }
      
     
   }
    
  

    return (
        <div className="pagination__cnr">
           
            <button  className="page__btn" onClick={()=>{pageHandler(1)
            setPage(1)}}><GrChapterPrevious/></button>
            <button  className="page__btn"  onClick={previousPage}><GrFormPrevious/></button>
            <ul>
                {pageNumbers.map(eachPage=>(
                    <li key={eachPage}>
                       <button className={page===eachPage? "page__btn bg__btn":"page__btn"}  onClick={()=>selectedPage(eachPage)}>{eachPage}</button>
                    </li>
                ))}
            </ul>
            <button  className="page__btn" onClick={nextPage}><GrFormNext/></button>
            <button  className="page__btn" onClick={()=>{pageHandler(pageNumbers.length)
            setPage(pageNumbers.length)}}><GrChapterNext/></button>
        </div>
    )
}

export default Pagination

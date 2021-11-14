import React from 'react'
import { useState } from 'react'
import {AiOutlineDelete} from "react-icons/ai"
import {FiEdit} from "react-icons/fi"
import "./index.css"

function Member(props) {
    const {eachMemberDetails,deleteDetails}=props
    const {id,name,email,role}=eachMemberDetails

    const [checked,setChecked]=useState(true);


    
   
    const setChecking=(e)=>{
        setChecked(checked=>!checked)
        let isChecked=e.target.checked;
        eachMemberDetails.isChecked=isChecked;
       
        return eachMemberDetails;
     
    
    }
       
     
  


    const onDeleteDetails=()=>{
        deleteDetails(id)
    }

    return (
        <li className={!checked ? "bg eachMember__details":"eachMember__details"}>

            <input 
            type="checkbox"
           checked={eachMemberDetails.isChecked}
            onChange={setChecking}
         
            />
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{role}</p>

            <div>

            <FiEdit/>

         
         
            <button className={!checked && "bg"} onClick={onDeleteDetails}><AiOutlineDelete/></button>
       </div>
        </li>
    )
}

export default Member

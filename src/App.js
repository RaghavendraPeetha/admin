import {useState,useEffect} from "react"
import './App.css';
import Loader from 'react-loader-spinner'
import Member from "./Components/Member";
import Pagination from "./Components/Pagination"

function App() {

  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

  const [members,setMembers]=useState([]);
  const [currentPage,setCurrentPage]=useState([]);
  const [searchInput,setSearchInput]=useState("");
  const [loading,setLoading]=useState(apiStatusConstants.initial);
 

  
  
  
  async function fetchData (){
    setLoading(apiStatusConstants.inProgress);
    const url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response=await fetch(url);
    const data=await response.json();

    if (response.ok){
    setMembers(data.map(each=>{
      return {
      "isChecked":false,
      id:each.id,
      name:each.name,
      email:each.email,
      role:each.role,
      };
      
    }));
    setCurrentPage(data.slice(0,10));
    setLoading(apiStatusConstants.success);
  }else{
    setLoading(apiStatusConstants.failure);
  }
    };
 

  useEffect (() => {

    
    fetchData();
    
  }, []);



 
  useEffect(() => {
    setCurrentPage(members.slice(0,10));
  }, [members])

  



  

const onChangeSearchInput=(e)=>{
  setSearchInput(e.target.value);
}


const filteredMembers=()=>{
  
  const filteredByName=members.filter(eachMember=>eachMember.name.toLowerCase().includes(searchInput));

  const filteredByEmail=members.filter(eachMember=>eachMember.email.toLowerCase().includes(searchInput));
  const filteredByRole=members.filter(eachMember=>eachMember.role.toLowerCase().includes(searchInput));


  
  if (filteredByRole.length>0){
     setMembers(filteredByRole);
  }

  if (filteredByName.length>0){
    setMembers(filteredByName);
  }

  if (filteredByEmail.length>0){
    setMembers(filteredByEmail);
  }

  

  

}




const deleteDetails=(id)=>{
    const filteredMembers=members.filter(eachMember=>eachMember.id!==id);
   console.log(filteredMembers,"hmm")
   setMembers(filteredMembers)
   setCurrentPage(members.slice(0,10));
}



const onDeleteSelected=()=>{

  

  console.log(currentPage,"pages")

   const filteredRows=currentPage.filter(each=>each.isChecked!==true);
   setCurrentPage(filteredRows);

  
  
  
  

  
  
}


const onEnter=e=>{
  if (e.key==="Enter"){

    if (searchInput.length !==0){
      filteredMembers();
    }
    else{
     
      fetchData();
    }
   
  }
}

const onToggleAll=e=>{
  const isChecked=e.target.checked;
  setCurrentPage(currentPage.map(each=>{
     each.isChecked=isChecked;
     return each;
  }));
}


const pageHandler=(pageNumber)=>{
  
  setCurrentPage(members.slice((pageNumber-1)*10,pageNumber*10))
}

  console.log(members)


  const renderMembers=()=>(
    <div className="App">




    <input 
    type="search"
    value={searchInput}
    onChange={onChangeSearchInput}
    placeholder="Search by name,emial or role"
    onKeyDown={onEnter}
    />


   


  
  <div className="details__cnr">
    <div className="headings__cnr">
    <input 
    type="checkbox"
   onChange={onToggleAll}

    />
    <div>
    <h1 className="name">Name</h1>
    </div>
    <div>
    <h1>Email</h1>
    </div>
    <div>
    <h1 className="role">Role</h1>
    </div>
    <div>
    <h1>Actions</h1>
    </div>
    </div>
     <ul>
       {currentPage.map(eachMember=>(
         <Member key={eachMember.id}
         eachMemberDetails={eachMember}
         deleteDetails={deleteDetails}
        
        
         />
       ))}
     </ul>
     </div>
     <div className="page__selector">

       <button className="delete__btn" onClick={onDeleteSelected}>Delete Selected</button>
     <Pagination members={members} pageHandler={pageHandler}/>
     
     </div>

    
  </div>
  );

const renderFailureView=()=>(
  <div>
    <button onClick={fetchData} className="delete__btn">Retry</button>
  </div>
);


 const renderLoadingView = () => (
    <div >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )


 const renderdetails = () => {
   

    switch (loading) {
      case apiStatusConstants.success:
        return renderMembers()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

    


  return (



    <div>
    {renderdetails()}
 </div>

   
  );
}

export default App;

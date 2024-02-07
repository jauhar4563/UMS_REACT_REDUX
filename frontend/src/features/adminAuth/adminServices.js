import axios from 'axios'


const API_URL='/api/admin/'

//login admin
const adminLogin=async(adminData)=>{
    const response=await axios.post(API_URL+'login',adminData)
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}


//logout admin
const adminLogout=()=>{
    localStorage.removeItem('admin')
}

//get all users
const getAllUsers=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response= await axios.get(API_URL,config)
    return response.data
   
}

//block user
const userBlock=async(token,userId)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response =await axios.post(API_URL+'block',{
        userId},config)
    return response.data
}

//edit user deatils
const editUserDeatils=async(token,userId,name,email)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.put(API_URL+userId,{userId,name,email},config)
    return response.data
}

//add user
const addUser=async(userData,token)=>{

    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
   
    const response=await axios.post(API_URL+'adduser',{userData},config)
    return response.data
}
//user search
const searchUser=async(query,token)=>{
   
    const config={
        
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
 
    const response=await axios.post('/api/admin/search',{query},config)
    
    return response.data
}



const adminAuthService={
    adminLogin,
    adminLogout,
    getAllUsers,
    userBlock,
    editUserDeatils,
    searchUser,
    addUser

  
}

export default adminAuthService;
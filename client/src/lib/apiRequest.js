import axios from "axios"
const apiRequest=axios.create({
    baseURL:"http://localhost:3030/api",
        withCredential:true
})
export default apiRequest
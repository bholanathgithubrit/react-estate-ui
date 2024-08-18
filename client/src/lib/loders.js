import apiRequest from "./apiRequest.js"
import {defer} from "react-router-dom"
export const singlePostLoader=async ({request,params})=>{
    const res=await apiRequest.get("/posts/"+params.id,)
    return res.data
}

export const listPageLoader=async ({request,params})=>{
    console.log(request)
    const query=request.url.split("?")[1]

    const postPromise=await apiRequest("/posts?"+query)
    return defer({
        postResponse:postPromise
    })
}


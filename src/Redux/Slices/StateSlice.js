import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    allUserCount:0,
    subscribedCount:0
}


export const getStatesData=createAsyncThunk('/stats/get',async()=>{
    try{
        const response=axiosInstance.get('/admin/stats/users');
        toast.promise(response,{
            loading:"Getting the states",
            success:(data)=>{
                return data?.data?.message

            },
            error:'Failed to load the data'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})
const stateSlice=createSlice({
    name:'state',
    initialState,
    reducers:{},
    extraReducers:()=>{}
})

export default stateSlice.reducer
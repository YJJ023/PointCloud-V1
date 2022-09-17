import { createSlice } from "@reduxjs/toolkit"
const PointListSlice=createSlice({
name:"Slice1",
initialState:[{x:0,y:0,z:0}],
reducers:{
AddPoint:(state,action)=>{state.unshift(action.payload)},
DeletePoint:(state,action)=>{state.splice(action,1)},
}


})
export const{AddPoint,DeletePoint}=PointListSlice.actions
export default PointListSlice.reducer
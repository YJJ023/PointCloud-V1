import { createSlice } from "@reduxjs/toolkit";
const SetPointSlice=createSlice({
name:"Slice2",
initialState:{x:0,y:0,z:0},
reducers:{
ReNew:(state,action)=>{
    state.x=action.payload.x;
    state.y=action.payload.y;
    state.z=action.payload.z;
},
//修改state不会更新，只能修改state的属性
}

})
export const {ReNew}=SetPointSlice.actions
export default SetPointSlice.reducer
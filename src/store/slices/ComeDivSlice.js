import { createSlice } from "@reduxjs/toolkit";
const ComeDiv=createSlice({
name:"slice3",
initialState:{updiv:"hidden"},
reducers:{
    DivVisible:(state,action)=>{state.updiv=action.payload},
}

})
export const{DivVisible}=ComeDiv.actions
export default ComeDiv.reducer
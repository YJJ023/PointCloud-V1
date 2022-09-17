import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const GetPoint=createSlice({
name:"slice4",
initialState:{rendpoints:[]},
reducers: {
    delpoints:(state)=>{state.rendpoints.length=0;}
/* gettest:async (state,action)=>{
    const data=await fetch('http://localhost:8002/api/setPoint',{
        method:"POST",
        headers:{
            "Content-type":  'application/json;charset=utf-8',
          },
          body:JSON.stringify(action.payload)
    });
    const newpoints=await data.json();
    state.rendpoints=newpoints;
} */
},

extraReducers:(bulider)=>{
    bulider.addCase(getData.pending,(state,action)=>{
    });
    bulider.addCase(getData.fulfilled,(state,action)=>{
  action.payload.data.points.forEach((item,index)=>{
    state.rendpoints[index]=item;console.log(document.cookie)
});
    });
    bulider.addCase(getData.rejected,(state,action)=>{
    });
}})
export default GetPoint.reducer;
export const {delpoints}=GetPoint.actions



export const getData=createAsyncThunk(
    "yjj",
    async (pointlist)=>{
    const data=await fetch('http://localhost:8002/api/setPoint',{
            method:"POST",
            headers:{
                "Content-type":  'application/json;charset=utf-8',
              },
              body:JSON.stringify(pointlist)
        });
        const newpoints=await data.json();
        console.log(newpoints)
        return newpoints
    }
)
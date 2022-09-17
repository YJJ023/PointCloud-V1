import { configureStore } from "@reduxjs/toolkit";
import PointListSlice from "./slices/PointListSlice";
import SetPointSlice from "./slices/SetPointSlice";
import ComeDivSlice from "./slices/ComeDivSlice";
import GetPointSlice from "./slices/GetPointSlice";
const store=configureStore({
reducer:{
PointList:PointListSlice,//更新球模型坐标数组，state不适合管理数据，
//同时增加arr[0]删除arr[2];dispatch()像setstate一样只取最后一次有效
SetPoint:SetPointSlice,//点击球模型显示坐标
ComeDiv:ComeDivSlice,//点击球模型更新状态
//(由于addeventlistener里state不同步而useref同步而采用useref)
GetPoint:GetPointSlice
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
        serializableCheck: false
    }
),
})
export default store
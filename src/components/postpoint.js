import './postpoint.css'
import React, { memo } from 'react'
import * as THREE from 'three'
 function Postpoint(props){
console.log(props.pointlist)
async function postdata(){//拿到新的点集合
const data =await fetch('http://localhost:8002/api/setPoint',{
method:'POST',
headers:{
    "Content-type":  'application/json;charset=utf-8',
  },
body:JSON.stringify(props.pointlist),
});

let newpointlist=await data.json();//拿到新的点集合

props.pointlist.forEach((element,index) => {
  props.scene.remove(props.list[index]);//去除scene的所有点对象
});
props.pointlist.length=0;//点坐标对象清零
props.arr.length=0;//线模型的点坐标清零
//新的线模型为空，没有点
props.linemodel.geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(props.line),3);
props.scene.add(props.linemodel);
newpointlist.data.points.map((item,index)=>{
props.pointlist[index]=item;//更新所有点
props.uprender(n=>n+1);
  return 0;
})

}
    return(<>
    <button className='post' onClick={()=>{postdata()}}>上传数据</button></>)
}

export default memo(Postpoint)
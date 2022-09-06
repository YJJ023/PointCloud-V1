/* eslint-disable jsx-a11y/no-access-key */
import './getpoints.css'
import * as THREE from 'three'
import React, { useRef } from 'react'

function Getpoints(props){
const carpoints=useRef([]);//新的点模型对象数组
async function postdata(){
const data=await fetch(
'http://localhost:8002/api/setPoint',{
 method:'POST',
 headers:{
    "Content-type":  'application/json;charset=utf-8',
  },
  body:JSON.stringify(props.pointlist)
});
const newpoints=await data.json();
newpoints.data.points.forEach((item,index)=>{
    const sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff3344,opacity:0.8,transparent:true});
    let  pointsphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pointsphere.position.x=item.x;
    pointsphere.position.y=item.y;
    pointsphere.position.z=item.z;
    carpoints.current.unshift(pointsphere);
    props.scene.add(pointsphere);
    });
    props.uprender(n=>n+1);//让app组件渲染
}
function deletedata(){
carpoints.current.forEach((item,index)=>{
props.scene.remove(item);
})
carpoints.current.length=0;
props.uprender(n=>n+1);//让app组件渲染
}


return (<>
<button accessKey='q' className='post'   onClick={()=>{postdata()}}>渲染车道线(Alt+q)</button>
<button accessKey="a" className='delete' onClick={()=>{deletedata()}}>删除数据(Alt+a)</button>
</>)
};
export default Getpoints
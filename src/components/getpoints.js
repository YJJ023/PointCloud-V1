/* eslint-disable jsx-a11y/no-access-key */
import './getpoints.css'
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData ,delpoints} from '../store/slices/GetPointSlice';

function Getpoints(props){
const carpoints=useRef([]);//新的点模型对象数组
const dispatch=useDispatch();
const newdata=useSelector((state)=>state.GetPoint.rendpoints);
  newdata.forEach((item,index)=>{
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff3344,opacity:0.8,transparent:true});
    let  pointsphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pointsphere.position.x=item.x;
    pointsphere.position.y=item.y;
    pointsphere.position.z=item.z;
    carpoints.current.unshift(pointsphere);
    console.log(carpoints)
    props.scene.add(pointsphere);
    });

 function postdata(){
 dispatch(getData(props.pointlist));//渲染
 console.log(newdata)

}

/* async function postdata(){
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
} */
function deletedata(){
carpoints.current.forEach((item,index)=>{
props.scene.remove(item);
})
/* newdata.forEach((item,index)=>{
  console.log(carpoints.current[index])
  props.scene.remove(carpoints.current[index])
}); */
carpoints.current.length=0;
dispatch(delpoints())
//props.uprender(n=>n+1);//让app组件渲染
}


return (<>
<button accessKey='q' className='post'   onClick={()=>{postdata()}}>渲染车道线(Alt+q)</button>
<button accessKey="a" className='delete' onClick={()=>{deletedata()}}>删除数据(Alt+a)</button>
</>)
};
export default Getpoints
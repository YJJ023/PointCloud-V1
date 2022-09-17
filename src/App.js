/* eslint-disable jsx-a11y/no-access-key */

import './App.css';
import Render from './components/render';
import {  useRef, useState ,createContext, useLayoutEffect} from 'react';
import * as THREE from 'three'
import Data from './components/data';
import Getpoints from './components/getpoints';
import {  useSelector } from 'react-redux';
export const CountContext = createContext();

function App() {
const point=useSelector((state)=>state.SetPoint);//点击的xyz存储在redux point中
// eslint-disable-next-line no-unused-vars
let data=useRef({a:[0,0,0]})
let pointlist=useRef([{x:0,y:0,z:0}]);//标记点的坐标集合
let arr=useRef([]);//线模型的点坐标数组（三个一套）
// eslint-disable-next-line no-unused-vars
const[a,seta]=useState(1);
let geometry =useRef(new THREE.BufferGeometry());//线的点集合对象
let line=useRef(new THREE.Line(
  geometry.current,
  new THREE.LineBasicMaterial({
    color:0x00ffff ,
  })));
useLayoutEffect(()=>{
geometry.current.attributes.position=new THREE.BufferAttribute(new Float32Array(arr.current),3);
data.current.c.add(line.current);},[])


  return (
<>
<Getpoints
pointlist={pointlist.current}//点集合
list={data.current.b} //记录的点的模型对象集合
scene={data.current.c} //scene对象
uprender={seta}
></Getpoints>
<div className='fixed'>
<div id='remove'></div>{/*显示点id的小白条*/}
<button accessKey="s" onClick={()=>{//将球模型添加至数组
const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff3344,opacity:0.8,transparent:true});
let  pointsphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
pointsphere.position.x=point.x;
pointsphere.position.y=point.y;
pointsphere.position.z=point.z;

/* dispatch(AddPoint(pointsphere)); */


//data.current.d.unshift(1);//把render组件的varlog数组第一项放进去，
//以免点击一下才能激活oncilck事件的varlog[index]=1,晚一步把点放进varlog
data.current.b.unshift(pointsphere);
data.current.c.add(pointsphere);

/* dispatch(AddPoint({
  x:point.x,
  y:point.y,
  z:point.z
   })) */

pointlist.current.unshift({//将xyz添加至数组
   x:point.x,
   y:point.y,
   z:point.z
    });
    //因list改变而渲染
    seta(n=>n+1)//状态a改变render组件不渲染

arr.current.push(//将球模型坐标添加至线渲染数组
point.x,
point.y,
point.z
);
/* if(test1[test1.length-1].x===0){
  dispatch(DeletePoint(test1.length-1))
} *///不能用redux，redux适合状态存储而不是数据存储，
    //这样连续两个dispatch,第一个会直接被忽略
//除去第一个无用数据
if(pointlist.current[pointlist.current.length-1].x===0){

  pointlist.current.splice(pointlist.current.length-1,1)
}
//更新一下线
geometry.current.attributes.position=new THREE.BufferAttribute(new Float32Array(arr.current),3);

}} >标注点云(Alt+S)</button>{/* Object.values(data.current.a)[0] */}
<div>x:{point.x}</div>
<div>y:{point.y}</div>
<div>z:{point.z}</div>
<div>点云数据类型：Intensity</div>
<div>点云阈值：1 反射强度：1.5</div>
<CountContext.Provider value={pointlist.current}>

  <Render 
  uprender={seta}
  ref={data}//从render.js里拿数据到app.js
  line={arr.current}//线模型的点数组坐标集合
  linemodel={line.current}//一整个线模型对象
></Render>

  <Data 
  uprender={seta} 
  list={data.current.b} //记录的点的模型对象集合
  scene={data.current.c} //scene对象
  line={arr.current}//线模型的点数组坐标集合
  linemodel={line.current}//一整个线模型对象
  ></Data>

</CountContext.Provider>
</div>
</>
  
  );
}

export default App;

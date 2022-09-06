/* eslint-disable jsx-a11y/no-access-key */

import './App.css';
import Render from './components/render';
import {  useRef, useState ,createContext, useLayoutEffect} from 'react';
import * as THREE from 'three'
import Data from './components/data';
import Getpoints from './components/getpoints';
export const CountContext = createContext();

function App() {
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
pointsphere.position.x=Object.values(data.current.a)[0];
pointsphere.position.y=Object.values(data.current.a)[1];
pointsphere.position.z=Object.values(data.current.a)[2];


data.current.d.unshift(1);//把render组件的varlog数组第一项放进去，
//以免点击一下才能激活oncilck事件的varlog[index]=1,晚一步把点放进varlog
data.current.b.unshift(pointsphere);
data.current.c.add(pointsphere);

pointlist.current.unshift({//将xyz添加至数组
   x: Object.values(data.current.a)[0],
   y:Object.values(data.current.a)[1],
   z:Object.values(data.current.a)[2]
    });
    seta(n=>n+1)//状态a改变子组件不渲染

arr.current.push(//将球模型坐标添加至线渲染数组
Object.values(data.current.a)[0],
Object.values(data.current.a)[1],
Object.values(data.current.a)[2]
);

//除去第一个无用数据
if(pointlist.current[pointlist.current.length-1].x===0){
  pointlist.current.splice(pointlist.current.length-1,1)
}
//更新一下线
geometry.current.attributes.position=new THREE.BufferAttribute(new Float32Array(arr.current),3);

}} >标注点云(Alt+S)</button>
<div>x:{Object.values(data.current.a)[0]}</div>
<div>y:{Object.values(data.current.a)[1]}</div>
<div>z:{Object.values(data.current.a)[2]}</div>
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
// eslint-disable-next-line no-lone-blocks
{/* <Postpoint 
arr={arr.current}//线模型的点坐标集合
pointlist={pointlist.current}//点集合
list={data.current.b} //记录的点的模型对象集合
linemodel={line.current}//一整个线模型对象
scene={data.current.c} //scene对象
uprender={seta}
></Postpoint> */}
import './test.css'
import React from 'react'
export default function Test(){
   
  
// eslint-disable-next-line no-unused-vars
async function getjpg(){
let jpg=await fetch("http://localhost:8002/imgs/1.jpg");
console.log(jpg);
const myblob=await jpg.blob();
console.log(myblob);
const objectURL = URL.createObjectURL(myblob);
console.log(objectURL);
const myImage = document.querySelector('img');
myImage.src = objectURL;

} 

// eslint-disable-next-line no-unused-vars
async function postpoint(){

    const response = await fetch('http://localhost:8002/api/setPoint', {
        method: 'POST',
        headers: {
          "Content-type":  'application/json;charset=utf-8',
        },
        mode:'cors',//
        body: JSON.stringify({as:"114514"}),
      });
      console.log(response)
      // eslint-disable-next-line no-unused-vars
      const json =await response.json();
      console.log(json)

}


return(<>
<button onClick={()=>{postpoint()}} className='test'>上传点</button>
<button onClick={()=>{getjpg()}} className='test'>拿图片</button>
<img alt='sddsasdsas'></img>
</>)

}
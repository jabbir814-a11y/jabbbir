import React, { useState } from "react"
import'./jabbir.css'
import axios from "axios";
function App(){
const[brand,setbrand]=useState('')
const[amount,setamount]=useState('')
const user=async()=>{
const res =await axios.post("http://localhost:3000/users",{
brand:brand,
amount:amount
})

}
return(
<div>
<h1 style={{marginLeft:590}}>inventory management </h1>
<input type="text" style={{marginLeft:550, width:200}}  placeholder="enter you brand  " onChange={(e)=>setbrand(e.target.value)}></input>
<input type="number" style={{marginLeft:50, width:200}} placeholder="enter your amount " onChange={(e)=>setamount(e.target .value)}></input>
<button onClick={user} > sumbit </button>

</div>
)
}

export default App

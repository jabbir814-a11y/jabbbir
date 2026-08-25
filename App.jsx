import React, { useState } from "react"
import'./jabbir.css'
import axios from "axios";
function App(){
const[brand,setbrand]=useState('')
const[amount,setamount]=useState('')
const taxrate =18;
const subtotal=Number(amount)
const tax=subtotal*(taxrate/100)

const total=subtotal+taxrate

const user=async()=>{
const res =await axios.post("http://localhost:3000/users",{
brand:brand,
amount:amount
})

}
return(
<div>
<h1 style={{marginLeft:590}}>hotel management </h1>
<input type="text" style={{marginLeft:550, width:200}}  placeholder="enter you food  " onChange={(e)=>setbrand(Number(e.target.value))}></input>
<input type="number" style={{marginLeft:50, width:200}} placeholder="enter your amount " onChange={(e)=>setamount(Number(e.target .value))}></input>
<button onClick={user} > sumbit </button>
<p style={{}}>subtotal${subtotal.toFixed(2)}</p>
<p>Tax ({taxrate}%): ${tax.toFixed(2)}</p>
<p>total{total.toFixed(2)}</p>

</div>
)
}

export default App

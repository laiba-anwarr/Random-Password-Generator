import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
 
 const [password , setPassword] =useState("");
 const [length , setlength]=useState(8);
 const [numberAllowed, setNumberAllowed]=useState(false);
 const [charAllowed, setCharAllowed]=useState(false);
 const passwordGenerator = useCallback(() =>{
let pass="";
let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if(numberAllowed) str += "01234567789";
if(charAllowed) str += "!@#$%^&*()"
 for (let i = 1; i <= length; i++ ) {
 let char = Math.floor(Math.random() * str.length + 1);
pass += str.charAt(char)


 }
 setPassword(pass)
}


,[length , numberAllowed , charAllowed , setPassword])

 const copypassword= useCallback(()=>{
  passref.current?.select()
window.navigator.clipboard.writeText(password)

 } ,[password])
 const passref = useRef(null)

useEffect(()=>{
passwordGenerator()
}, [length , numberAllowed , charAllowed , passwordGenerator])

  return (
    <>
     <div id='main' className='flex justify-center items-center' >
      <div id="overlay"></div>
      
      <div id="passGen" className='bg-white w-full max-w-md  px-5 py-4'>
<h1 className='text-black text-2xl font-semibold my-2 mb-8 text-center'>Password Generator</h1>

     
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-6'>
      <input 
      type="text" 
      placeholder='Password'
      ref={passref}
      value={password}
      className='w-full outline-none py-2  mb-4 px-3'
      readOnly />
 
<button 
onClick={copypassword}
className='outline-none  text-white px-3 py-1  '
style={{backgroundColor:"#5D6E85"}}>Copy</button>
</div>
<div className='flex gap-x-2 text-sm py-3'>
<div className='flex items-center gap-x-1'>
  <input 
  type='range'
  min={6}
  max={20}
 value={length}
 onChange={(e)=>{
  setlength(e.target.value)
 }
 }
  className='cursor-pointer'/>
  <label>length:{length}</label>
</div>
<div className='flex items-center gap-x-1'>
  <input type="checkbox"
  defaultValue={numberAllowed}
  onChange={()=>{
    setNumberAllowed((prev) => !prev)
  }}
  id='numberInput' />
  <label htmlFor='numberInput'>Numbers</label>

</div>
<div className='flex items-center gap-x-1'>
  <input type="checkbox"
  defaultValue={charAllowed}
  onChange={()=>{
    setCharAllowed((prev) => !prev)
  }}
  id='characterInput' />
  <label htmlFor='characternput'>Characters</label>
  
</div>
</div>
      </div>
     </div>
    </>
  )
}

export default App

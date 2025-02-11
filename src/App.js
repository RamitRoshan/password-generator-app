import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { LC, NC, SC, UC } from './data/PassChar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let [uppercase,setUpperCase]=useState(false)
  let [lowercase,setLowerCase]=useState(false)
  let [number,setNumber]=useState(false)
  let [symbols,setSymbols]=useState(false)
  let [passwordlen,setPasswordLen]=useState(10)
  let [fPass,setPass]=useState('')

  let createPassword=()=>{
    let finalPass='';
    let charSet='';
    //if any1 in 4 is true then  logic will use
    if(uppercase || lowercase || number || symbols){
      //if uppercase is true then in charset ,UC character should add
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbols) charSet+=SC;

      //this for loop will help  till what length of password should generate
      for(let i=0; i<passwordlen;i++){
        //use charAt for the random password, Math.floor is used to round off value(4.5=4), Math.random(0to1), charSet(26  i.e A to Z)
        finalPass+=charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setPass(finalPass);
      toast.success("Password Generated Successfully!"); // Show success toast
    }
    else{
      // alert("Please select atleast one CheckBox!..")
      toast.error("Please select at least one checkbox!"); // Show error toast
    }
  }

  let copyPass=()=>{
    //navigator.clipboard.writeText(fPass);
    if(fPass){
    navigator.clipboard.writeText(fPass);
    toast.success("Password Copies!");
    } else{
      toast.error("No password Copies..");
    }
  }

  return (
     <>
      <ToastContainer position="top-right" autoClose={2000} />
     <div className='passwordBox'>
       <h2>Password Generator</h2>

       <div className='passwordBoxin'>
         <input type='text' value={fPass} readOnly/> <button className='copyBtn' onClick={copyPass}>Copy</button>
       </div>

       <div className='passLength'>
          <label>Password length</label>
          <input type='number' max={20} min={10} value={passwordlen} 
          onChange={(event)=>setPasswordLen(event.target.value)}/>
       </div>

       <div className='passLength'>
          <label>Include uppercase letters</label>
          <input type='checkbox' checked={uppercase} onChange={()=>setUpperCase(!uppercase)}/>
       </div>

       <div className='passLength'>
          <label>Include lowercase letters</label>
          <input type='checkbox' checked={lowercase} onChange={()=>setLowerCase(!lowercase)}/>
       </div>

       <div className='passLength'>
          <label>Include numbers</label>
          <input type='checkbox' checked={number} onChange={()=>setNumber(!number)}/>
       </div>

       <div className='passLength'>
          <label>Include symbols</label>
          <input type='checkbox' checked={symbols} onChange={()=>setSymbols(!symbols)}/>
       </div>
       <button className='btn' onClick={createPassword}>
        Generate password
       </button>

     </div>
     </>
  );
}

export default App;

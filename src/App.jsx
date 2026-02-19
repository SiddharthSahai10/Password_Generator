import { useState,useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  //ref hook
  const passwordRef=useRef(null)
 
  const passwordgenerator= useCallback(() => {
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)   str+="!@#$%^&*()~`_-+="

    for (let i = 1; i <= length; i++){
     let cha= Math.floor(Math.random() * str.length)
     pass +=str.charAt(cha)     
    }

    setpassword(pass)

  },[length,numberAllowed,charAllowed,setpassword] )

const copyPasswordToClipboard = useCallback(() =>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,18)
  window.navigator.clipboard.writeText(password)
}, [password])


  useEffect(() => {
    passwordgenerator()
  }, [length,numberAllowed,charAllowed,setpassword])
  return (
    <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-50 text-orange-500 bg-gray-700 py-2"> 
    <h1 className='text-white text-center my-2 py-2 text-2xl'>Password Generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4"> 
    <input
     type="text" 
     value={password}
     className='outline-none w-full py-1 px-3 bg-white '
     placeholder='Password'
     readOnly
     ref={passwordRef }
     />
     <button 
     onClick={copyPasswordToClipboard}
     className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >
      copy
     </button>
  </div>
  <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
      <input type="range" 
      min={6}
      max={20}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setLength(e.target.value)}}
      />
        <label> Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
     <input
      type="checkbox"
      // defaultChecked={numberAllowed} 
      id="numberInput"
      onChange={() => {
        setnumberAllowed((prev) => !prev)
      }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
         type="checkbox"  
        //  defaultChecked={charAllowed}
         id='characterInput'
         onChange={() => {
          setcharAllowed((prev) => !prev)
         }}
         />
         <label  htmlFor="characterInput">Characters</label>
      </div>
    </div>
  </div>
    </>
  )
}

export default App

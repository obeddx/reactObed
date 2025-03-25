// props parameter dalam function


import Button from "./button"
import Input from "./input"
import Label from "./label"
const Form = ({  action, onsubmit=''}) => {

    return <>
    
    <form id="loginform" action={action} className="space-y-4" onsubmit={onsubmit}>
    
       <div>
          <Label
            
            forLaabel="email"
            classname="block text-sm font-medium text-gray-700"
            tulisanLabel="Email"
          
          
          />
           <Input

            type="email"
            name="email"                       
            placeholder="Masukkan email Kamu"
           
           
           
           />
       </div>
       <div>
       <Label
            
            forLaabel="password"
            classname="block text-sm font-medium text-gray-700"
            tulisanLabel="Password"
          
          
          />
           <Input
             type="password"
             name="password"
             placeholder="Masukkan Password Kamu"
           
           />
       </div>
       <div className="flex justify-between items-center">
           <label for="" className="flex items-center">
               <input type="checkbox" className="mr-2"/>
               
               <span className="text-sm text-gray-700">Ingat saya</span>
               
           </label>
           <a href="#" className="text-sm text-blue-500 hover:underline">Lupa Password</a>
       </div>
       {/* <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover: bg-blue-700 transition">Login</button> */}
       <Button
         type="submit"
         tulisanBuuton="Login"
       />
       
   </form>
   </>
    
    
    
    }
    export default Form;
// props parameter dalam function
const Input = ({ classname, placeholder=''}) => {

    return <>
             <input
              className={classname}
              placeholder={placeholder}
              required
            />
    </>
    
    
    
    }
    export default Input;
// props parameter dalam function
const Input = ({ classname, placeholder='', value, onChange}) => {

    return <>
             <input
              className={classname}
              placeholder={placeholder}
              required
        value={value} // Menambahkan value untuk controlled input
        onChange={onChange} // Menambahkan onChange untuk update state
            />
    </>
    
    
    
    }
    export default Input;
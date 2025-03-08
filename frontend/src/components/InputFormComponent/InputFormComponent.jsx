

const InputFormComponent = (props) => {

    // eslint-disable-next-line react/prop-types
    const {placeholder, ...rests} = props;
    const handleOnChangeInput = (e) => {
      // eslint-disable-next-line react/prop-types
      props.onChange(e.target.value);
    }
  
  return (

    // eslint-disable-next-line react/no-unknown-property, react/prop-types
    <input type={props.type} className= {`w-full px-4 py-2 mb-2 border outline-none border-gray-300 rounded-md ${props.className}`} placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} />
  )
}
export default InputFormComponent;
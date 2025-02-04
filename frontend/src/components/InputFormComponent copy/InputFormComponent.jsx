

const InputFormComponent = (props) => {

    // eslint-disable-next-line react/prop-types
    const {placeholder, ...rests} = props;
    const handleOnChangeInput = (e) => {
      // eslint-disable-next-line react/prop-types
      props.onChange(e.target.value);
    }
  
  return (

    // eslint-disable-next-line react/no-unknown-property, react/prop-types
    <input type="text" placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} className="px-4 py-2 mt-2 border rounded-lg" />
    
  )
}
export default InputFormComponent;
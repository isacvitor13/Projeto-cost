import styles from './InputForms.module.css'
function Input({type,placeholder,name,text,value,HandleOnChange}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input type={type}
            placeholder={placeholder}
            onChange={HandleOnChange}
            name={name}
            id={name}
            value={value}/>
        </div>
    )
}
export default Input
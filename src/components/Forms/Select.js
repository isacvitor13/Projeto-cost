import styles from './Select.module.css'
function Select({ name, text, value, HandleOnChange, options }) {
    return (
        <div className={styles.select_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={HandleOnChange} value={value || ''}>
                <option>Selecione uma categoria</option>
                {options.map((option) =>
                 (<option key={option.id}>
                    {option.name}
                    </option>
                    ))}
            </select>
        </div>
    )
}
export default Select
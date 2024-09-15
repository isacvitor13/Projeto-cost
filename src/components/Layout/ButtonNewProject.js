import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function ButtonNewProject({ to, text }) {
    return (
        <Link to={to} className={styles.Btn}>{text}</Link>
    )
}
export default ButtonNewProject
import { Link } from "react-router-dom";
import styles from './navBar.module.css'
import logo from '../../img/costs_logo.png'
import Container from "./Container";



function NavBar() {
    return (

        <nav className={styles.navegar}>
            <Container>
            <Link to='/'> <img src={logo} alt='logo do prjeto' className={styles.logo} /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li >
                    <li className={styles.item}><Link to='/Empresa'>Empresa</Link></li >
                    <li className={styles.item}><Link to='/Projetos'>Projetos</Link></li >
                    <li className={styles.item}><Link to='/Contatos'>Contatos</Link></li>
                </ul>
            </Container>
        </nav>










    )
}
export default NavBar
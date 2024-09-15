import styles from './home.module.css'
import ButtonNewProject from '../Layout/ButtonNewProject'
import cost_img from "../../img/savings.svg"


function Home() {
    return (
        <section className={styles.HomeCost}>
            <h1>Bem Vindo ao <span>Costs</span></h1>
            <p>Começe gerenciar os seus projetos agora mesmo!</p>
            <ButtonNewProject to='/NovoProjetos' text='Criar novo projeto' />
            <img src={cost_img} alt="cost" />
        </section>
    )
}

export default Home 
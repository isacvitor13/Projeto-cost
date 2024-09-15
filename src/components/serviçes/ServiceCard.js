import styles from '../Projects/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'
function ServiceCard({ id, cost, descrição, name, HandleRemove }) {
    function remove(e) {
        e.preventDefault()
        HandleRemove(id,cost)
     }

    return (
        <div className={styles.project_card} key={id}>
            <h4>{name}</h4>
            <p>
                <span>Custo total: </span>R${cost}
            </p>
            <p>{descrição}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}><BsFillTrashFill /> Excluir</button>
            </div>

        </div>


    )
}
export default ServiceCard
import { useNavigate } from 'react-router-dom'

import styles from './NewProjects.module.css'
import ProjectForms from '../Projects/ProjectForms'

function NovoProjeto() {

    const navigate = useNavigate()

    function CriarProjeto(project) {
        project.cost = 0
        project.services = []
        fetch('http://localhost:5000/Project', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                navigate( '/Projetos', { message: 'Projeto criado com sucesso!' })
            })
            .catch((err) => { console.log(err) })
    }


    return (
        <div className={styles.New_Project}>
            <h1> Crie seu projeto!</h1>
            <p>Crie os seus projetos para depois adicionar os serviços</p>
            <ProjectForms handleSubmit={CriarProjeto} btnText='Criar Projetos' />
        </div>
    )
}
export default NovoProjeto


import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import Message from "../Layout/Message"
import Container from "../Layout/Container"
import ButtonNewProject from "../Layout/ButtonNewProject"
import ProjectCard from "../Projects/ProjectCard"
import Loading from "../Layout/Loading"

import styles from "./Projetos.module.css"


function Projetos() {

    const [Projects, setProjects] = useState([])
    const [RemoveLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    //mostra a mensagem de projeto criado
    const location = useLocation()
    let message = ''
// console.log(location)
    if (location.state) {
        message = location.state.message
    }

    //carrega os projetos
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/Project', {
                method: "Get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => resp.json())
                .then((data) => {

                    setProjects(data)
                    setRemoveLoading(true)

                })
                .catch((error) => console.log(error))
        }, 300)

    }, [])


    //remove os projetos
    function setRemove(id) {
        fetch(`http://localhost:5000/Project/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "appliction/json"
            }
        })
            .then((resp) => resp.json())
            .then(() => {
                setProjects(Projects.filter((Projects) => Projects.id !== id))

                //envia mensagem
                setProjectMessage('Projeto excluído!!!')
            })
            .catch((erro) => console.log(erro))

    }

    return (
        <div className={styles.projeto_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <ButtonNewProject to='/NovoProjetos' text='Criar novo projeto' />
            </div>
            {message && <Message type='sucess' msg={message} />}
            {projectMessage && <Message type='info' msg={projectMessage} />}
            <Container mudar="start">
                {Projects.length > 0 &&
                    Projects.map((project) =>
                        <ProjectCard
                            id={project.id}
                            name={project.nome}
                            category={project.Categorias.name}
                            budget={project.orçamento}
                            key={project.id}
                            handleRemove={setRemove}
                        />)}
                {!RemoveLoading && <Loading />}
                {Projects.length === 0 && RemoveLoading && <p>Nenhum Projeto</p>}
            </Container>

        </div>

    )
}
export default Projetos
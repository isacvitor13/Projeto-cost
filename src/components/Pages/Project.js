import styles from './Project.module.css'

import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Container from "./../Layout/Container"
import Loading from './../Layout/Loading'
import ProjectForms from '../Projects/ProjectForms'
import Message from '../Layout/Message'
import ServiceForm from '../serviçes/ServiceForm'
import ServiceCard from '../serviçes/ServiceCard'

function Project() {

    const { id } = useParams()//pega o id na url

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [ShowProjectForm, setShowProjectForm] = useState(false)
    const [ShowServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/Project/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((resp) => resp.json())
                .then((data) => {

                    setProject(data)
                    setServices(data.services)
                })
                .catch((error) => console.log(error))
        }, 300)
    }, [id])

    function EditPost(project) {
        setMessage('')
        if (project.orçamento < project.cost) {
            setMessage('O orçamento  não pode ser menor que o custo total!')
            setType('error')
            return false//para a função aqui
        }

        fetch(`http://localhost:5000/Project/${project.id}`, {
            method: 'PATCH',//atualiza apenas o projeto selecionado
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then(
                (data) => {

                    setProject(data)//atualiza o projeto
                    setShowProjectForm(false) //sai da tela de edição
                    setMessage('Projeto atualizado!')//define a mensagem 
                    setType('sucess')// define o tipo da mensagem

                })
            .catch((error) => console.log(error))

    }


    function CreateService(project) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()//cria id para o serviço

        const lastServiceCost = lastService.cost // pega o avlor do serviço

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)//soma o valor do serviço com o valor anterior

        if (newCost > parseFloat(project.orçamento)) { //confere se o valor não ultrapassou o  orçamento
            setMessage('O Valor do serviço ultrapassou o orçameto!')
            setType('error')
            project.services.pop()//remove o serviço com valor superior ao orçamento
            return false
        }

        project.cost = newCost //define o novo valor já usado

        fetch(`http://localhost:5000/Project/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then((data) => {
                setShowServiceForm(false)
            })
            .catch((error) => console.log(error))
    }

    function RemoveService(id, cost) {


        const serviceUpdated = project.services.filter((service) => service.id !== id)
       
        const projectUpdated = project
        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/Project/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated)
                setServices(serviceUpdated)
                setMessage('Serviço removido!')
                setType('sucess')
            })
            .catch((error) => console.log(error))
    }


    function toggleProjectForm() { //mostra a parte de edição do projeto
        setShowProjectForm(!ShowProjectForm)
    }

    function toggleServiceForm() {//mostra a parte de adição de serviços
        setShowServiceForm(!ShowServiceForm)
    }

    return (<>
        {project.nome ? (
            <div className={styles.project_details}>
                <Container mudar="column">
                    <div className={styles.details_container}>
                        {message && <Message msg={message} type={type} />}
                        <h1>Projeto: {project.nome}</h1>
                        <button className={styles.Btn} onClick={toggleProjectForm}>
                            {!ShowProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!ShowProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span>{project.Categorias.name}</p>
                                <p><span>Total Orçamento:</span>{project.orçamento}</p>
                                <p><span>Total utilizado:</span>{project.cost}</p>
                            </div>

                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForms
                                    handleSubmit={EditPost}
                                    btnText={'Concluir edição.'}
                                    projectData={project} />
                            </div>
                        )
                        }
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicionar Seviços</h2>
                        <button className={styles.Btn} onClick={toggleServiceForm}>
                            {!ShowServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>

                        {
                            ShowServiceForm &&
                            (<div className={styles.project_info}>
                                <ServiceForm btnText='Adicionar serviço' HandleSubmit={CreateService} projectData={project} />
                            </div>)
                        }
                    </div>
                    <h2>Serviços:</h2>
                    <Container mudar='start'>
                        {services.length > 0 &&
                            (services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    descrição={service.descripiton}
                                    key={service.id}
                                    HandleRemove={RemoveService}
                                />
                            )))}
                        {services.length === 0 && (<p>Nenhum serviço cadastrado!</p>)}
                    </Container>
                </Container>
            </div>)
            : (<Loading />)}
    </>)
}
export default Project
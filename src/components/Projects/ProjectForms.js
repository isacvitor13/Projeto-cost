import { useState, useEffect } from "react"
import Input from "../Forms/InputForms"
import Select from "../Forms/Select"
import SubmitButton from "../Forms/SubmitButton"
import styles from './ProjectForm.module.css'

function ProjectForms({ handleSubmit, projectData, btnText }) {
    const [Categorias, setCategoria] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        //Fetch buscando as catergorias do servidor
        fetch('http://localhost:5000/Categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategoria(data)
                
            })
            .catch((err) => console.log(err))
    }, [])

    //constante que envia o projeto
    const Subimt = (e) => {
        e.preventDefault()//faz com que a pagina não recarregue 
        handleSubmit(project)
        console.log(project)
    }

    function HandleChange(e) {

        setProject({ ...project, [e.target.name]: e.target.value })

    }
    function HandleCategory(e) {
    //selecionar a categoria
        setProject({
            ...project,
            Categorias: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })

    }


    return (
        <form className={styles.form} onSubmit={Subimt}>
            <Input
                text='Nome do Projeto:'
                type='text'
                name='nome'
                placeholder='Digite o nome do projeto aqui'
                HandleOnChange={HandleChange}
                value={project.nome }
                 />

            <Input
                text='Valor Orçamento'
                type='number'
                name='orçamento'
                placeholder='Digite o valor do orçamento aqui'
                HandleOnChange={HandleChange}
                value={project.orçamento }
                  />

            <Select
                name='category_id'
                text='Selecione a categoria:'
                HandleOnChange={HandleCategory}
                options={Categorias}
                value={project.Categorias ? project.Categorias.id : ''} />

            <SubmitButton text={btnText} />
        </form>
    )
}
export default ProjectForms
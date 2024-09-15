import styles from '../Projects/ProjectForm.module.css'

import { useState} from 'react'
import Input from '../Forms/InputForms'
import SubmitButton from '../Forms/SubmitButton'
function ServiceForm({btnText, HandleSubmit,projectData}){
 
    const [service,setService]=useState({})
    

    function Submit(e){
        e.preventDefault()
        projectData.services.push(service)
        HandleSubmit(projectData)
    }
    function HandleChange(e){
        setService({...service,[e.target.name]:e.target.value})

    }
   
    return(
        <form onSubmit={Submit} className={styles.form} >
            <Input
            type='text'
            text='Nome do serviço:'
            name='name'
            placeholder='Insira o nome do serviço'
            HandleOnChange={HandleChange}
            />
            <Input
            type='Number'
            text='Custo do serviço:'
            name='cost'
            placeholder='Insira o valor do serviço'
            HandleOnChange={HandleChange}
            />
            <Input
            type='text'
            text='Descrição do serviço'
            name='descripiton'
            placeholder='Descreva o serviço'
            HandleOnChange={HandleChange}
            />
            < SubmitButton text={btnText}/>
        </form>
    )
}
export default ServiceForm
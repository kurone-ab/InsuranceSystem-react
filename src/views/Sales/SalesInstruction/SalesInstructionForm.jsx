import React from "react";
import {FormGroup, Col, Input, Label} from 'reactstrap'
import axios from 'axios'
import {useGetAxios} from "../../global/useAxios";
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = (e, closeModal) => {
    e.preventDefault()
    const title = document.getElementById('salesInstructionFormTitle').value
    const instruction = document.getElementById('salesInstruction').value
    console.log(title, instruction)
    axios.post('sales/instruction/register', {title, instruction}).then(r=>{
        if (r.data)
            closeModal()
    })
}

const SalesInstructionForm = () => {
    return(
        <>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='salesInstructionFormTitle' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='salesInstructionFormTitle' required/>
                </Col>
            </FormGroup>
            <hr className="my-2"/>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='salesInstruction' className='nanum-gothic'>지침</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='salesInstruction' required/>
                </Col>
            </FormGroup>
        </>
    )
}

export default SalesInstructionForm
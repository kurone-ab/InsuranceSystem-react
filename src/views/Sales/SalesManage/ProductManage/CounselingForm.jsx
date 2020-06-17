import React from "react";
import axios from 'axios'
import {Col, FormGroup, Input, Label} from 'reactstrap'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const CounselingForm = () => {
    return (
        <FormGroup row className='mx-5 px-5 my-3'>
            <Col lg={3}>
                <Label htmlFor='counselingRecord'
                       className='nanum-gothic'>상담 내용</Label>
            </Col>
            <Col md={12} lg={9}>
                <Input id='counselingRecord' type='textarea' className='nanum-gothic font-lg'/>
            </Col>
        </FormGroup>
    )
}

export const saveRecord = (id) => {
    const content = document.getElementById('counselingRecord').value
    const data = new FormData()
    data.append('content', content)
    data.append('eid', id)
    axios.post('/counseling/record/register',
        data).then(r=>{
        console.log(r.data)
    })
}

export default CounselingForm
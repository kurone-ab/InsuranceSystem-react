import React from "react";
import {Col, FormGroup, Input, Label} from 'reactstrap'
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = (e, modalClose, eid) => {
    e.preventDefault()
    const title = document.getElementById('marketFormTitle').value
    const targetClient = document.getElementById('targetClient').value
    const needs = document.getElementById('needs').value
    const data = new FormData()
    data.append('eid', eid)
    data.append('title', title)
    data.append('targetClient', targetClient)
    data.append('needs', needs)
    axios.post('investigation/market/save', data).then(()=>modalClose())
}

const MarketForm = () => {
    return (
        <>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='marketFormTitle' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='marketFormTitle' required/>
                </Col>
            </FormGroup>
            <hr className="my-2"/>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='targetClient' className='nanum-gothic'>타깃 고객층</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='targetClient' required/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='needs' className='nanum-gothic'>니즈</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='textarea' id='needs' required/>
                </Col>
            </FormGroup>
        </>
    )
}

export default MarketForm
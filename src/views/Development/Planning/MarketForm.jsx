import React from "react";
import {Col, FormGroup, Input, Label} from 'reactstrap'

export const uploadAction = (e, modalClose) => {
    e.preventDefault()
    const title = document.getElementById('marketFormTitle').value
    const targetConsumer = document.getElementById('targetConsumer').value
    const needs = document.getElementById('needs').value
    console.log(title, targetConsumer, needs)
    modalClose()
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
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>타깃 고객층</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='targetConsumer' required/>
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
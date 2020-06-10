import React from "react";
import {Form, FormGroup, Col, Label, Input} from 'reactstrap'

const MarketForm = () => {
    return (
        <Form>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='title' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='title'/>
                </Col>
            </FormGroup>
            <hr className="my-2"/>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>타깃 고객층</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='targetConsumer'/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='needs' className='nanum-gothic'>니즈</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='textarea' id='needs'/>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default MarketForm
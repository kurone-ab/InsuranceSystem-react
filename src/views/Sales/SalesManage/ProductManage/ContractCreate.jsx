import React from "react";
import CounselingForm, {saveRecord} from "./CounselingForm";
import {Button, Card, CardBody, CardHeader, Form, FormGroup, Col} from 'reactstrap'
import {useStore} from "react-redux";

const ContractCreate = () => {
    const {user:{id}} = useStore().getState()

    return(
        <div className={'animated fadeIn'}>
            <Card>
                <CardHeader className='d-flex'>
                <span className='my-auto nanum-gothic font-lg'>
                    <i className='fa fa-align-justify mr-2'/>계약 체결</span>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => saveRecord(e, id)}>
                        <CounselingForm/>
                        <FormGroup row>
                            <Col lg={10}/>
                            <Col lg={2} className='d-flex'>
                                <Button color={'primary'} type='submit' className='nanum-gothic' block>저장
                                    하기</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>

            </Card>

        </div>
    )
}

export default ContractCreate
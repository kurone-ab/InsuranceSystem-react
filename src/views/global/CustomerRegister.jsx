import React, {useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row
} from 'reactstrap'
import {AppSwitch} from "@coreui/react";

const CustomerRegister = () => {
    const [dh, setDH] = useState(false)
    const [da, setDA] = useState(false)
    return (
        <main className='main'>
            <div className='d-flex justify-content-center align-items-center mt-2'>
                <Card className="card-accent-primary w-50">
                    <CardHeader className='nanum-gothic font-weight-bold font-xl'>
                        개인 정보 입력 양식
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col lg={12}>
                                    <div className='mx-5 px-5 mb-3 font-2xl font-weight-bold'>기본 정보</div>
                                </Col>
                            </Row>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custName'
                                           className='nanum-gothic font-xl font-weight-bold'>이름</Label>
                                </Col>
                                <Col md={12} lg={8}>
                                    <Input id='custName' type='text' className='nanum-gothic font-lg'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge'
                                           className='nanum-gothic font-xl font-weight-bold'>연령</Label>
                                </Col>
                                <Col md={12} lg={8}>
                                    <InputGroup>
                                        <Input id='custAge' type='number' className='nanum-gothic font-lg'/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText>세</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>

                                </Col>
                            </FormGroup>
                            <FormGroup tag="fieldset" row className='mx-5 px-5 my-3'>
                                <legend className="col-form-label col-sm-5 font-xl font-weight-bold">성별</legend>
                                <Col md={12}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="sex"/>{' '}
                                            <div className='nanum-gothic font-lg'>남성</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="sex"/>{' '}
                                            <div className='nanum-gothic font-lg'>여성</div>
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup tag="fieldset" row className='mx-5 px-5 my-2'>
                                <legend className="col-form-label col-sm-12 font-xl font-weight-bold">흡연 빈도</legend>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="smoke"/>{' '}
                                            <div className='nanum-gothic font-lg'>하지 않음</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="smoke"/>{' '}
                                            <div className='nanum-gothic font-lg'>1달에 1갑</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="smoke"/>{' '}
                                            <div className='nanum-gothic font-lg'>1주일에 1갑</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="smoke"/>{' '}
                                            <div className='nanum-gothic font-lg'>1일에 1갑</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="smoke"/>{' '}
                                            <div className='nanum-gothic font-lg'>1일에 1개비</div>
                                        </Label>
                                    </FormGroup>


                                </Col>
                            </FormGroup>
                            <FormGroup tag="fieldset" row className='mx-5 px-5 my-3'>
                                <legend className="col-form-label col-sm-12 font-xl font-weight-bold">음주 빈도</legend>
                                <Col>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='alcohol'/>{' '}
                                            <div className='nanum-gothic font-lg'>하지 않음</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='alcohol'/>{' '}
                                            <div className='nanum-gothic font-lg'>1년에 한 번 이상</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='alcohol'/>{' '}
                                            <div className='nanum-gothic font-lg'>6개월에 한 번 이상</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='alcohol'/>{' '}
                                            <div className='nanum-gothic font-lg'>3개월에 한 번 이상</div>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name='alcohol'/>{' '}
                                            <div className='nanum-gothic font-lg'>1개월에 한 번 이상</div>
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <hr className='mx-5 px-5 my-3 bg-secondary'/>
                            <Row>
                                <Col lg={12}>
                                    <div className='mx-5 px-5 mb-3 font-2xl font-weight-bold'>재정 정보</div>
                                </Col>
                            </Row>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge'
                                           className='nanum-gothic font-xl font-weight-bold'>소득</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText className='nanum-gothic font-lg'>\</InputGroupText>
                                        </InputGroupAddon>
                                        <Input id='custAge' type='number' className='nanum-gothic font-lg'/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText className='nanum-gothic font-lg'>0,000</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge'
                                           className='nanum-gothic font-xl font-weight-bold'>자산</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText className='nanum-gothic font-lg'>\</InputGroupText>
                                        </InputGroupAddon>
                                        <Input id='custAge' type='number' className='nanum-gothic font-lg'/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText className='nanum-gothic font-lg'>0,000</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge' className='nanum-gothic font-xl font-weight-bold'>
                                        신용 등급
                                    </Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <Input id='custAge' type='number' className='nanum-gothic font-lg'/>
                                </Col>
                            </FormGroup>
                            <hr className='mx-5 px-5 my-3 bg-secondary'/>
                            <Row>
                                <Col lg={12}>
                                    <div className='mx-5 px-5 mb-3 font-2xl font-weight-bold'>환경 정보</div>
                                </Col>
                            </Row>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge'
                                           className='nanum-gothic font-xl font-weight-bold'>직업</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <Input id='custAge' type='text' className='nanum-gothic font-lg'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge' className='nanum-gothic font-xl font-weight-bold'>위험
                                        취미</Label>
                                </Col>
                                <Col lg={8}>
                                    <AppSwitch color='danger' onClick={() => setDH(!dh)}/>
                                </Col>
                                {dh ? <Col lg={12}>
                                    <div className='animated fadeIn'>
                                        <Input id='custAge' type='text' className='nanum-gothic font-lg'/>
                                    </div>
                                </Col> : null}
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custAge'
                                           className='nanum-gothic font-xl font-weight-bold'>거주지</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <Input id='custAge' type='text' className='nanum-gothic'/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}

export default CustomerRegister
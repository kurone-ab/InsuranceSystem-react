import React, {useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

    const [state, setOpen] = useState({})

    const warning = (message) => {
        setOpen({
            open: true,
            message
        })
    }
    
    const close = () => {
        setOpen(
            {open: false}
        )
    }

    const loginComplete = (responseData) => {
        console.log(responseData);
        if (responseData.error === "no") {
            sessionStorage.setItem('id', responseData.id)
            sessionStorage.setItem('name', responseData.name)
            sessionStorage.setItem('authority', responseData.authority)
            sessionStorage.setItem('login', 'true')
            props.history.push('/home');
        }else {
            warning(responseData.error)
        }
    }

    const loginCertification = (e) => {
        e.preventDefault()
        const uid = document.getElementById("uid").value
        const upw = document.getElementById("upw").value
        console.log('login try')
        axios.post("/api/login", {id: uid, password: upw}, {
            baseURL: 'http://localhost:8080',
            withCredentials: true
        }).then(r => loginComplete(r.data))
    }

    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={e=>loginCertification(e)}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username" id='uid'/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password"
                                                   autoComplete="current-password" id='upw'/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button type='submit' color="primary" className="px-4">Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={state.open} toggle={close}
                   className={'modal-danger ' + props.className}>
                <ModalHeader toggle={close}>로그인 오류</ModalHeader>
                <ModalBody>
                    {state.message}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={close}>확인</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Login;
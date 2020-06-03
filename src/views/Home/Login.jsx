import React from "react";
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
    Row
} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

    const loginComplete = (responseData) => {
        console.log(responseData);
        if (responseData.error === "no") {
            window.sessionStorage.setItem('id', responseData.id)
            window.sessionStorage.setItem('name', responseData.name)
            window.sessionStorage.setItem('authority', responseData.authority)
            window.sessionStorage.setItem('login', 'true')
            props.history.push('/home');
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
                    <Col md="8">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={e=>loginCertification(e)}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username" id='uid'/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
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
                            <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                <CardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut
                                            labore et dolore magna aliqua.</p>
                                        <Link to="/register">
                                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register
                                                Now!</Button>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
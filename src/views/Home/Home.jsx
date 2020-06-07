import React, {lazy, Suspense, useLayoutEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row} from 'reactstrap'
import axios from 'axios';

const BasicTable = lazy(() => import('../global/BasicTable'))

const Loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const ImportantAnnouncement = () => {
    return (
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-weight-bold font-xl'><i
                className='fa fa-align-justify mr-2'/>중요 공지</span></CardHeader>
            <CardBody>
                <Jumbotron>
                    <h1 className="display-3 nanum-gothic">사내 전산망 점검</h1>
                    <p className="lead nanum-gothic">
                        오는 6/19 (목) 21:00 ~ 23:00 사내 전산망 점검 정기 점검이 있습니다. 해당시간에는 이용을 자제해주시기 바랍니다.
                    </p>
                    <hr className="my-2"/>
                    <p className='nanum-gothic'>정보 지원실</p>
                    <p className="lead">
                        <Button color="primary" className='nanum-gothic'>자세히 보기</Button>
                    </p>
                </Jumbotron>
            </CardBody>
        </Card>
    )
}

const FormCollection = () => {
    return(
        <Card className='card-accent-primary mt-1'>
            <CardHeader><span className='my-auto nanum-gothic font-weight-bold font-xl'><i className='fa fa-align-justify mr-2'/>서식 모음</span></CardHeader>
            <CardBody>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>출장 보고서</h5></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>공문 양식</h5></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>회의록</h5></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>발주서</h5></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>사직서</h5></ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    )
}

const Home = () => {
    const upload = () => {
        console.log('upload')
    }

    const [announcement, setAnnouncement] = useState([]);

    const loadAnnouncement = () => {
        axios.get("/announcement/info", {
            baseURL: 'http://localhost:8080',
            withCredentials: true
        }).then(r => {
            console.log(r.data)
            setAnnouncement(r.data)
        })
    }

    useLayoutEffect(loadAnnouncement, [])
    console.log(announcement)

    return (announcement.length !== 0 ?
            <div className='animated fadeIn'>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <BasicTable contentData={announcement} tableHeader='공지 사항' modalHeader='새로운 글 작성'
                                        uploadAction={upload}/>
                        </Suspense>
                    </Col>
                </Row>
            </div> : <Loading/>
    )
}

export default Home
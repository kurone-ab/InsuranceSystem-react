import React, {useState, lazy} from "react";
import {Card, CardHeader, CardBody, Jumbotron, Button, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import axios from 'axios';
import FileDownload from 'js-file-download';
import {asc, desc} from "../../comparator";

const BasicTable = lazy(() => import('../global/BasicTable'))

const ImportantAnnouncement = () => {
    return(
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-weight-bold font-xl'><i className='fa fa-align-justify mr-2'/>중요 공지</span></CardHeader>
            <CardBody>
                <Jumbotron>
                    <h1 className="display-3 nanum-gothic">사내 전산망 점검</h1>
                    <p className="lead nanum-gothic">
                        오는 6/19 (목) 21:00 ~ 23:00 사내 전산망 점검 정기 점검이 있습니다. 해당시간에는 이용을 자제해주시기 바랍니다.
                    </p>
                    <hr className="my-2" />
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

const Announcement = () => {
    return(
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-weight-bold font-xl'><i className='fa fa-align-justify mr-2'/>공지사항</span></CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    )
}

const Home = (props) => {
    const [state, setState] = useState({});

    const upload = () => {
        console.log('upload')
    }

    return (
        <div className='animated fadeIn'>
            <Row>
                <Col xs={12} md={6} xl={6}>
                    <ImportantAnnouncement />
                </Col>
                <Col>
                    <FormCollection/>
                    <BasicTable tableHeader='시장 조사 정보' modalHeader='새로운 글 작성' uploadAction={upload}/>
                </Col>
            </Row>
        </div>
    )
}

export default Home
import React, {lazy, Suspense, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row, Spinner, Input} from 'reactstrap'
import {useGetAxios, usePostAxios} from '../global/useAxios'
import {connect} from 'react-redux'
import {loadAnnouncement} from "../../globalStore";
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

const BasicTable = lazy(() => import('../global/BasicTable'))
const ReadContentModal = lazy(() => import('../global/ReadContentModal'))

const Loading = () => <div className="animated fadeIn pt-1 d-flex justify-content-center"><Spinner color="primary"/>
</div>

const ImportantAnnouncement = ({data}) => {
    const {title, content, authorName} = data
    const [collapse, setCollapse] = useState(false)

    const switching = () => {
        setCollapse(!collapse)
    }

    return (
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-weight-bold font-xl'><i
                className='fa fa-align-justify mr-2'/>중요 공지</span></CardHeader>
            <CardBody>
                <Jumbotron>
                    <h1 className="display-3 nanum-gothic">{title}</h1>
                    <div className='nanum-gothic font-lg'>{content ? content.length > 50 ?
                        `${content.split('. ')[0]}.` : content : null}</div>
                    <ReadContentModal state={collapse} toggleFunc={switching} title={title} content={content}/>
                    <hr className="my-2"/>
                    <p className='nanum-gothic'>{authorName}</p>
                    <p className="lead">
                        <Button color="primary" className='nanum-gothic' onClick={switching}>자세히 보기</Button>
                    </p>
                </Jumbotron>
            </CardBody>
        </Card>
    )
}

const FormCollection = () => {
    return(
        <Card className='card-accent-primary'>
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

const Home = ({load, list}) => {
    const upload = () => {
        console.log('upload')
    }

    useGetAxios({url: 'announcement/info', callback: load});
    const important = list ? list instanceof Array ? list.find(({priority}) => priority) : list : null

    const fileupload = () => {
        const file = document.getElementById('file').files[0]
        const formData = new FormData();
        formData.append('file', file)
        axios.post('/file/upload', formData).then(r=>console.log(r.data))
    }

    return (list ?
            <div className='animated fadeIn' onLoadStart={() => console.log('component load')}>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement data={important}/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <BasicTable contentData={list} tableHeader='공지 사항' modalHeader='새로운 글 작성'
                                        uploadAction={upload}/>
                        </Suspense>
                    </Col>
                </Row>
            </div> : <Loading/>
    )
}

const mapStateToProps = (state) => {
    return {list: state.announcement ? state.announcement.list : null}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (announcement) => dispatch(loadAnnouncement(announcement))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
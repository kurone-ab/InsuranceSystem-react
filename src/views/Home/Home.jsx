import React, {lazy, Suspense, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row, Spinner} from 'reactstrap'
import {useGetAxios} from '../global/useAxios'

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
                    <div>{content ? content.length > 50 ?
                        <div className='nanum-gothic font-lg'>{`${content.split('. ')[0]}...`}</div> : content : null}</div>
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

    const {data} = useGetAxios({url: 'announcement/info'});
    const important = data ? data instanceof Array ? data.filter(({priority}) => priority)[0] : data : null
    console.log(important)
    return (data ?
            <div className='animated fadeIn' onLoadStart={() => console.log('component load')}>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement data={important}/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <BasicTable contentData={data} tableHeader='공지 사항' modalHeader='새로운 글 작성'
                                        uploadAction={upload}/>
                        </Suspense>
                    </Col>
                </Row>
            </div> : <Loading/>
    )
}

export default Home
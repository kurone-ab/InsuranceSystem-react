/*global kakao*/

import React, {lazy, Suspense, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row} from 'reactstrap'
import {useGetAxios} from '../global/useAxios'
import {connect} from 'react-redux'
import {loadAnnouncement} from "../../globalStore";
import Loading from "../global/Loading";
import AnnouncementReadForm from "./AnnouncementReadForm";
import FileUploadButton from "../global/FileUploadButton";

const CustomizableTable = lazy(() => import('../global/CustomizableTable'))
const ReadContentModal = lazy(() => import('../global/ReadContentModal'))

const ImportantAnnouncement = ({data}) => {
    const {title, content, authorName} = data
    const [collapse, setCollapse] = useState(false)

    const switching = () => {setCollapse(!collapse)}

    return (
        <Card className='card-accent-primary'>
            <CardHeader><span className='my-auto nanum-gothic font-lg'><i
                className='fa fa-align-justify mr-2'/>중요 공지</span></CardHeader>
            <CardBody>
                <Jumbotron>
                    <h1 className="display-3 nanum-gothic">{title}</h1>
                    <div className='nanum-gothic font-lg'>
                        {content ? content.length > 50 ? `${content.split('. ')[0]}.` : content : null}
                    </div>
                    <ReadContentModal open={collapse} toggleFunc={switching} title={title} content={content}/>
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
            <CardHeader><span className='my-auto nanum-gothic font-lg'><i className='fa fa-align-justify mr-2'/>서식 모음</span></CardHeader>
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

const renderData = []
const Home = ({load, list}) => {
    const upload = () => {
        console.log('upload')
    }
    let isMapLoad = false;
    useGetAxios({url: 'announcement/info', callback: load, necessary: !list});
    let important = list ? list instanceof Array ? list.find(({priority}) => priority) : list : null
    if (list && renderData.length === 0)
        list.forEach((item) => {
            const {id, title, date, authorName: author} = item
            renderData.push({id, title: {title, aTag: true, id}, date, author})
        })

    // const fileupload = () => {
    //     const file = document.getElementById('file').files[0]
    //     const formData = new FormData();
    //     formData.append('file', file)
    //     axios.post('/file/upload', formData).then(r=>console.log(r.data))
    // }

    // eslint-disable-next-line no-unused-vars
    const loadMap = () => {
        let container = document.getElementById("map");
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=54eb777b5ef458ad5bd6b46c650f0b13&autoload=false";
        document.head.appendChild(script);
        if (!container || isMapLoad) return
        console.log("load map")
        kakao.maps.load(() => {
            let options = {
                center: new kakao.maps.LatLng(37.506502, 127.053617),
                level: 7
            };
            // eslint-disable-next-line no-unused-vars
            const map = new window.kakao.maps.Map(container, options);
        });
        isMapLoad = true
    }

    // useLayoutEffect(loadMap)

    return (list ?
            <div className='animated fadeIn'>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement data={important}/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <CustomizableTable tableRowData={renderData} tableTitle='공지 사항' retrieveForm={AnnouncementReadForm}/></Suspense>
                    </Col>
                </Row>
                <FileUploadButton fileElementId={'test2'} multiple/>
            </div> : <Loading/>
    )
}

const mapStateToProps = (state) => {
    const {announcement: {list} = {}} = state
    return list ? {
        list,
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (announcement) => dispatch(loadAnnouncement(announcement)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
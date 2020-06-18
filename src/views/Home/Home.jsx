/*global kakao*/

import React, {lazy, Suspense, useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, ListGroup, ListGroupItem, Row} from 'reactstrap'
import {useGetAxios} from '../global/useAxios'
import {connect} from 'react-redux'
import {loadAnnouncement} from "../../globalStore";
import Loading from "../global/Loading";
import AnnouncementReadForm from "./AnnouncementReadForm";

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
                    <ListGroupItem tag="a" href="#" action><h5 className='my-auto nanum-gothic'>재직 증명서</h5></ListGroupItem>
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
        // const script = document.createElement("script");
        // script.async = true;
        // script.src =
        //     "//dapi.kakao.com/v2/maps/sdk.js?appkey=54eb777b5ef458ad5bd6b46c650f0b13&autoload=false";
        // const library = document.createElement("script")
        // library.async = true;
        // library.src =
        //     "//dapi.kakao.com/v2/maps/sdk.js?appkey=54eb777b5ef458ad5bd6b46c650f0b13&libraries=services,clusterer,drawing";
        // document.head.appendChild(script);
        // document.head.appendChild(library);
        if (!container) return
        console.log(container.style)
        console.log("load map")
        let map
        setTimeout(() => {
            kakao.maps.load(() => {
                console.log("load map 2")
                let options = {
                    center: new kakao.maps.LatLng(37.5803130, 126.9227),
                    level: 2
                };
                // eslint-disable-next-line no-unused-vars
                map = new window.kakao.maps.Map(container, options);
            });
            isMapLoad = true
            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
            geocoder.addressSearch('명지대학교 인문캠퍼스', function (result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {

                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    const infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }, 10)

    }

    useEffect(loadMap)

    return (list ?
            <div className='animated fadeIn'>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <ImportantAnnouncement data={important}/>
                    </Col>
                    <Col>
                        <FormCollection/>
                        <Suspense fallback={Loading()}>
                            <CustomizableTable tableRowData={renderData} tableTitle='공지 사항'
                                               retrieveForm={AnnouncementReadForm}/></Suspense>
                    </Col>
                </Row>
                <div className='map-container' id='map'/>
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
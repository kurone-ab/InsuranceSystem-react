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
        if (!container) return
        setTimeout(() => {
            // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
            var infowindow = new kakao.maps.InfoWindow({zIndex:1});

            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

// 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places();

// 키워드로 장소를 검색합니다
            ps.keywordSearch('명지대학교 인문캠퍼스', placesSearchCB);

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB (data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    var bounds = new kakao.maps.LatLngBounds();

                    for (var i=0; i<data.length; i++) {
                        displayMarker(data[i]);
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                }
            }

// 지도에 마커를 표시하는 함수입니다
            function displayMarker(place) {

                // 마커를 생성하고 지도에 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.y, place.x)
                });

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function() {
                    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });
            }
        }, 20)

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
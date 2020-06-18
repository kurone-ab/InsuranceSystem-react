/*global kakao*/
import React, {useEffect, useLayoutEffect, useState} from "react";
import {
    Button,
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
let isLoadMap = false
let map
const CustomerRegister = () => {
    const [dh, setDH] = useState(false)
    const [da, setDA] = useState(false)
    const [searchPlace, setSearchPlace] = useState('명지대학교 인문캠퍼스')


    const searchMap = () => {
        const residence = document.getElementById('residence').value
        setSearchPlace(residence)
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchPlace, placesSearchCB);
    }

    const displayMarker = (place) => {
        const marker = new kakao.maps.Marker({
            map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });
        const infowindow = new kakao.maps.InfoWindow({zIndex: 1});
        const markerContent = document.createElement('div')
        markerContent.classList.add('nanum-gothic')
        markerContent.classList.add('p-1')
        markerContent.classList.add('m-1')
        markerContent.classList.add('font-sm')
        markerContent.addEventListener('click', () => {
            infowindow.close()
        })
        markerContent.innerText = searchPlace
        kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(markerContent);
            infowindow.open(map, marker);
        });
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();

            // for (var i = 0; i < data.length; i++) {
                displayMarker(data[0]);
                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
            // }
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
    }

    const loadMap = () => {
        let container = document.getElementById("map");
        if (!container || map) return
        setTimeout(() => {
            // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다

            const mapOption = {
                    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

// 지도를 생성합니다
            map = new kakao.maps.Map(container, mapOption);
            isLoadMap = true
// 장소 검색 객체를 생성합니다
        }, 20)

    }

    useEffect(loadMap )

    return (
        <main className='main'>
            <div className='d-flex justify-content-center align-items-center mt-2'>
                <Card className="card-accent-primary w-50">
                    <CardHeader className='nanum-gothic font-weight-bold font-xl'>
                        개인 정보 입력 양식
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={()=>console.log('submit in customer register')}>
                            <Row>
                                <Col lg={12}>
                                    <div className='mx-5 px-5 mb-3 font-2xl font-weight-bold'>신체 정보</div>
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
                                        <Input id='custIncome' type='number' className='nanum-gothic font-lg'/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText className='nanum-gothic font-lg'>0,000</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custProperty'
                                           className='nanum-gothic font-xl font-weight-bold'>자산</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText className='nanum-gothic font-lg'>\</InputGroupText>
                                        </InputGroupAddon>
                                        <Input id='custProperty' type='number' className='nanum-gothic font-lg'/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText className='nanum-gothic font-lg'>0,000</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='custCreditRating' className='nanum-gothic font-xl font-weight-bold'>
                                        신용 등급
                                    </Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <Input id='custCreditRating' type='number' className='nanum-gothic font-lg'/>
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
                                    <Label htmlFor='custJob'
                                           className='nanum-gothic font-xl font-weight-bold'>직업</Label>
                                </Col>
                                <Col sm={12} lg={8}>
                                    <Input id='custJob' type='text' className='nanum-gothic font-lg'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='dangerHobby' className='nanum-gothic font-xl font-weight-bold'>위험
                                        취미</Label>
                                </Col>
                                <Col lg={8}>
                                    <AppSwitch color='danger' onClick={() => setDH(!dh)}/>
                                </Col>
                                {dh ? <Col lg={12}>
                                    <div className='animated fadeIn'>
                                        <Input id='dangerHobby' type='text' className='nanum-gothic font-lg'/>
                                    </div>
                                </Col> : null}
                            </FormGroup>
                            <FormGroup row className='mx-5 px-5 my-3'>
                                <Col lg={4}>
                                    <Label htmlFor='residence'
                                           className='nanum-gothic font-xl font-weight-bold'>거주지</Label>
                                </Col>
                                <Col sm={10} lg={6}>
                                    <Input id='residence' type='text' className='nanum-gothic'/>
                                </Col>
                                <Col sm={2} lg={2}>
                                    <Button className='nanum-gothic' onClick={searchMap}>검색</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col lg={12} style={{height: 400}}>
                                    <div className='w-100 h-100' id='map'/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col lg={12} className='d-flex justify-content-end'>
                                    <Button type='submit' className='nanum-gothic mr-3' color='primary'>제출 하기</Button>
                                    <Button type='reset' className='nanum-gothic'>취소</Button>
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
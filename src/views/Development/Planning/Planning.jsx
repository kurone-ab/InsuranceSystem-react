import React, {lazy, useState} from "react";
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledTooltip
} from 'reactstrap'
import classnames from 'classnames'

const BasicTable = lazy(() => import('../../global/BasicTable'))

const StrategyForm = () => {
    return (
        <Form>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='title' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='title'/>
                </Col>
            </FormGroup>
            <hr className="my-2"/>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>타깃 고객층</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='targetConsumer'/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='needs' className='nanum-gothic'>니즈</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='textarea' id='needs'/>
                </Col>
            </FormGroup>
        </Form>
    )
}

const MarketForm = () => {
    const [open, setOpen] = useState(false)
    const insuranceList = {
        kyobo: "교보생명",
        db: "DB손해보험",
        meritz: "메리츠화재",
        samsungLife: "삼성생명",
        samsungFire: "삼성화재",
        own: "신동아화재"
    }

    const [insuranceCo, setInsuranceCo] = useState('보험사')
    const switching = () => {
        setOpen(!open)
    }

    const select = (value) => {
        setInsuranceCo(value)
    }

    return (
        <Form>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='title' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='text' id='title'/>
                </Col>
            </FormGroup>
            <hr className="my-3"/>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>보험사</Label>
                </Col>
                <Col xs="12" md="9">
                    <Dropdown isOpen={open} toggle={switching}>
                        <DropdownToggle caret className='nanum-gothic'>{insuranceList[insuranceCo]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(insuranceList).map((insurance, idx) => {
                                return (
                                    <DropdownItem key={idx}
                                                  className='border-0 nanum-gothic'
                                                  value={insurance}
                                                  onClick={() => select(insurance)}
                                    >{insuranceList[insurance]}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md='3'>
                    <Label htmlFor='needs' className='nanum-gothic'>주 타깃 고객들이 많이 찾는 보험</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='textarea' id='needs'/>
                </Col>
            </FormGroup>
        </Form>
    )
}

const Planning = () => {

    const [active, setActive] = useState(1)

    const changeTab = (tabID) => {
        setActive(tabID)
    }

    const upload = () => {
        console.log('upload')
    }

    return (
        <div className='animated fadeIn'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: active === 1})}
                        onClick={() => {changeTab(1);}}>
                        <div className='nanum-gothic'>
                            시장 조사 정보
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: active === 2})}
                             onClick={() => {changeTab(2);}}>
                        <div className='nanum-gothic'>
                            전략 정보
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId={1}>
                    <BasicTable tableHeader='시장 조사 정보' activeModal={true} modalHeader='새로운 글 작성' uploadAction={upload} InputForm={StrategyForm}/>
                </TabPane>
                <TabPane tabId={2}>
                    <BasicTable tableHeader='전략 정보' activeModal={true} modalHeader='새로운 글 작성' InputForm={MarketForm}/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Planning
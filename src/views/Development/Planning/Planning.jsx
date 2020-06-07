import React, {Fragment, useState, lazy} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Table,
    TabPane,
    TabContent,
    UncontrolledTooltip
} from 'reactstrap'
import classnames from 'classnames'

const BasicTable = lazy(() => import('../../global/BasicTable'))
const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

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

const Planning = () => {

    const [active, setActive] = useState(1)

    const changeTab = (tabID) => {setActive(tabID)}

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
                            <Button close className='ml-3' id='tab1close'/>
                            <UncontrolledTooltip target='tab1close'>탭 닫기</UncontrolledTooltip>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: active === 2})}
                             onClick={() => {changeTab(2);}}>
                        <div className='nanum-gothic'>
                            전략 정보
                            <Button close className='ml-3' id='tab2close'/>
                            <UncontrolledTooltip target='tab2close'>탭 닫기</UncontrolledTooltip>
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId={1}>
                    <BasicTable tableHeader='시장 조사 정보' activeModal={true} modalHeader='새로운 글 작성' uploadAction={upload} InputForm={StrategyForm}/>
                </TabPane>
                <TabPane tabId={2}>
                    <BasicTable tableHeader='전략 정보' activeModal={true} modalHeader='새로운 글 작성' InputForm={StrategyForm}/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Planning
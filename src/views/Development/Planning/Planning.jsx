import React, {Fragment, useState} from "react";
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
import {asc as ascSort, desc as descSort} from "../../../comparator";

const sort = 'fa-sort', desc = 'fa-sort-desc', asc = 'fa-sort-asc'

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
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>니즈</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type='textarea' id='needs'/>
                </Col>
            </FormGroup>
        </Form>
    )
}

const GenerateDocumentModal = ({className}) => {

    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }

    const CustomHeader = () => {
        return (
            <div className='modal-header'>
                <div className='modal-title font-weight-bold nanum-gothic font-2xl'>새로운 글 작성</div>
            </div>
        )
    }

    const generate = () => {
        console.log('submit')
    }

    return (
        <Fragment>
            <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                className='fa fa-upload mr-1'/>보고서 작성하기</Button>
            <Modal isOpen={modalOpen} toggle={modalControl}
                   className={'modal-lg ' + className} backdrop={'static'}>
                <ModalHeader wrapTag={CustomHeader}/>
                <ModalBody>
                    <StrategyForm/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={generate}>등록</Button>{' '}
                    <Button color="secondary" onClick={modalControl}>취소</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

const InfoTable = (props) => {

    const switching = (current) => {
        if (current === desc) return asc
        else return desc
    }

    const [number, setNumber] = useState(sort)
    const [title, setTitle] = useState(sort)
    const [date, setDate] = useState(sort)
    const [author, setAuthor] = useState(sort)

    const columnAlign = (column) => {
        switch (column) {
            case 'number':
                setNumber(switching(number))
                setTitle(sort)
                setDate(sort)
                setAuthor(sort)
                break
            case 'title':
                setNumber(sort)
                setTitle(switching(title))
                setDate(sort)
                setAuthor(sort)
                break
            case 'date':
                setNumber(sort)
                setTitle(sort)
                setDate(switching(date))
                setAuthor(sort)
                break
            case 'author':
                setNumber(sort)
                setTitle(sort)
                setDate(sort)
                setAuthor(switching(author))
                break
            default:
                break

        }
    }

    return (
        <Card className="card-accent-primary">
            <CardHeader className='d-flex'>
                <span className='my-auto jua font-xl'>{props.header}</span>
                <GenerateDocumentModal/>
            </CardHeader>
            <CardBody>
                <Table responsive striped className='font-lg'>
                    <thead>
                    <tr>
                        <th id="market-bulletin-id">글 번호<i className={`fa ${number} ml-2`}
                                                           onClick={() => columnAlign('number')}/></th>
                        <th id="market-bulletin-title">제목<i className={`fa ${title} ml-2`}
                                                            onClick={() => columnAlign('title')}/></th>
                        <th id="market-bulletin-date">업로드 날짜<i className={`fa ${date} ml-2`}
                                                               onClick={() => columnAlign('date')}/></th>
                        <th id="market-bulletin-writer">작성자<i className={`fa ${author} ml-2`}
                                                              onClick={() => columnAlign('author')}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp4</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp5</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp7</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp2</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>temp</td>
                        <td>temp1</td>
                        <td>temp</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>temp</td>
                        <td>temp7</td>
                        <td>temp</td>
                    </tr>
                    <tr>
                        <td>7</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp3</td>
                        </tr>
                        </tbody>
                    </Table>
                </CardBody>
        </Card>
    )
}

const Planning = () => {

    const [active, setActive] = useState(1)

    const changeTab = (tabID) => {setActive(tabID)}

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
                    <InfoTable header='시장 조사 정보' target='market'/>
                </TabPane>
                <TabPane tabId={2}>
                    <InfoTable header='전략 정보' target='strategy'/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Planning
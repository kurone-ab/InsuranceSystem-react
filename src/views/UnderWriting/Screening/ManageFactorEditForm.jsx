import React, {useEffect, useState} from "react";
import {
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
} from 'reactstrap'
import {connect, useStore} from 'react-redux'
import axios from "axios";
import Loading from "../../global/Loading";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = (eid, e, closeModal) => {
    e.preventDefault()

    const data = new FormData()
    data.append('cid', document.getElementById('clientId').value)
    data.append('physicalSmokeFrequency', document.getElementById('physicalSmokeFrequency').value)
    data.append('physicalDrinkingFrequency', document.getElementById('physicalDrinkingFrequency').value)

    data.append('environmentalDangerousArea', document.getElementById('environmentalDangerousArea').value)
    data.append('environmentalDangerousHobby', document.getElementById('environmentalDangerousHobby').value)
    data.append('environmentalJob', document.getElementById('environmentalJob').value)

    data.append('financialIncome',  document.getElementById('financialIncome').value * 10000)
    data.append('financialCreditRating', document.getElementById('financialCreditRating').value)
    data.append('financialProperty', document.getElementById('financialProperty').value * 10000)

    axios.post('client/save/Factors', data).then(() => closeModal())
}

const ManageFactorEditForm = () => {

    const [select, setSelect] = useState(
        {
            client: "",
            smoke: "",
            drink: "",
            job: "",
        }
    );


    const [open, setOpen] = useState(
        {
            client: false,
            smoke: false,
            drink: false,
            job: false,
        }
    )
    const [state, setState] = useState({
        loading: true, ItemList: []
    })

    const [smoke, setSmoke] = useState()
    const [drink, setDrink] = useState()
    const [job, setJob] = useState()
    const [client, setClient] = useState()
    const {user: {id: eid}} = useStore().getState()

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/uw/factor/info?eid=${eid}`, [])
                .then(({data}) => {
                    const {clientList, smokeList, drinkList, jobList} = data
                    setSmoke(smokeList)
                    setDrink(drinkList)
                    setJob(jobList)
                    setClient(clientList)
                    setState({loading: false, ItemList: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        }
        getAxios();
    }, [])

    return (
        !state.loading ?
            client ?
                <div className='flex-grow-1'>
                    <FormGroup row>
                        <input type='hidden' id='clientId' value={select.client}/>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>고객</Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Dropdown isOpen={open.client} toggle={() => setOpen({
                                client: !open.client,
                                smoke: open.smoke,
                                drink: open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{client[select.client]}</DropdownToggle>
                                <DropdownMenu>
                                    {Object.keys(client).map((key, idx) =>
                                        <DropdownItem key={idx}
                                                      className='border-0 nanum-gothic'
                                                      value={key}
                                                      onClick={() => setSelect({
                                                          client: key,
                                                          smoke: select.smoke,
                                                          drink: select.drink,
                                                          job: select.job
                                                      })}
                                        >{client[key]}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </FormGroup>

                    <hr/>
                    <FormGroup row>
                        <input type='hidden' id='physicalSmokeFrequency' value={select.smoke}/>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>흡연빈도</Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Dropdown isOpen={open.smoke} toggle={() => setOpen({
                                client: open.client,
                                smoke: !open.smoke,
                                drink: open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{smoke[select.smoke]}</DropdownToggle>
                                <DropdownMenu>
                                    {Object.keys(smoke).map((key, idx) =>
                                        <DropdownItem key={idx}
                                                      className='border-0 nanum-gothic'
                                                      value={key}
                                                      onClick={() => setSelect({
                                                          client: select.client,
                                                          smoke: key,
                                                          drink: select.drink,
                                                          job: select.job
                                                      })}
                                        >{smoke[key]}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <input type='hidden' id='physicalDrinkingFrequency' value={select.drink}/>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>음주빈도</Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Dropdown isOpen={open.drink} toggle={() => setOpen({
                                client: open.client,
                                smoke: open.smoke,
                                drink: !open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{drink[select.drink]}</DropdownToggle>
                                <DropdownMenu>
                                    {Object.keys(drink).map((key, idx) =>
                                        <DropdownItem key={idx}
                                                      className='border-0 nanum-gothic'
                                                      value={key}
                                                      onClick={() => setSelect({
                                                          client: select.client,
                                                          smoke: select.smoke,
                                                          drink: key,
                                                          job: select.job
                                                      })}
                                        >{drink[key]}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </FormGroup>
                    <hr/>

                    <FormGroup row>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>위험한 거주지</Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Input type='text' className='nanum-gothic' id='environmentalDangerousArea'/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>위험한 취미 </Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Input type='text' className='nanum-gothic' id='environmentalDangerousHobby'/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <input type='hidden' id='environmentalJob' value={select.job}/>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>직업</Label>
                        </Col>
                        <Col md={8} sm={12} lg={9}>
                            <Dropdown isOpen={open.job} toggle={() => setOpen({
                                client: open.client,
                                smoke: open.smoke,
                                drink: open.drink,
                                job: !open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{job[select.job]}</DropdownToggle>
                                <DropdownMenu>
                                    {Object.keys(job).map((key, idx) =>
                                        <DropdownItem key={idx}
                                                      className='border-0 nanum-gothic'
                                                      value={key}
                                                      onClick={() => setSelect({
                                                          client: select.client,
                                                          smoke: select.smoke,
                                                          drink: select.drink,
                                                          job: key
                                                      })}
                                        >{job[key]}</DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </FormGroup>
                    <hr/>

                    <FormGroup row>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>수입</Label>
                        </Col>
                        <Col md={8} lg={5} className='mt-1'>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}>
                                    <InputGroupText>&#8361;</InputGroupText>
                                </InputGroupAddon>
                                <Input type='number' className='nanum-gothic' id='financialIncome'/>
                                <InputGroupAddon addonType='append'>
                                    <InputGroupText>0,000</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>신용등급</Label>
                        </Col>
                        <Col md={8} lg={3} className='mt-1'>
                            <InputGroup>
                                <Input type='number' className='nanum-gothic' id='financialCreditRating' min='1' max='10'/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={4} lg={3}>
                            <Label className='nanum-gothic'>재산</Label>
                        </Col>
                        <Col md={8} lg={5} className='mt-1'>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}>
                                    <InputGroupText>&#8361;</InputGroupText>
                                </InputGroupAddon>
                                <Input type='number' className='nanum-gothic' id='financialProperty'/>
                                <InputGroupAddon addonType={"append"}>
                                    <InputGroupText>0,000</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <hr/>

                </div> : <div>새로 작성이 필요한 고객이 없습니다.</div>

            : <Loading/>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

//connect가 함수를 리턴   //괄호에 넣어서 함수를 실행하게 하기
export default connect(mapStateToProps)(ManageFactorEditForm)

import React, {useEffect, useState} from "react";
import {
    Button,
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
    UncontrolledTooltip
} from 'reactstrap'
import {connect, useStore} from 'react-redux'
import axios from "axios";
import Loading from "../../global/Loading";


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

let guaranteeCondition = [''];
let targetClient = [''];

export const uploadAction = (eid, e, closeModal) => {
    e.preventDefault()

    const data = new FormData()
    data.append('cid', document.getElementById('clientId').value)
    data.append('physicalSmokeFrequency', document.getElementById('physicalSmokeFrequency').value)
    data.append('physicalDrinkingFrequency', document.getElementById('physicalDrinkingFrequency').value)

    data.append('environmentalDangerousArea', document.getElementById('environmentalDangerousArea').value)
    data.append('environmentalDangerousHobby', document.getElementById('environmentalDangerousHobby').value)
    data.append('environmentalJob', document.getElementById('environmentalJob').value)

    data.append('financialIncome', document.getElementById('financialIncome').value)
    data.append('financialCreditRating', document.getElementById('financialCreditRating').value)
    data.append('financialProperty', ((document.getElementById('financialProperty').value) * 10000))

    axios.post('client/save/Factors', data).then(() => closeModal())
}

const ManageFactorEditForm = ({typeList}) => {

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
    // const [type, setType] = useState('CAR')
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
            console.log("부름")
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
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>흡연빈도</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Dropdown isOpen={open.client} toggle={() => setOpen({
                                client: !open.client,
                                smoke: open.smoke,
                                drink: open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{" "}</DropdownToggle>
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
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>흡연빈도</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Dropdown isOpen={open.smoke} toggle={() => setOpen({
                                client: open.client,
                                smoke: !open.smoke,
                                drink: open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{" "}</DropdownToggle>
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
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>음주빈도</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Dropdown isOpen={open.drink} toggle={() => setOpen({
                                client: open.client,
                                smoke: open.smoke,
                                drink: !open.drink,
                                job: open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{" "}</DropdownToggle>
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
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>위험한 거주지</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' id='environmentalDangerousArea'/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>위험한 취미 </Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' id='environmentalDangerousHobby'/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <input type='hidden' id='environmentalJob' value={select.job}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>직업</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Dropdown isOpen={open.job} toggle={() => setOpen({
                                client: open.client,
                                smoke: open.smoke,
                                drink: open.drink,
                                job: !open.job
                            })}
                                      required={true}>
                                <DropdownToggle caret className='nanum-gothic'>{" "}</DropdownToggle>
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
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>수입</Label>
                        </Col>
                        <Col md={10} lg={3} className='mt-1'>
                            <InputGroup>
                                <Input type='number' className='nanum-gothic' id='financialIncome'/>
                                <InputGroupAddon addonType='append'>
                                    <InputGroupText>0,000</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>신용등급</Label>
                        </Col>
                        <Col md={10} lg={3} className='mt-1'>
                            <InputGroup>
                                <Input type='number' className='nanum-gothic' id='financialCreditRating'/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>property</Label>
                        </Col>
                        <Col md={10} lg={3} className='mt-1'>
                            <InputGroup>
                                <Input type='number' className='nanum-gothic' id='financialProperty'/>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <hr/>

                </div> : <div>새로 작성이 필요한 고객이 없습니다.</div>

            : <Loading/>
    )
}

//redux state
// const mapStateToProps=(state)=>{
//     return{
//         factor:state.factor
//     }
// }
//
// const mapDispatchToProps= dispatch => {
//     return {
//         factor: (()=> dispatch(buyCake))
//     }
// }


const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

//connect가 함수를 리턴   //괄호에 넣어서 함수를 실행하게 하기
export default connect(mapStateToProps)(ManageFactorEditForm)
// export default ManageFactorEditForm
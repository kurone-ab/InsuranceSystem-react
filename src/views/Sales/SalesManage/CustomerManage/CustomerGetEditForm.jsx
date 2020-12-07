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
import {connect} from 'react-redux'
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = ( e, closeModal) => {
    e.preventDefault()
    const customerName = document.getElementById('customerName').value
    const contact = document.getElementById('contact').value
    const age = document.getElementById('age').value
    const email = document.getElementById('email').value
    const sex = document.getElementById('sex').value

    console.log(customerName+contact+email+sex)

    const data = new FormData()
    data.append('customerName', customerName)
    data.append('contact', contact)
    data.append('age', age)
    data.append('email', email)
    data.append('sex', sex)

    axios.post('client/save/unRegistered', data).then(()=>closeModal())
}

export const CustomerGetEditForm = ({typeList}) => {
    const [open, setOpen] = useState()
    const [sex, setSex]= useState()
    const [state,setState]= useState({loading:true, ItemList:[]})

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/client/sex/list`, [])
                .then(({data}) => {
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
        <div className='flex-grow-1'>


            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>고객이름</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='customerName' className='nanum-gothic' />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연락처</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='contact' className='nanum-gothic' />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연령</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='age' className='nanum-gothic'/>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>성별</Label>
                </Col>
            <Col md={9} sm={12} lg={10}>
                <input type='hidden' id='sex' value={sex}/>
                <Dropdown isOpen={open} toggle={() => setOpen(!open)} required={true}>
                    <DropdownToggle caret className='nanum-gothic'>{sex}</DropdownToggle>
                    <DropdownMenu>
                        {Object.keys(state.ItemList).map((key, idx) =>
                            <DropdownItem key={idx}
                                          className='border-0 nanum-gothic'
                                          value={key}
                                          onClick={() => setSex(key)
                                      }
                            >{state.ItemList[key]}</DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </FormGroup>
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>email</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='email' className='nanum-gothic'/>
                </Col>
            </FormGroup>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(CustomerGetEditForm)
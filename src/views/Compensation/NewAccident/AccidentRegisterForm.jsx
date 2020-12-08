import React, {useEffect, useState} from "react";
import {
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'
import {connect} from 'react-redux'
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = (e, closeModal) => {
    e.preventDefault()
    const insuranceId = document.getElementById('insuranceId').value
    const clientId = document.getElementById('clientId').value
    const accidentArea = document.querySelector('#accidentArea').value
    const accidentType = document.querySelector('#accidentType').value
    const dateTime = document.querySelector('#dateTime').value

    console.log(insuranceId+"|"+clientId+"|"+accidentArea+"|"+accidentType+"|"+dateTime)


    const data = new FormData()
    data.append('insuranceId',insuranceId)
    data.append('clientId', clientId)
    data.append('accidentArea', accidentArea)
    data.append('accidentType', accidentType)
    data.append('dateTime', dateTime)

    console.log(data)
    // closeModal()
    // axios.post('accident/new_accident/accident_register', data).then(()=>closeModal())
}

export const PolicyEditForm = ({iid,cid,typeList}) => {

    const [open, setOpen] = useState(false)
    const [target, setTarget] = useState("");
    const [state, setState] = useState({
        loading: true, ItemList: []
    })

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/accident/accidentType/list`, [])
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
            <input type='hidden' id='insuranceId' value={iid}/>
            <input type='hidden' id='clientId' value={cid}/>

            <FormGroup row>
                <input type='hidden' id='accidentType' value={target}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>사고종류</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Dropdown isOpen={open} toggle={() => setOpen(!open)} required={true}>
                        <DropdownToggle caret className='nanum-gothic'>{state.ItemList[target]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(state.ItemList).map((key, idx) =>
                                <DropdownItem key={idx}
                                              className='border-0 nanum-gothic'
                                              value={key}
                                              onClick={() => {
                                                  setTarget(key)
                                                  console.log(key)}}
                                >{state.ItemList[key]}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>


            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>사고장소</Label>
                </Col>
                <Col md={9} sm={12} lg={6}>
                    <Input type='text' className='nanum-gothic' id='accidentArea'/>
                </Col>
            </FormGroup>

                <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>사고 시간</Label>
                </Col>
                <Col md={9} sm={12} lg={6}>
                    <Input type='datetime-local' className='nanum-gothic' id='dateTime'/>
                </Col>
                    </FormGroup>

        </div>

            )
            
}


const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(PolicyEditForm)
import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'
import axios from "axios";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'


export const uploadAction = (eid, e, closeModal) => {
    e.preventDefault()
    const customerId = document.getElementById('customerId').value
    const content = document.getElementById('content').value

    const data = new FormData()
    data.append('cid',customerId)
    data.append('content', content)
    data.append('eid',eid)
    axios.post('/counseling/record/registerById', data).then(()=>closeModal())
}

const CustomerRelationshipForm = () => {

    const [state, setState] = useState({loading: true, ItemList: null})
    const [update,setUpdate]=useState(false)

    const [target, setTarget] = useState({id: 0, name: ""})

    useEffect(() => {
    const getAxios = async () => {
        if(update) {
            console.log(`/client/search/nameAndId?name=${target.name}&id=${target.id}`)
            await axios.get(`/client/search/nameAndId?name=${target.name}&id=${target.id}`)
                .then(({data}) => {
                    setState({loading: false, ItemList: data})
                    if(target.id!==0&&!state.ItemList){
                        alert("해당 고객은 존재하지 않습니다.")
                        setTarget({id:0, name:""})
                    }
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        setUpdate(false)
        }
    }
    getAxios()
    }, [update])


    return (
        <div className='flex-grow-1'>
            {target.id === 0 && !state.ItemList ?


                <FormGroup row>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>고객 번호/이름</Label>
                    </Col>
                    <Col md={9} sm={12} lg={2}>
                        <Input type='number' id='number' className='nanum-gothic' required/>
                    </Col>
                    <Col md={9} sm={12} lg={4}>
                        <Input type='text' id='name' className='nanum-gothic' required/>
                    </Col>
                    <Col md={9} sm={12} lg={4}>
                        <Button color='primary' onClick={() => {
                            let id = document.getElementById('number').value
                            let name = document.getElementById('name').value
                            setTarget({id: id, name: name})
                            setUpdate(true)
                        }

                        }>검색</Button>
                    </Col>
                </FormGroup>
                : null}


            {target.id !== 0 && state.ItemList ?
                <FormGroup row>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>고객id</Label>
                    </Col>

                    <Col md={9} sm={12} lg={2}>
                        <Input type='text' id='customerId' className='nanum-gothic' value={state.ItemList.id}
                               disabled/>
                    </Col>

                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>고객이름</Label>
                    </Col>
                    <Col md={9} sm={12} lg={3}>
                        <Input type='text' id='customerName' className='nanum-gothic' value={state.ItemList.name}
                               disabled/>
                    </Col>
                </FormGroup> : null}

            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상담내용</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text'  id='content' className='nanum-gothic' required/>
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

export default CustomerRelationshipForm
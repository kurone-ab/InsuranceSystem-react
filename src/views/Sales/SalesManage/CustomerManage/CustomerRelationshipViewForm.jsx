import React, {useState, useEffect, lazy} from "react";
import axios from "axios";
import {
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'

export const CustomerRelationshipViewForm = ({id}) => {
    const [state, setState] = useState({
        loading: true,
        tableData: [],
        target:-1
    })

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/counseling/record/search?id=${id}`)
                .then(({data}) => {
                    setState({loading: false, tableData: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, tableData: state.tableData})
                })
        }
        getAxios();
    }, [])


    const { clientName, content, date} =  state.tableData

    return (

        <div className='flex-grow-1'>


                    <FormGroup row>
                        <input type='hidden' id='name' value={clientName}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>고객이름</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={clientName} disabled/>
                        </Col>
                    </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={content}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상담내용</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={content} disabled/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='age' value={date}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>날짜</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={date} disabled/>
                </Col>
            </FormGroup>


        </div>
    )
}


export default CustomerRelationshipViewForm
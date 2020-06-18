import React, {useState} from 'react'
import {connect} from 'react-redux'
import {
    Form,
    FormGroup,
    InputGroup,
    Label,
    Input,
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap'


const AccidentRegistrationForm = () => {
    const [open, setOpen] = useState(false)
    const [searchType, setSearchType] = useState('이름')

    const search = () => {
        switch (searchType) {
            case "이름":
                break
            case '주민 번호':
                break
            case '연락처':
                break
            default:
                break
        }
    }

    return (
        <>
            <FormGroup row>
                <Col lg={3}>
                    <InputGroup>
                        <span className="ml-auto w-25"/>
                        <Dropdown isOpen={open} toggle={() => setOpen(!open)} id='searchType' required>
                            <DropdownToggle caret className='nanum-gothic my-auto'>{searchType}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className={'nanum-gothic border-0'} onClick={() => setSearchType('이름')}>
                                    이름
                                </DropdownItem>
                                <DropdownItem className={'nanum-gothic border-0'}
                                              onClick={() => setSearchType('주민 번호')}>
                                    주민 번호
                                </DropdownItem>
                                <DropdownItem className={'nanum-gothic border-0'} onClick={() => setSearchType('연락처')}>
                                    연락처
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </InputGroup>
                </Col>
                <Col md={12} lg={6}>
                    <Input id='clientSearch' type='text' className='nanum-gothic font-lg' required/>
                </Col>
                <Col lg={3}>
                    <Button onClick={search} color='primary'>검색</Button>
                </Col>
            </FormGroup>
        </>
    )
}

export default AccidentRegistrationForm
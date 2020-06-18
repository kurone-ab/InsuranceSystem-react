import React, {useState} from 'react'
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup
} from 'reactstrap'


const AccidentRegistrationForm = () => {
    const [open, setOpen] = useState(false)
    const [searchType, setSearchType] = useState('이름')

    const searchTypeList = ['이름', '주민 번호', '연락처']
    const search = () => {
        switch (searchType) {
            case searchTypeList[0]:
                break
            case searchTypeList[1]:
                break
            case searchTypeList[2]:
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
                                {
                                    searchTypeList.map(type =>
                                        <DropdownItem className={'nanum-gothic border-0'}
                                                      onClick={() => setSearchType(type)}>
                                            {type}
                                        </DropdownItem>)
                                }
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
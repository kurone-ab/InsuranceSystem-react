import React from "react";
import {Form, FormGroup, InputGroup, Label, Input, Button} from 'reactstrap'
import CounselingForm, {saveRecord} from "../../Sales/SalesManage/ProductManage/CounselingForm";
import AccidentRegistrationForm from "./AccidentRegisterationForm";

const AccidentRegister = () => {
    return(
        <div className={'animated fadeIn'}>
            <Form>
                <AccidentRegistrationForm/>
                <Button color={'primary'} className='nanum-gothic'>저장 하기</Button>
            </Form>
        </div>
    )
}

export default AccidentRegister
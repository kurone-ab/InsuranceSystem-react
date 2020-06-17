import React from "react";
import CounselingForm, {saveRecord} from "./CounselingForm";
import {Form, Button} from 'reactstrap'
import {useStore} from "react-redux";

const ContractCreate = () => {
    const {user:{id}} = useStore().getState()

    return(
        <div className={'animated fadeIn'}>
            <Form>
                <CounselingForm/>
                <Button color={'primary'} onClick={() => saveRecord(id)} className='nanum-gothic'>저장 하기</Button>
            </Form>
        </div>
    )
}

export default ContractCreate
import React from "react";
import CustomizableTable from "../../global/CustomizableTable";
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const header = {
    id: '번호',
    name: {
        title: '제목',
        className: 'w-50'
    },
    author: '작성자',
    date: '수정 시각'
}

const Authorize = () => {
    const fileupload = (e, closeModal) => {
        e.preventDefault()
        const file = document.getElementById('approvalDoc').files[0]
        const formData = new FormData()
        formData.append('file', file)
        axios.post('/insurance/authorize', formData).then(r => console.log(r.data))
        // closeModal()
    }

    return (
        <div className='animated fadeIn'>
            <CustomizableTable tableTitle='인가 품의서' tableHeader={header} activeModal modalProps={{
                modalTitle: '인가 품의서 업로드하기',
                uploadAction: fileupload,
                fileUpload: true,
                fileElementId: 'approvalDoc'
            }}/>
        </div>
    )
}

export default Authorize
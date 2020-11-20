import React, {lazy} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {useGetAxios} from "../../global/useAxios";
import axios from 'axios'
import {connect, useStore} from "react-redux";
import {loadAuthorizeDoc} from "../../../globalStore";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'
const Loading = lazy(() => import('../../global/Loading'))

const header = {
    id: '번호',
    fileName: {
        title: '파일',
        className: 'w-50'
    },
    authorName: '작성자',
    date: '수정 시각'
}

const Authorize = ({load, authorizeDocList}) => {
    useGetAxios({url: '/insurance/authorize', callback: load, necessary: !authorizeDocList})
    const {user: {id: eid}} = useStore().getState()

    const renderData = authorizeDocList ? authorizeDocList.map((authorizeDoc) => {
        const {id, fileName, authorName, date} = authorizeDoc
        return {
            id,
            fileName: {
                title: fileName,
                aTag: true,
                id
            },
            authorName,
            date
        }
    }) : null

    const fileupload = (e, closeModal) => {
        console.log("파일업로드")
        e.preventDefault()
        const file = document.getElementById('approvalDoc').files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('author_eid', eid)
        axios.post('/insurance/authorize/upload', formData).then(r => console.log(r.data))
        closeModal()
    }


    return (
        <div className='animated fadeIn'>
            {renderData ?
                <CustomizableTable tableTitle='인가 품의서' tableHeader={header} tableRowData={renderData} activeModal
                                   modalProps={{
                                       modalTitle: '인가 품의서 업로드하기',
                                       uploadAction: fileupload,
                                       fileUpload: true,
                                       fileElementId: 'approvalDoc'
                                   }}/> : <Loading/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {authorizeDoc: {authorizeDocList} = {}} = state
    return authorizeDocList ? {
        authorizeDocList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    console.log("로그로그")
    return {
        load: (authorizeDoc) => dispatch(loadAuthorizeDoc(authorizeDoc))
    }
}

// export default Authorize()
export default connect(mapStateToProps, mapDispatchToProps)(Authorize)
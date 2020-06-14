import React from "react";
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import {loadAnnouncementContent} from "../../globalStore";
import {useGetAxios} from "../global/useAxios";

const BASE_URL = '/announcement/content'

const AnnouncementReadForm = ({id, contentDispatcher, contentList}) => {
    const content = contentList[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, necessary: !content, callback: contentDispatcher})
    return (
        content ?
            <div className='nanum-gothic'>{content}</div> : <Spinner color='primary'/>
    )
}

const mapStateToProps = (state) => {
    const {announcement: {contentList} = {}} = state
    return contentList ? {
        contentList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        contentDispatcher: (content) => dispatch(loadAnnouncementContent(content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementReadForm)
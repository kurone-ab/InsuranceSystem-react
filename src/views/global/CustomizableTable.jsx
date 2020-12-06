import React, {lazy, useState} from "react";
import {Card, CardBody, CardHeader, Table} from 'reactstrap'
import propTypes from 'prop-types'
import ReadContentModal from "./ReadContentModal";
import axios from 'axios';
import {asc as ascSort, desc as descSort} from "../../comparator";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

const GenerateDocumentModal = lazy(() => import('../global/GenerateDocumentModal'))

const defaultHeader = {
    id: '글 번호',
    title: {
        title: '제목',
        className: 'w-50'
    },
    date: '업로드 날짜',
    author: '작성자'
}

const BaseTable = ({tableHeader, tableRowData, retrieveForm: RetrieveForm}) => {
    //set default
    const temp = {}
    const contentOpenState = {}

    //temp 배열의 tableHeader 인덱스 번째에, sort의 값들을 넣어준다.
    KEYS(tableHeader).forEach((header) => {
        temp[header] = sort
    })

    //useState 상태만들기.
    const [align, setAlign] = useState(temp)
    const [content, setContent] = useState(tableRowData)
    const [open, setOpen] = useState(contentOpenState)

    //asc의 값에 따라 desc혹은 asc로 스위칭//관련 함수도 마찬가지
    const switching = (current) => current === asc ? desc : asc
    const sortSwitching = (current) => current === asc ? ascSort : descSort


    //tableRowData를 한줄씩 처리.
    const columnAlign = (column) => {
        if (!content) return
        const newAlign = {}
        KEYS(align).forEach((header) => {
            newAlign[header] = header === column ? switching(align[column]) : sort
        })
        const newContent = content.sort((a, b) => {
            const {title: aTitle} = a[column]
            const {title: bTitle} = b[column]
            return sortSwitching(newAlign[column])(aTitle ? aTitle : a[column], bTitle ? bTitle : b[column])
        })
        //state값들에 변화.
        setContent(newContent)
        setAlign(newAlign)
    }

    //id를 가지고 contentOpenState의 id 번째를 바꾸고, 바꾼 것을 state에 저장.
    const specificOpenState = (id) => {
        contentOpenState[id] = true
        setOpen({...contentOpenState})
    }

    //반환하다. jsx
    return(
        <Table responsive borderless striped className='font-lg'>
            <thead>
            <tr>
                {
                    //tableHeader의 키들로 반복문:: key
                    KEYS(tableHeader).map((header, idx) => {
                        //tableHeader에서 타이틀 불러오고, className='' 이렇게 세팅.
                        const {title = tableHeader[header], className = ''} = tableHeader[header]
                        //아까 불러온 타이틀과 클래스네임으로 th태그 생성.(표의 제목무문//
                        //정렬 클릭하는 부분 생성. 클래스가 뭐냐에 따라 다른 세모모양.
                        return <th key={idx} className={`${className} nanum-gothic`}>
                            {title}
                            <i className={`fa ${align[header]} ml-2`} onClick={() => columnAlign(header)}/>
                        </th>
                    })
                }
            </tr>
            </thead>
            <tbody>

            {//content가 없으면 td에 noData! 표시. 근데 아마 테이블마다 content없으면 Loading뜨게 되어있어서 거의 무의미한 부분.
                content ? null : <tr>
                    <td className={'nanum-gothic font-lg font-weight-bold text-center'} colSpan={KEYS(tableHeader).length}>No
                        Data!
                    </td>
                </tr>
            }
            {
                //
                content ? content.map((row, idx) => {
                    return (
                        <tr key={idx}>
                            {KEYS(row).map((key, idx) => {
                                //내용으로 제목과 아이디 얻기.
                                const {title, id} = row[key];
                                contentOpenState[id] = false
                                return (

                                    <td key={idx} className={'nanum-gothic font-lg'}>
                                        {
                                            title ?
                                                //eslint-disable-next-line
                                                //a태그 옵션이 켜져있을 경우 a태그 생성.
                                                <a href='#' onClick={(e) => {
                                                    e.preventDefault()
                                                    specificOpenState(id)
                                                }}>{title}</a> :
                                                //a태그 옵션이 켜져있지 않을 경우 a태그 없이 그냥 div
                                                <div className='nanum-gothic'>{row[key]}</div>
                                        }
                                        {
                                            //RetrieveForm( 표 내부 a태그 클릭 시 해당 행과 관련된 정보 보여주는 폼 ) 부분.
                                            title&&id ? <ReadContentModal open={open[id] ? open[id] : false}
                                                                      toggleFunc={() => {
                                                                          specificOpenState(-1)
                                                                      }} title={title}
                                                                      content={<RetrieveForm id={id}/>}/> : null
                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    )
                }) : null
            }
            </tbody>
        </Table>
    )
}

const KEYS = (target) => Object.keys(target)
const CustomizableTable = ({
                               tableRowData, tableTitle, tableHeader = defaultHeader, retrieveForm: RetrieveForm, activeModal, modalProps, noCard
                           }) => {

    return (noCard ?
            <>
                <div className='d-flex align-content-end'>{activeModal ? <GenerateDocumentModal {...modalProps}/> : null}</div>
                <BaseTable tableHeader={tableHeader} tableRowData={tableRowData} retrieveForm={RetrieveForm}/>
            </> :
            <Card className="card-accent-primary">
                <CardHeader className='d-flex'>
                <span className='my-auto nanum-gothic font-lg'>
                    <i className='fa fa-align-justify mr-2'/>{tableTitle}</span>
                    {activeModal ? <GenerateDocumentModal {...modalProps}/> : null}
                </CardHeader>
                <CardBody>
                    <BaseTable tableHeader={tableHeader} tableRowData={tableRowData} retrieveForm={RetrieveForm}/>
                </CardBody>
            </Card>
    )
}

CustomizableTable.propTypes = {
    contentData: propTypes.array,
    tableTitle: propTypes.string.isRequired,
    tableHeader: propTypes.object,
    activeModal: propTypes.bool,
    modalProps: propTypes.object
}

export default CustomizableTable

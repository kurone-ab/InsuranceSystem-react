import React, {useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Collapse, Table} from 'reactstrap'

const InfoTable = (props) => {
    const sort = 'fa-sort', desc = 'fa-sort-desc', asc = 'fa-sort-asc'

    const switching = (current) => {
        if (current === desc) return asc
        else return desc
    }

    const [state, setState] = useState({
        number: sort,
        title: sort,
        date: sort,
        author: sort,
        open: true
    })

    const changeOrder = (target) => {
        switch (target) {
            case 'number':
                setState({
                    number: switching(state.number),
                    title: sort,
                    date: sort,
                    author: sort,
                    open: true
                })
                break
            case 'title':
                setState({
                    number: sort,
                    title: switching(state.title),
                    date: sort,
                    author: sort,
                    open: true
                })
                break
            case 'date':
                setState({
                    number: sort,
                    title: sort,
                    date: switching(state.date),
                    author: sort,
                    open: true
                })
                break
            case 'author':
                setState({
                    number: sort,
                    title: sort,
                    date: sort,
                    author: switching(state.author),
                    open: true
                })
                break
            default:
                break
        }
    }

    const collapse = () => {
        setState({
            number: state.number,
            title: state.title,
            date: state.date,
            author: state.author,
            open: !state.open
        })
    }

    const collapseIcon = () => {
        return state.open ? 'icon-arrow-up' : 'icon-arrow-down'
    }

    return (
        <Card className="card-accent-primary">
            <CardHeader className='d-flex'>
                <span className='my-auto'>{props.header}</span>
                <div className="card-header-actions ml-auto">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="card-header-action btn btn-minimize" data-target={`#${props.collapseID}`}
                       onClick={collapse}><i className={collapseIcon()}/></a>
                </div>
            </CardHeader>
            <Collapse id={props.collapseID} isOpen={state.open}>
                <CardBody>
                    <Table responsive striped>
                        <thead>
                        <tr>
                            <th id="market-bulletin-id">글 번호<i className={`fa ${state.number} ml-2`}
                                                               onClick={() => changeOrder('number')}/></th>
                            <th id="market-bulletin-title">제목<i className={`fa ${state.title} ml-2`}
                                                                onClick={() => changeOrder('title')}/></th>
                            <th id="market-bulletin-date">업로드 날짜<i className={`fa ${state.date} ml-2`}
                                                                   onClick={() => changeOrder('date')}/></th>
                            <th id="market-bulletin-writer">작성자<i className={`fa ${state.author} ml-2`}
                                                                  onClick={() => changeOrder('author')}/></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp4</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp5</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp7</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp2</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>temp</td>
                            <td>temp1</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>temp</td>
                            <td>temp7</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>temp</td>
                            <td>temp</td>
                            <td>temp3</td>
                        </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Collapse>
            <CardFooter className='d-flex'>
                <Button className='ml-auto' color='primary' size='sm'><i className='fa fa-upload mr-1'/>보고서
                    작성하기</Button>
            </CardFooter>
        </Card>
    )
}

const Planning = () => {

    return (
        <div className='animated fadeIn'>
            <InfoTable header='시장 조사 정보' collapseID='market'/>
            <InfoTable header='전략 정보' collapseID='strategy'/>
        </div>
    )
}

export default Planning
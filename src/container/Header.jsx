import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from 'reactstrap';
import {AppNavbarBrand, AppSidebarToggler} from "@coreui/react";
import maxImg from '../image/hanhwa_max.png'
import minImg from '../image/hanhwa_min.png'

const Header = (props) => {
    const name = sessionStorage.getItem('name')

    return(
        <Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
                full={{ src: maxImg, width: 89, height: 25, alt: '신동아 화재' }}
                minimized={{ src: minImg, width: 30, height: 30, alt: '신동아 화재' }}
            />
            <AppSidebarToggler className="d-md-down-none" display="lg" />

            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav direction="down" className="mr-4">
                    <DropdownToggle nav className="d-flex">
                        <div className='m-auto nanum-gothic'>{name}</div>
                        <img src="https://img.icons8.com/android/144/000000/user.png" className="img-avatar"
                             alt="admin"/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={e => props.onLogout(e)}>
                            <i className="cui-account-logout"/> Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Fragment>
    )
}

export default Header

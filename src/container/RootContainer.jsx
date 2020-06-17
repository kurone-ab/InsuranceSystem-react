import React, {lazy, Suspense} from "react";
import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarMinimizer as SidebarMinimizer,
    AppSidebarNav as SidebarNav,
} from "@coreui/react";
import {Container, Spinner} from 'reactstrap';
import * as router from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../globalStore'
import navItems from "../navItems";
import routes from "../routes";
import Loading from "../views/global/Loading";

const Header = lazy(() => import('./Header'))

const RootContainer = ({user, deleteUser, ...rest}) => {
    const logout = (e) => {
        deleteUser()
        rest.history.push('/login')
    }

    return (
        <div className="app">
            <AppHeader fixed>
                <Suspense fallback={Loading()}>
                    <Header onLogout={e => logout(e)}/>
                </Suspense>
            </AppHeader>
            <div className="app-body">
                <AppSidebar fixed display="lg">
                    <Suspense fallback={Loading()}>
                        <SidebarNav navConfig={navItems} {...rest} router={routes}/>
                    </Suspense>
                    <SidebarMinimizer/>
                </AppSidebar>
                <main className="main bg-light">
                    <AppBreadcrumb appRoutes={routes} router={router}/>
                    <Container fluid>
                        <Suspense fallback={Loading()}>
                            <Switch>
                                {user ? null : <Redirect to='/login'/>}
                                {
                                    routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )}/>
                                        ) : null;
                                    })
                                }
                                <Redirect from="/" to='/home'/>
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
            </div>
            <AppFooter>
                <span>Copyright &copy; PHEONIX 2020</span>
            </AppFooter>
        </div>
    )
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
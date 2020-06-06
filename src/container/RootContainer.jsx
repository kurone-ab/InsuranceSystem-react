import React, {lazy, Suspense} from "react";
import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarMinimizer as SidebarMinimizer,
    AppSidebarNav as SidebarNav,
} from "@coreui/react";
import {Container} from 'reactstrap';
import * as router from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router-dom';
import navItems from "../navItems";
import routes from "../routes";
const Header = lazy(() => import('./Header'))

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const RootContainer = (props) => {

    const logout = (e) => {
        e.preventDefault();
        sessionStorage.clear()
        props.history.push('/login')
    }

    return (
        <div className="app">
            <AppHeader fixed>
                <Suspense fallback={loading()}>
                    <Header onLogout={e => logout(e)}/>
                </Suspense>
            </AppHeader>
            <div className="app-body">
                <AppSidebar fixed display="lg">
                    <Suspense fallback={loading()}>
                        <SidebarNav navConfig={navItems} {...props} router={routes}/>
                    </Suspense>
                    <SidebarMinimizer/>
                </AppSidebar>
                <main className="main bg-gray-200">
                    <AppBreadcrumb appRoutes={routes} router={router}/>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <Switch>
                                {sessionStorage.getItem('login') ? null: <Redirect to='/login'/>}
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

export default RootContainer;
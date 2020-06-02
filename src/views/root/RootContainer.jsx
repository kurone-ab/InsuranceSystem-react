import React, {Suspense, lazy} from "react";
import {
    AppBreadcrumb2 as AppBreadcrumb,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    // eslint-disable-next-line no-unused-vars
    AppSidebarForm,
    // eslint-disable-next-line no-unused-vars
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import { Container } from 'reactstrap';
import * as router from 'react-router-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import navItems from "../../navItems";
import routes from "../../routes";


const Header = lazy(() => import('./Header'))

const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

const logout = (e) => {
    e.preventDefault();
    console.log("logout")
}


const RootContainer = (props) => {
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
                        <AppSidebarNav navConfig={navItems} {...props} router={routes}/>
                    </Suspense>
                    <AppSidebarFooter/>
                    <AppSidebarMinimizer/>
                </AppSidebar>
                <main className="main">
                    <AppBreadcrumb appRoutes={routes} router={router}/>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />
                                    ) : null;
                                })}
                                <Redirect from="/" to="/home" />
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
            </div>
        </div>
    )

}

export default RootContainer;
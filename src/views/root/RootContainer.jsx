import React, {Suspense} from "react"
import {
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import navItems from "../../navItems";

const Header = React.lazy(() => import('./Header'))

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
                        <AppSidebarNav navConfig={navItems} {...props}/>
                    </Suspense>
                    <AppSidebarFooter/>
                    <AppSidebarMinimizer/>
                </AppSidebar>
            </div>
        </div>
    )

}

export default RootContainer;
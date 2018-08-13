import React from 'react';
import { Dashboard, Home, ItemDetail, NoMatch } from './views';
import { Nav, SideNav, Footer } from './nav';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        navigatable: true,
        exact: true
    },
    {
        path: '/dashboard/',
        name: 'Dashboard',
        component: Dashboard,
        navigatable: true,
        exact: false
    },
    {
        path: '/item/:id',
        name: 'Item Details',
        component: ItemDetail,
        parent: 'Dashboard',
        exact: false
    }
]
const TopNav = withRouter(props => <Nav {...props} routes={routes}/>);
const LeftNav = withRouter(props => <SideNav {...props} routes={routes}/>);
const routeItems = routes.map((item) => {
    return (
        <Route key={item.name} exact={item.exact} path={item.path} component={item.component}/>
    );
});

const Root = ({store, history}) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div className="main grey lighten-5">
                    <Nav routes={routes} />
                    <SideNav routes={routes} />
                    <div className="content-container">
                        <div className="container">
                             <Switch>
                                 {routeItems}
                                 <Route component={NoMatch} />
                             </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
            </ConnectedRouter>
        </Provider>
    );
};
export {Root, routes};

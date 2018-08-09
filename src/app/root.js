import React from 'react';
import { Dashboard, Home } from './views';
import { Nav, SideNav } from './nav';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        exact: true
    },
    {
        path: '/dashboard/',
        name: 'Dashboard',
        component: Dashboard,
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

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <TopNav />
                    <LeftNav />
                    <div className="content-container">
                        <div className="container">
                            {routeItems}
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );
};
export default Root;

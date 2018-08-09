import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = (props) => {
    const navItems = props.routes.map((item) => {
        return (
            <li key={item.name} className={(item.path == props.location.pathname ? 'active' : '')}>
                <Link to={item.path}>{item.name}</Link>
            </li>
        );
    });
    return (
        <ul className="sidenav sidenav-fixed hide-on-med-and-down grey darken-2 sidenavbar">
            {navItems}
        </ul>
    );
}
export default SideNav;

import React from 'react';
import { getNavItems } from '../utils'
import { connect } from 'react-redux';

const SideNav = (props) => {
    const navItems = getNavItems(props.state.routeChange)
    return (
        <div className="sidenav sidenav-fixed hide-on-med-and-down grey darken-2 sidenavbar">
            <div className="logo-container">
                <a id="side-logo-container" href="/" className="brand-logo">Brand</a>
            </div>
            <ul className="">
                {navItems}
            </ul>
        </div>
    );
}
export default connect(
    (state) => ({
        state: state,
    })
)(SideNav);

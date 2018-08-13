import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../app/root'

export const getNavItems = (routeState ) => routes.map((item) => {
    return ( item.navigatable ?
        <li key={item.name} className={(item.path == routeState.path ? 'active' : '')}>
            <Link to={item.path}>{item.name}</Link>
        </li> :
        ''
    );
});

export const waitForNavState = (props) => {
    return new Promise(function(resolve, reject) {
        if (!props.onLocationChange)
            reject('You need to add onLocationChange to props')
        if (props.state.router.location.pathname != props.state.routeChange.url)
            props.onLocationChange(props.ownProps.match)
        if (props.state.routeChange.url) {
            resolve(props)
        }
    });
}

export const validateItem = (item) =>{
    let errors = {},
        valid = true;
    if (!item.name){
        valid = false;
        errors.name = 'This field is requered';
    }
    if (!item.itemName){
        valid = false;
        errors.itemName = 'This field is requered';
    }
    if (!item.price){
        valid = false;
        errors.price = 'This field is requered';
    }
    return {valid, errors}
}

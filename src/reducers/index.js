import { combineReducers } from 'redux';
import items from './items';
import modalsState from './modal';
import routeChange from './route';

export default combineReducers({
    items,
    modalsState,
    routeChange
})

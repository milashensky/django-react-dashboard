export default function modalsState(state = {}, action){
    let newState = {};
    switch (action.type) {
        case 'CHANGE_ADDMODAL_STATE':
            newState = state;
            newState['addmodalState'] = action.state;
            if (!action.state)
                newState['addmodalErrors'] = {}
            return newState
            break;
        case 'CHANGE_DETAILMODAL_STATE':
            newState = state;
            newState['detailModalState'] = action.state;
            return newState
            break;
        case 'ADDMODAL_ERRORS':
            newState = state;
            newState['addmodalErrors'] = action.errors;
            return newState
            break;
        case 'ADD_ITEM_SUCCESS':
            newState = state;
            newState['addmodalState'] = false;
            return newState
            break;
        case 'GET_ITEM_SUCCESS':
            newState['detailModalState'] = true;
            return newState
            break;
        case 'DELETE_ITEM_SUCCESS':
            newState['detailModalState'] = false;
            return newState
            break;
        case 'LOCATION_CHANGED':
            newState = state;
            newState['addmodalErrors'] = {}
            newState['addmodalState'] = false;
            newState['detailModalState'] = false;
            return newState

    }
    return state
}

export default function items(state = {state: false, items: []}, action){
    let newState = {};
    switch (action.type) {
        case 'EDIT_FORM_ERRORS':
            newState = state;
            newState.formErrors = action.errors;
            return newState
            break;
        case 'EDIT_ITEM_ERROR':
            M.toast({html: 'Error! Try again.', classes: 'red' })
            break;
        case 'DELETE_ITEM_SUCCESS':
            newState = state;
            let index = newState.items.indexOf(newState.items.find(x => x.id == action.delete));
            if (index > -1) {
                newState.items.splice(index, 1);
                M.toast({html: 'Successfuly deleted!', classes: 'blue lighten-2'})
            }
            newState.item = {};
            return newState
            break;
        case 'EDIT_ITEM_SUCCESS':
            newState = state;
            newState.formErrors = undefined;
            if (!state.items.find(x => x.id == action.payload.id))
                newState.items = [...state.items, action.payload];
            newState.item = action.payload;
            M.toast({html: 'Successfuly saved!', classes: 'blue lighten-2' })
            return newState
            break;
        case 'GET_ITEM_SUCCESS':
            newState = state;
            if (!state.items.find(x => x.id == action.payload.id))
                newState.items = [...state.items, action.payload];
            newState.item = action.payload;
            return newState
            break;
        case 'ADD_ITEM_SUCCESS':
            M.toast({html: 'Added new item!', classes: 'blue lighten-2' })
            return {state: true, items: [...state.items, action.payload]}
            break;
        case 'FETCH_ITEMS_SUCCESS':
            return {state: true, items: action.payload}
            break;
        case 'ADD_ITEM_ERROR':
            M.toast({html: "Can't add new item. Try again.", classes: 'red' })
            break;
        case 'GET_ITEM_ERROR':
            M.toast({html: "Can't get item.", classes: 'red' })
            break;
        case 'FETCH_ITEMS_ERROR':
            M.toast({html: "Can't get items.", classes: 'red' })
            break;
        case 'DELETE_ITEM_ERROR':
            M.toast({html: 'Error!', classes: 'red' })
            break;
        case 'LOCATION_CHANGED':
            newState = state;
            newState.formErrors = undefined;
            return newState
    }
    return state
}

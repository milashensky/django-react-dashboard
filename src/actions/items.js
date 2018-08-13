import ReactResource from 'react-resource';
import { browserHistory } from 'react-router'
import { push, replace, go } from 'connected-react-router'
import { validateItem } from '../app/utils';

const Items = new ReactResource('/api/items', {})
const Item = new ReactResource('/api/item/{:id}/', {id: ':id'})


export const getItem = (id, items = {}) => {
    return dispatch => {
        let item = items.find(x=> x.id == id);
        if (item && item.id) {
            dispatch({
                type: 'GET_ITEM_SUCCESS',
                payload: item
            })
        } else {
            Item.get({id}).then(function(item){
                if (item)
                    dispatch({
                        type: 'GET_ITEM_SUCCESS',
                        payload: item
                    })
                else {
                    dispatch(push('/dashboard/'));
                    dispatch({type: 'GET_ITEM_ERROR'});
                }
            }).catch(function() {
                dispatch(push('/dashboard/'));
                dispatch({type: 'GET_ITEM_ERROR'});
            })
        }
    }
};

export const getItems = () => {
    return dispatch => {
        Items.query().then(function(response){
            dispatch({
                type: 'FETCH_ITEMS_SUCCESS',
                 payload: response.
                 map((item) => ({
                     id: item.pk,
                     name: item.fields.name,
                     itemName:item.fields.item_name,
                     price:item.fields.price,
                 })
                )
            });
        }).catch(function(){
            dispatch(push('/404'))
            dispatch( { type: 'FETCH_ITEMS_ERROR', errors});
        })
    }
}

export const createItem = (item) => {
    return dispatch => {
        let errors = {},
            valid = true;
        ({ errors, valid } = validateItem(item));
        if (valid)
            Items.create({
                item_name: item.itemName,
                price: item.price,
                name: item.name
            }).then(function(response){
                if (response && response.status)
                    dispatch({
                        type: 'ADD_ITEM_SUCCESS',
                        payload: response.item
                    })
                else {
                    dispatch( { type: 'ADDMODAL_ERRORS', errors: {
                            itemName: response.errors.item_name,
                            price: response.errors.price,
                            name: response.errors.name
                        }
                    });
                }
            }).catch(function(){
                dispatch( { type: 'ADD_ITEM_ERROR', errors});
            })
        else
            dispatch( { type: 'ADDMODAL_ERRORS', errors});
    }
}

export const deleteItem = (id) => {
    return dispatch => {
        Item.delete({id}).then(function(response){
            if (response.status)
                dispatch({
                    type: 'DELETE_ITEM_SUCCESS',
                    delete: id
                })
            else {
                dispatch({type: 'DELETE_ITEM_ERROR'});
            }
        }).catch(function(error){
            dispatch({type: 'DELETE_ITEM_ERROR'});
        })
    }
}

export const editItem = (item) => {
    return dispatch => {
        let errors = {},
            valid = true;
        ({ errors, valid } = validateItem(item));
        if (valid)
            Item.update({
                id: item.id,
                item_name: item.itemName,
                price: item.price,
                name: item.name
            }).then(function(response){
                if (response.status){
                    dispatch(push('/dashboard/'));
                    dispatch({
                        type: 'EDIT_ITEM_SUCCESS',
                        payload: response.item
                    })
                } else {
                    dispatch({
                        type: 'EDIT_FORM_ERRORS',
                        errors: {
                            itemName: response.errors.item_name,
                            price: response.errors.price,
                            name: response.errors.name
                        }
                    });
                }
            }).catch(function(error){
                dispatch({type: 'EDIT_ITEM_ERROR'});
            })
        else
            dispatch({
                type: 'EDIT_FORM_ERRORS',
                errors,
            });
    }
}

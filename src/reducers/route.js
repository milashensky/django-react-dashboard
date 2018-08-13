import { routes } from '../app/root'

export default function routeChange(state = {}, action){
    switch (action.type) {
        case 'LOCATION_CHANGED':
            let curRoute = routes.filter((x) => action.path == x.path);
            if (curRoute.length)
                document.title = document.title.split(' |')[0] + ` | ${ curRoute[0].name }`;
            return {
                path: action.path,
                params: action.params,
                url: action.url
            }
            break;
    }
    return state
}

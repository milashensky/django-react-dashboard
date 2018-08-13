export const onLocationChange = (match) => {
        return dispatch => {
            dispatch({
                type: 'LOCATION_CHANGED',
                path: match.path,
                params: match.params,
                url: match.url,
        })
    }
}

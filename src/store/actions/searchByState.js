export function handler(S) {
    return (dispatch, getState) => {
        return dispatch({ type: 'SEARCH_BY_STATE', S })
    }
}
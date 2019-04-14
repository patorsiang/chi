export function handle(S) {
    return (dispatch, getState) => {
        dispatch({ type: 'SEARCH_BY_STATE', S })
    }
}
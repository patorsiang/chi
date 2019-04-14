export function handler() {
    return (dispatch, getState) => {
        return dispatch({ type: 'LOAD_POST' })
    }
}
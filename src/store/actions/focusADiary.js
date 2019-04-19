export function handler(id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const Dairy = firebase.functions().httpsCallable('getDiary')
        Dairy({ id }).then(result => {
            console.log(result);
            
            dispatch({ type: 'GET_DIARY', result: result.data })
        }).catch(error => dispatch({ type: 'GET_DIARY', result: [] }))
    }
}
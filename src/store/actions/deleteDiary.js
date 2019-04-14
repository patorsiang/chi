export function handler(id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const Dairy = firebase.functions().httpsCallable('removeDiary')
        Dairy({ id }).then(result => {
            console.log(result.data);
            dispatch({ type: 'ROMOVE_SUCCESS', result: "Document successfully deleted!" })
        }).catch(err => dispatch({ type: 'ROMOVE_ERROR', err }))
    }
}
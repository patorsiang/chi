exports.handler = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const allDairy = firebase.functions().httpsCallable('getAllDiary')
        allDairy().then(result => {
            dispatch({ type: 'GET_ALL_DIARY', result: result.data })
        })
            .catch(error => dispatch({ type: 'GET_ALL_DIARY', result: [] }))
    }
}
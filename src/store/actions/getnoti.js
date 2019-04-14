export function handler() {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const NotiRef = firebase.functions().httpsCallable('getAllNoti')
        NotiRef().then(noti => {
            return dispatch({ type: 'GET_NOTIFICATION', noti: noti.data })
        })
    }
}
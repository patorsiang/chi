function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}

export function handler() {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const NotiRef = firebase.functions().httpsCallable('getAllNoti')
        NotiRef().then(noti => {
            return dispatch({ type: 'GET_NOTIFICATION', noti: noti.data.sort(compare) })
        })
    }
}
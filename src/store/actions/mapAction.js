function compare(a, b) {
    if (a.date > b.date)
        return -1;
    if (a.date < b.date)
        return 1;
    return 0;
}

export const changeState = (S) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const Chi = firebase.functions().httpsCallable('searchPhotoByTheme')
        Chi({ id: 'rLSKX6kYF3bGHwm17h8P2Cw0V3X2', file: 'bangkok.jpeg', keyword: 'PERSON' }).then(result => {
            console.log(result.data);
        })
            .catch(error => console.log(error))

        const searchState = firebase.functions().httpsCallable('searchPostByState')
        searchState({ state: S }).then(result => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            result.data.map(data => userInfo({id: data.writer}).then(writer => {
                data.writer = writer.data
                return data
            }).then(data => {
                console.log(data);
                dispatch({ type: 'CHANGE_STATE', S, result: result.data.sort(compare) })
            }))
        })
            .catch(error => console.log(error))
    }
}

export const changeMenu = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CHANGE_MENU', S })
    }
}

export const searchMap = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SEARCH_MAP', S })
    }
}

export const like = (id, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const PostRef = firestore.collection('diary').doc(id)
        PostRef.get().then(snapshot => {
            snapshot.data().book && snapshot.data().like.includes(uid) ?
                PostRef.update({
                    "like": firestore.FieldValue.arrayRemove(uid)
                })
                : PostRef.update({
                    "like": firestore.FieldValue.arrayUnion(uid)
                })
        });
    }
}

export const book = (id, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const PostRef = firestore.collection('diary').doc(id)
        PostRef.get().then(snapshot => {
            snapshot.data().book && snapshot.data().book.includes(uid) ?
                PostRef.update({
                    "book": firestore.FieldValue.arrayRemove(uid)
                })
                : PostRef.update({
                    "book": firestore.FieldValue.arrayUnion(uid)
                })
        });
    }
}

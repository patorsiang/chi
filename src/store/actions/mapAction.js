function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}

export const changeState = (S) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const Chi = firebase.functions().httpsCallable('getAllBookPost')
        Chi({ id: 'tMx0iOpL7GSYz0pJCkr4dyeooEO2', file: 'bangkok.jpeg' }).then(result => {
            console.log(result.data);
        })
            .catch(error => console.log(error))

        firestore.collection('diary').get().then(snapshot => {
            const result = []
            snapshot.docs.map(doc =>
                doc.data().public && S === doc.data().state ?
                    firestore.collection('user').doc(doc.data().writer).get()
                        .then(wr => {
                            result.push({ id: doc.id, data: doc.data(), writer: wr.data() })
                            result.sort(compare)
                            console.log(result)
                            dispatch({ type: 'CHANGE_STATE', S, result })
                        })
                    : null)
            dispatch({ type: 'CHANGE_STATE', S, result })
        })
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

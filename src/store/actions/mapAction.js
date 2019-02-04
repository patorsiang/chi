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

        const searchState = firebase.functions().httpsCallable('searchPostByState')
        searchState({ state: S }).then(result => {
            const userInfo = firebase.functions().httpsCallable('getUser')
            result.data.map(data => userInfo({ id: data.writer }).then(writer => {
                data.id = data.writer
                data.writer = writer.data
                return data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []
                data.meta.map(file => metadata({ id: data.id, file }).then(res => {
                    if (res.data.safe) {
                        safe.push(res.data.safe)
                        if (safe.includes("bad")) {
                            data.safe = "bad"
                        } else if (safe.includes("safe")) {
                            data.safe = "safe"
                        } else {
                            data.safe = "maybe"
                        }
                    } else {
                        data.safe = "maybe"
                    }

                    if (res.data.tags) {
                        res.data.tags.map(tag => tags.push(tag))
                    }

                    if (res.data.themes) {
                        res.data.themes.map(theme => themes.push(theme))
                    }
                    return { safe, tags, themes }
                }).then(obj => {
                    data.ProTag = [...new Set(obj.tags)]
                    data.ProTheme = [...new Set(obj.themes, data.theme)]
                }).then(() => dispatch({ type: 'CHANGE_STATE', S, result: result.data.sort(compare) })))
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

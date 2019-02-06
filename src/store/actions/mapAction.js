const uuidv1 = require('uuid/v1');

function compare(a, b) {
    if (a.data.date > b.date)
        return -1;
    if (a.data.date < b.date)
        return 1;
    return 0;
}

export const changeState = (S) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const searchState = firebase.functions().httpsCallable('searchPostByState')
        searchState({ state: S }).then(result => {
            console.log(result.data);
            const userInfo = firebase.functions().httpsCallable('getUser')
            result.data.map(data => userInfo({ id: data.data.writer }).then(writer => {
                data.data.idWriter = data.data.writer
                data.data.writer = writer.data
                return data.data
            }).then(data => {
                const metadata = firebase.functions().httpsCallable('getMetadata')
                const safe = []
                const tags = []
                const themes = []
                data.meta.map(file => metadata({ id: data.idWriter, file }).then(res => {
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
            .catch(error => dispatch({ type: 'CHANGE_STATE', S, result: [] }))
        dispatch({ type: 'CHANGE_STATE', S, result: [] })
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

export const like = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        const notid = uuidv1();
        const uid = state.firebase.auth.uid

        const PostRef = firestore.collection('diary').doc(id)

        PostRef.get().then(snapshot => {
            if (snapshot.data().like) {
                if (snapshot.data().like.includes(uid)) {
                    PostRef.update({
                        "like": firestore.FieldValue.arrayRemove(uid)
                    })
                } else {
                    const name = state.firebase.profile.displayName
                    const photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'like',
                        content: `${name} save your diary, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        name: name,
                        photo: photo,
                        date: Date()
                    });
                    PostRef.update({
                        "like": firestore.FieldValue.arrayUnion(uid)
                    })
                }
            } else {
                PostRef.set({
                    "like": [uid]
                }, { merge: true })
            }
        });
    }
}

export const book = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        const uid = state.firebase.auth.uid
        const notid = uuidv1();

        const PostRef = firestore.collection('diary').doc(id)
        PostRef.get().then(snapshot => {
            if (snapshot.data().book) {
                if (snapshot.data().book.includes(uid)) {
                    PostRef.update({
                        "book": firestore.FieldValue.arrayRemove(uid)
                    })
                } else {
                    const name = state.firebase.profile.displayName
                    const photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'book',
                        content: `${name} save your diary, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        name: name,
                        photo: photo,
                        date: Date()
                    });
                    PostRef.update({
                        "book": firestore.FieldValue.arrayUnion(uid)
                    })
                }
            } else {
                PostRef.set({
                    "book": [uid]
                }, { merge: true })
            }
        });
    }
}

export const report = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        const notid = uuidv1();
        const uid = state.firebase.auth.uid

        const PostRef = firestore.collection('diary').doc(id)

        PostRef.get().then(snapshot => {
            if (snapshot.data().report) {
                if (snapshot.data().report.includes(uid)) {
                    PostRef.update({
                        "report": firestore.FieldValue.arrayRemove(uid)
                    })
                } else {
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'report',
                        content: `your diary was reported, ${snapshot.data().title} of ${new Date()}`,
                        read: false,
                        linked: '/diary',
                        date: Date()
                    });
                    PostRef.update({
                        "report": firestore.FieldValue.arrayUnion(uid)
                    })
                }
            } else {
                PostRef.set({
                    "report": [uid]
                }, { merge: true })
            }
        });
    }
}
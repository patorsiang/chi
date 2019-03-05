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
            const userInfo = firebase.functions().httpsCallable('getUser')
            if (result.data.length === 0) {
                return dispatch({ type: 'CHANGE_STATE', S, post: [] })
            }
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
                }).then(() => {return dispatch({ type: 'CHANGE_STATE', S, post: result.data.sort(compare) })}))
            }))
        })
            .catch(error => {return dispatch({ type: 'CHANGE_STATE', S, post: [] })})
        return dispatch({ type: 'CHANGE_STATE', S, post: [] })
    }
}

export const loadPost = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        return dispatch({ type: 'LOAD_POST'})
    }
}

export const signout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const inDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var openRequest = inDB.open('chi_db_book');
        var openRequest2 = inDB.open('chi_db_noti');
        openRequest.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction(['book'], 'readwrite');
            const store = transaction.objectStore('book');
            store.clear();
        }
        openRequest.onerror = function (e) {
            console.log('onerror!');
            console.dir(e);
        };
        openRequest2.onsuccess = function (e) {
            const db = e.target.result;
            const transaction = db.transaction(['noti'], 'readwrite');
            const store = transaction.objectStore('noti');
            store.clear();
        }
        openRequest2.onerror = function (e) {
            console.log('onerror!');
            console.dir(e);
        };
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}


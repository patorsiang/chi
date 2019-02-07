export const initial = () => {
    return (dispatch) => {
        dispatch({ type: 'INITIAL' })
    }
}

export const save = (D) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const user = firebase.auth().currentUser;

        while (D.tag.indexOf("") > -1) {
            D.tag.splice(D.tag.indexOf(""), 1);
        }
        var photoURL = []
        var photoMeta = []
        if (D.files.length > 0) {
            D.files.map((file, i) => {

                var storageRef = firebase.storage().ref(user.uid + "/" + file.name);

                //Upload file
                var task = storageRef.put(file);

                //Update progress bar
                return task.on('state_changed',
                    function progress(snapshot) {

                    },
                    function error(err) {
                        dispatch({ type: 'POSTING_ERROR', err })
                    },
                    function complete() {
                        storageRef.getDownloadURL().then(function (url) {
                            photoURL.push(url);
                            photoMeta.push(file.name);
                            // Add a new document in collection "cities"
                            firestore.collection('diary').doc(D.id).set({
                                writer: user.uid,
                                title: D.title,
                                public: D.public,
                                state: D.state,
                                note: D.note,
                                tag: D.tag,
                                photo: photoURL,
                                date: Date(),
                                like: [],
                                book: [],
                                report: [],
                                meta: photoMeta
                            }).catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                        }).then(() => dispatch({ type: 'POSTING_SUCCESS' }))
                            .catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                    }
                );
            })
        } else {
            firestore.collection('diary').doc(D.id).set({
                writer: user.uid,
                title: D.title,
                public: D.public,
                state: D.state,
                note: D.note,
                tag: D.tag,
                photo: null,
                date: Date(),
                like: [],
                book: [],
                report: [],
                meta: null
            }).then(() => dispatch({ type: 'POSTING_SUCCESS' }))
                .catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
        }
    }
}

export const getDiary = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const allDairy = firebase.functions().httpsCallable('getAllDiary')
        allDairy().then(result => {
            dispatch({ type: 'GET_ALL_DIARY', result: result.data })
        })
            .catch(error => dispatch({ type: 'GET_ALL_DIARY', result: [] }))
    }
}

export const focus = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        console.log(id);
        
        const Dairy = firebase.functions().httpsCallable('getDiary')
        Dairy({ id }).then(result => {
            dispatch({ type: 'GET_DIARY', result: result.data })
        }).catch(error => dispatch({ type: 'GET_DIARY', result: [] }))

    }
}

export const deleteDiary = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const Dairy = firebase.functions().httpsCallable('removeDiary')
        Dairy({ id }).then(result => {
            dispatch({ type: 'ROMOVE_SUCCESS', result: "Document successfully deleted!" })
        }).catch(err => dispatch({ type: 'POSTING_ERROR', err }))
    }
}

export const saveEdit = (diary) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const state = getState()

        console.log(state.diary.diary, diary);
        
    }
}
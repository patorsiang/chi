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
                photo: [],
                date: Date(),
                like: [],
                book: [],
                report: [],
                meta: []
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
            console.log(result.data);
            dispatch({ type: 'ROMOVE_SUCCESS', result: "Document successfully deleted!" })
        }).catch(err => dispatch({ type: 'POSTING_ERROR', err }))
    }
}

export const saveEdit = (diary) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase()
        const state = getState()

        while (diary.tag.indexOf("") > -1) {
            diary.tag.splice(diary.tag.indexOf(""), 1);
        }
        var photoURL = diary.uploaded
        var photoMeta = diary.uploadedfiles

        const user = firebase.auth().currentUser;

        if (state.diary.delete) {
            if (diary.files.length > 0) {
                diary.files.map((file, i) => {

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
                                firestore.collection('diary').doc(diary.id).set({
                                    writer: user.uid,
                                    title: diary.title,
                                    public: diary.public,
                                    state: diary.state,
                                    note: diary.note,
                                    tag: diary.tag,
                                    photo: photoURL,
                                    date: Date(),
                                    meta: photoMeta,
                                    like: [],
                                    book: [],
                                    report: [],
                                }, { merge: true }).catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                            }).then(() => dispatch({ type: 'POSTING_SUCCESS' }))
                                .catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                        }
                    );
                })
            } else {
                firestore.collection('diary').doc(diary.id).set({
                    writer: user.uid,
                    title: diary.title,
                    public: diary.public,
                    state: diary.state,
                    note: diary.note,
                    tag: diary.tag,
                    photo: diary.uploaded,
                    date: Date(),
                    meta: diary.uploadedfiles,
                    like: [],
                    book: [],
                    report: [],
                }).then(() => dispatch({ type: 'EDIT_SUCCESS', result: "success" }))
                    .catch((err) => dispatch({ type: 'EDIT_ERROR', err }))
            }
        } else {
            if (diary.files.length > 0) {
                diary.files.map((file, i) => {

                    if (photoMeta.includes(file.name)) {
                        return false
                    }
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
                                // Add a new document in collection "cities"
                                photoURL.push(url);
                                photoMeta.push(file.name);
                                firestore.collection('diary').doc(diary.id).update({
                                    writer: user.uid,
                                    title: diary.title,
                                    public: diary.public,
                                    state: diary.state,
                                    note: diary.note,
                                    tag: diary.tag,
                                    photo: photoURL,
                                    date: Date(),
                                    meta: photoMeta
                                }).catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                            }).then(() => dispatch({ type: 'POSTING_SUCCESS' }))
                                .catch((err) => dispatch({ type: 'POSTING_ERROR', err }))
                        }
                    );
                })
            } else {
                firestore.collection('diary').doc(diary.id).update({
                    writer: user.uid,
                    title: diary.title,
                    public: diary.public,
                    state: diary.state,
                    note: diary.note,
                    tag: diary.tag,
                    photo: diary.uploaded,
                    date: Date(),
                    meta: diary.uploadedfiles
                }).then(() => dispatch({ type: 'EDIT_SUCCESS', result: "success" }))
                    .catch((err) => dispatch({ type: 'EDIT_ERROR', err }))
            }
        }
    }
}
export function handler(diary) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase()

        while (diary.tag.indexOf("") > -1) {
            diary.tag.splice(diary.tag.indexOf(""), 1);
        }

        var photoURL = new Set(diary.uploaded);
        var photoMeta = new Set(diary.uploadedfiles);

        const user = firebase.auth().currentUser;

        if (diary.delete) {
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
                            dispatch({ type: 'EDIT_ERROR', err })
                        },
                        function complete() {
                            storageRef.getDownloadURL().then(function (url) {
                                photoURL = [...photoURL.add(url)];
                                photoMeta = [...photoMeta.add(file.name)];
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
                                }, { merge: true }).catch((err) => dispatch({ type: 'EDIT_ERROR', err }))
                            }).then(() => dispatch({ type: 'EDIT_SUCCESS', result: "success" }))
                                .catch((err) => dispatch({ type: 'EDIT_ERROR', err }))
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

                    if (photoMeta.has(file.name)) {
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
                                photoURL = [...photoURL.add(url)];
                                photoMeta = [...photoMeta.add(file.name)];

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
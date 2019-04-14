export function handler(D) {
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
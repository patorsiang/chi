import uuidv1 from 'uuid/v1';

export function handler(id) {
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
import uuidv1 from 'uuid/v1';

export function handler(id) {
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
                    const Photo = state.firebase.profile.Photo
                    const notiRef = firestore.collection('notification').doc(notid);
                    notiRef.set({
                        owner: snapshot.data().writer,
                        type: 'like',
                        content: `likes your diary, ${snapshot.data().title}`,
                        read: false,
                        linked: '/diary',
                        participant: {
                            User_UID: uid,
                            displayName: name,
                            Photo: Photo
                        },
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
export function handler(id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('notification').doc(id).update({ read: true })
    }
}
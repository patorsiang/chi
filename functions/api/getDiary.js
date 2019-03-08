const admin = require('firebase-admin');

exports.handler = (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return admin.firestore().collection('diary').doc(data.id).get().then(
        snapshot => {
            if (snapshot.data().writer !== context.auth.uid) {
                return false
            } else {
                return {
                    id: snapshot.id,
                    data: snapshot.data()
                }
            }
        }
    )
}

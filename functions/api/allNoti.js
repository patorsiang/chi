const admin = require('firebase-admin');

exports.handler = (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    return admin.firestore().collection('notification').orderBy("date", "desc").get().then(
        snapshot => {
            return snapshot.docs.filter(doc => {
                if (doc.data().owner.User_UID !== context.auth.uid && !doc.data().read) {
                    return false
                }
                return true
            }).map(
                noti => {
                    return {
                        id: noti.id,
                        data: noti.data()
                    }
                }
            )
        }
    )
}

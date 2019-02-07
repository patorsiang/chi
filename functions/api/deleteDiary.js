const admin = require('firebase-admin');

exports.handler = (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    admin.firestore().collection('diary').doc(data.id).delete().then(() => {
        return "Document successfully deleted!"
    }).catch((error) => {
       return "Error removing document: " + error
    });

}
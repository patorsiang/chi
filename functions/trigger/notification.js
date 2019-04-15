const admin = require('firebase-admin');

exports.handler = (change, context) => {
  // Retrieve the current and previous value
  const data = change.after.data();
  // We'll only update if the name has changed.
  // This is crucial to prevent infinite loops.
  if (typeof data.owner !== "object") {
      admin.firestore().collection('user').doc(data.writer).get().then(writer => {
        return change.after.ref.set({
          owner: {
            User_UID: data.writer,
            displayName: writer.displayName,
            Photo: writer.Photo
          }
        }, {merge: true});
      })
  }
}

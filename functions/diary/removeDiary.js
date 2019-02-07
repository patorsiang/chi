const admin = require('firebase-admin')

exports.handler = (change, context) => {
    // console.log('userid: ', context.params.userID, ' diaryid: ', context.params.diaryID);
    const data = change.after.data();

    if (!data.report.includes('F95sBazTNBW3nJMJFLzPDo2Nocs2')) {
        return null
    }

    return change.after.ref.delete().then( () => {
        return console.log("Document successfully deleted!");
    }).catch((error) => {
        return console.error("Error removing document: ", error);
    });
}
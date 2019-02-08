// deploy: firebase deploy --only functions
// local test: firebase functions:shell
// run serve: firebase serve --only functions
// remove: firebase functions:delete Chi UpdateToken UpdateTokenDiaryActivity modifiedBasicImage addWaterMarkImage callCloudVision callCloudNaturalLanguage UpdateThemeDiaryActivity notifyToken notifyNewUser notificationRemove getAllDiary getDiary removeDiary getAllPost getAllNoti getUser getMetadata getAllBookPost getAllPostByWriter searchUserByName searchPostByTheme searchPostByTag searchPostByState searchPostByTitle searchPostByNote
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.Chi = functions.https.onRequest((request, response) => {
//     response.send("Hello from Chi!");
// });

exports.Chi = functions.https.onCall((request, response) => {
    return 'Hello from Chi!';
});

//update prize
const profileModule = require('./accountsPrize/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userID}').onUpdate(profileModule.handler)

const diaryModule = require('./accountsPrize/diaryActivity')
exports.UpdateTokenDiaryActivity = functions.firestore.document('diary/{diaryID}').onWrite(diaryModule.handler)

//analyze image
const imageDiaryRotateNResizeModule = require('./imageDiary/imageFixBasic')
exports.modifiedBasicImage = functions.storage.object().onFinalize(imageDiaryRotateNResizeModule.handler)

const imageDiaryWaterMarkModule = require('./imageDiary/imageAddWaterMark')
exports.addWaterMarkImage = functions.storage.object().onFinalize(imageDiaryWaterMarkModule.handler)

const callVisionModule = require('./imageDiary/analyzeImage')
exports.callCloudVision = functions.storage.object().onFinalize(callVisionModule.handler)

const callTranslateModule = require('./imageDiary/analyzeTheme')
exports.callCloudNaturalLanguage = functions.storage.object().onFinalize(callTranslateModule.handler)

// analyze and call diary
const diaryThemeModule = require('./diary/themeOfTag')
exports.UpdateThemeDiaryActivity = functions.firestore.document('diary/{diaryID}').onWrite(diaryThemeModule.handler)

const diaryRemoveModule = require('./diary/themeOfTag')
exports.removeDiary = functions.firestore.document('diary/{diaryID}').onWrite(diaryRemoveModule.handler)

// notification
const notificationTokenModule = require('./notification/notificationTokenActivity')
exports.notifyToken = functions.firestore.document('user/{userID}').onUpdate(notificationTokenModule.handler)

const notificationNewUser = require('./notification/notificationNewUser')
exports.notifyNewUser = functions.auth.user().onCreate(notificationNewUser.handler)

const notificationRemoveModule = require('./notification/remove')
exports.notificationRemove = functions.firestore.document('notification/{noitificationID}').onWrite(notificationRemoveModule.handler)

// api
const allDiaryModule = require('./api/allDiary')
exports.getAllDiary = functions.https.onCall(allDiaryModule.handler)

const getDiaryModule = require('./api/getDiary')
exports.getDiary = functions.https.onCall(getDiaryModule.handler)

const removeDiaryModule = require('./api/deleteDiary')
exports.removeDiary = functions.https.onCall(removeDiaryModule.handler)

const allPostModule = require('./api/allPost')
exports.getAllPost = functions.https.onCall(allPostModule.handler)

const allNotiModule = require('./api/allNoti')
exports.getAllNoti = functions.https.onCall(allNotiModule.handler)

const UserModule = require('./api/User')
exports.getUser = functions.https.onCall(UserModule.handler)

const metadataPhotoModule = require('./api/metadata')
exports.getMetadata = functions.https.onCall(metadataPhotoModule.handler)

const allBookPostModule = require('./api/allBookPost')
exports.getAllBookPost = functions.https.onCall(allBookPostModule.handler)

const allPostByWritertModule = require('./api/allPostByWriter')
exports.getAllPostByWriter = functions.https.onCall(allPostByWritertModule.handler)

const userIDByNameModule = require('./api/userIDByName')
exports.searchUserByName = functions.https.onCall(userIDByNameModule.handler)

const searchPostByThemeModule = require('./api/searchPostByTheme')
exports.searchPostByTheme = functions.https.onCall(searchPostByThemeModule.handler)

const searchPostByTagModule = require('./api/searchPostByTag')
exports.searchPostByTag = functions.https.onCall(searchPostByTagModule.handler)

const searchPostByStateModule = require('./api/searchPostByState')
exports.searchPostByState = functions.https.onCall(searchPostByStateModule.handler)

const searchPostByTitleModule = require('./api/searchPostByTitle')
exports.searchPostByTitle = functions.https.onCall(searchPostByTitleModule.handler)

const searchPostByNoteModule = require('./api/searchPostByNote')
exports.searchPostByNote = functions.https.onCall(searchPostByNoteModule.handler)

const searchPostByDateModule = require('./api/searchPostByDate')
exports.searchPostByDate = functions.https.onCall(searchPostByDateModule.handler)

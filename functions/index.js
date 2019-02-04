// deploy: firebase deploy --only functions 
// local test: firebase functions:shell 
// run serve: firebase serve --only functions
// remove: firebase functions:delete Chi UpdateToken UpdateTokenDiaryActivity addWaterMarkImage callCloudVision callCloudNaturalLanguage UpdateThemeDiaryActivity notifyToken notifyNewUser notificationRemove notificationRemove notificationBook notificationReport getAllDiary getAllPost getAllNoti getUser getMetadata getAllBookPost getAllPostByWriter searchUserByName searchPostByTheme searchPostByTag searchPostByState searchPostByTitle searchPostByNote searchPhotoByTheme searchPhotoByTag
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
exports.rotateUsingExif = functions.storage.object().onArchive(imageDiaryRotateNResizeModule.handler)

const imageDiaryWaterMarkModule = require('./imageDiary/imageAddWaterMark')
exports.addWaterMarkImage = functions.storage.object().onFinalize(imageDiaryWaterMarkModule.handler)

const callVisionModule = require('./imageDiary/analyzeImage')
exports.callCloudVision = functions.storage.object().onFinalize(callVisionModule.handler)

const callTranslateModule = require('./imageDiary/analyzeTheme')
exports.callCloudNaturalLanguage = functions.storage.object().onFinalize(callTranslateModule.handler)

// analyze and call diary
const diaryThemeModule = require('./diary/themeOfTag')
exports.UpdateThemeDiaryActivity = functions.firestore.document('diary/{diaryID}').onWrite(diaryThemeModule.handler)

// notification
const notificationTokenModule = require('./notification/notificationTokenActivity')
exports.notifyToken = functions.firestore.document('user/{userID}').onUpdate(notificationTokenModule.handler)

const notificationNewUser = require('./notification/notificationNewUser')
exports.notifyNewUser = functions.auth.user().onCreate(notificationNewUser.handler)

const notificationRemoveModule = require('./notification/remove')
exports.notificationRemove = functions.firestore.document('noitification/{noitificationID}').onUpdate(notificationRemoveModule.handler)

const notificationLikeModule = require('./notification/like')
exports.notificationLike = functions.firestore.document('diary/{diaryID}').onUpdate(notificationLikeModule.handler)

const notificationBookModule = require('./notification/book')
exports.notificationBook = functions.firestore.document('diary/{diaryID}').onUpdate(notificationBookModule.handler)

const notificationReportModule = require('./notification/report')
exports.notificationReport = functions.firestore.document('diary/{diaryID}').onUpdate(notificationReportModule.handler)

// api 
const allDiaryModule = require('./api/allDiary')
exports.getAllDiary = functions.https.onCall(allDiaryModule.handler)

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

const searchPhotoByThemeModule = require('./api/searchPhotoByTheme')
exports.searchPhotoByTheme = functions.https.onCall(searchPhotoByThemeModule.handler)

const searchPhotoByTagModule = require('./api/searchPhotoByTag')
exports.searchPhotoByTag = functions.https.onCall(searchPhotoByTagModule.handler)
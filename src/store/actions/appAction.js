const changeStateModule = require('./changeState')
export const changeState = changeStateModule.handler

const loadPostModule = require('./loadPost')
export const loadPost = loadPostModule.handler

const searchByStateModule = require('./searchByState')
export const searchByState = searchByStateModule.handler

const searchByTagModule = require('./searchByTag')
export const searchByTag = searchByTagModule.handler

const searchByThemeModule = require('./searchByTheme')
export const searchByTheme = searchByThemeModule.handler

const likeModule = require('./like')
export const like = likeModule.handler

const bookModule = require('./book')
export const book = bookModule.handler

const getDiaryModule = require('./getDiary')
export const getDiary = getDiaryModule.handler

const focusADiaryModule = require('./focusADiary')
export const focusADiary = focusADiaryModule.handler

const getBookModule = require('./getBook')
export const getBook = getBookModule.handler

const reportModule = require('./report')
export const report = reportModule.handler 

const signinwithfbModule = require('./signinwithfb')
export const signinwithfb = signinwithfbModule.handler

const SigninByEmailNPWDModule = require('./SigninByEmailNPWD')
export const SigninByEmailNPWD = SigninByEmailNPWDModule.handler

const registerModule = require('./register')
export const register = registerModule.handler

const updateNameEmailDOBModule = require('./updateNameEmailDOB')
export const updateNameEmailDOB = updateNameEmailDOBModule.handler

const updatePWDModule = require('./updatePWD')
export const updatePWD = updatePWDModule

const updateProImgModule = require('./updateProImg')
export const updateProImg = updateProImgModule.handler

const getnotiModule = require('./getnoti')
export const getnoti = getnotiModule.handler

const checkReadModule = require('./checkRead')
export const checkRead = checkReadModule.handler

const saveModule = require('./save')
export const save = saveModule.handler

const deleteDiaryModule = require('./deleteDiary')
export const deleteDiary = deleteDiaryModule.handler

const saveEditModule = require('./saveEdit')
export const saveEdit = saveEditModule.handler

const signoutModule = require('./signout')
export const signout = signoutModule.handler
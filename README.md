<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->

# CHI
CHI is a progressive web application which can be shown in a web browser, mobile phone, and other devices; moreover, it can use in offline mode. The purpose of this application is to create the channel for knowledge exchange and educate people about the cultural heritage of India. This project is cooperate between the two fuculties at mahidol university, Information and Communication Technology (ICT) faculty and Institute for Languages and Cultures of Asia or (RILCA), Bharat Center.

## Getting Started
try on https://app-chi.firebaseapp.com

## Built With
Reactjs - the structure of front-end as operated by javascript, and it will render HTML and CSS
Redux - the middle between the front-end and the back-end (server)
Nodejs - as the server in Firebase Cloud Functions

## Path Explanation
|           path           |                                            Explanation                                                     |
|           :---:          |                                                :---                                                        |
|functions                 | to contain files which are used in CHI server or firebase cloud function                                   |
|functions/accountsPrize   | to contain files used in CHI server for increasing the token to whose diary object or user info object     |
|functions/api             | to contain files which CHI front-end can call to use in the purpose                                        |
|functions/diary           | to contain files which is the diary collection trigger                                                     |
|functions/imageDiary      | to contain files take the image in storage to analyze in Google api                                        |
|functions/notification    | to contain files which create and delete the notification object                                           |
|functions/trigger         | to contain files that fixed the weak point in each collection in firesotre                                 |
|public                    | to contain files that is the base of the website                                                           |
|src/assets                | to contain the image file or another resource                                                              |
|src/components            | to contain the component code in front-end page                                                            |
|src/components/diary      | to contain the component in diary page                                                                     |
|src/components/feed       | to contain the component in feed page                                                                      |
|src/components/inup       | to contain the component in sign in and sign up page                                                       |
|src/components/map        | to contain the component in map page                                                                       |
|src/components/notify     | to contain the component in notification page                                                              |
|src/configs               | to contain file which is for the config to the server                                                      |
|src/layouts               | to contain component of layout for CHI application                                                         |
|src/models                | to contain the file show the model of the data such all name of the state                                  |
|src/store                 | the redux functions which is the middle                                                                    |
|src/store/actions         | the redux functions which is the middle be the action to recieve the data from front and back              |
|src/store/reducers        | the redux functions which is the middle be the action to set the data from action to front                 |
|src/views                 | to contain the full page which is call the component of the page                                           |
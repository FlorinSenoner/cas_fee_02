# CAS FEE // Project 2

## 🔥 What's hot
#### Progressive Web App
Wettemer🄬 was developed **mobile first** with a fluid design. It updates **real-time** without you having to reload the site even once. 
Most features that Wettemer🄬 offers are also available **offline**.

#### Latest and newest front end technology
* The latest and fastest ReactJS 16.2
* MaterialUI next
* Not a single line of CSS. It's pure JS.
* Using latest JavaScript features thanks to Babel

## ☔ What's not
* Using beta software (Firestore, Firebase Functions, Material UI, Puppeteer) took a lot of time and effort. Even though we learned a lot :)
* React is awesome and fun, but there are too many add-on libraries to choose from. That takes a lot of time just for research.
* During the CAS FEE only little practical knowledge on how to build **real react apps** (not counters) was given.
* Real-time and offline is awesome. But there's no such thing as a free lunch -> `devtime++`
* We are no designers

## 🤓 Demo
http://wettemer.com

## 💻 Browser Support
Wettemer was tested on all major browsers:
* Google Chrome
* Firefox
* Safari
* Edge
* Internet Explorer

## 👩‍💻 User Testing
### Overview
* **Head of Test:** Dennis Briner
* **Date of Tests:** 13.04.2018 - 16.04.2018
* **Test Object:** Wettemer.com as a platform
* **Business Case:** We want to see if the app is intuitive, user friend and fun
* **Main Objectives:** Test persons have to be able to use the app as intended without any instructions
* **Tester:** Choosen were people from our private environment. Three testers were recruited, two female one male.
* **Equipment:** The testers mobile phone (two iOS, one Android Device)
* **Task:** On purpouse, no specific task was given. Just the URL with the words "go ahead and check it out".
![user testing](http://res.cloudinary.com/duhriq6qo/image/upload/c_scale,h_680/v1523910289/user_testing.jpg)

### Positive Results
* the app is almost self explaining and very intuitive
* they liked the app and thought it's fun
* offline and real time features impressed

### Room for Improvement
* more features were requested
* the determination who has won a bet should be improved
* adding users is hart, cause the exact email has to be entered
* add button not always perfectly visible on mobile browser
* make it an app (by adding site to home screen) should be more advertised

## 🚀 Setup

### Development

#### Prerequisites
* npm > 5 https://www.npmjs.com/get-npm
* yarn > 1.4.0 `npm i yarn -g`
* create-react-app > 1.5 `npm i create-react-app -g`

#### run
* `yarn install` to install all dependencies
* `yarn start`  to start app on http://localhost:3000

#### test
------------------|-----------
`test`|run all tests.
`test:components`|start component tests.
`test:e2e`|start e2e tests.
`test:e2eDebug`|start e2e tests in debug mode (opens browser window and dev console).
`test:pixel`|start screenshot tests.
`test:redux`|test redux actions.

### Deployment

#### Prerequisites
* Wettemer🄬 Authorized Google Account
* firebase-tools > 3.18 `npm i firebase-tools -g`

#### deploy firebase functions
* `cd functions`
* `npm i`

#### run
* `yarn deploy` to build and deploy

## 🗄 Documents
* 🌈 [About](./docs/about.md)
* 💔 [Known Issues](./docs/known-issues.md)
* 📝 [Changelog](./docs/changelog.md)
* 🗂 [Folder Structure](./docs/folder-structure.md)
* 🗺 [Road Map](./docs/road-map.md)
* 🛠 [Tooling](./docs/tooling.md)

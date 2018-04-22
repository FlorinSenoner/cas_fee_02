# 🗂 Folder Structure

## build
* build folder that get's deployed

## docs
* documentation folder

## functions
* firebase functions that will run on the backend side

## public
* all content that will be served static

#### img
* images
* logos

## testImages
* folder that contains images for the pixel/screenShot tests

## src
* all js code for the app

#### components
* reusable components that are used on multiple screens
* the \_\_tests\_\_ folder contains all tests for the specific component 

#### screens
* each screen represents a main route of the app.
* screens may contain components as well, but only, if they're just used for that particular screen 
* the \_\_tests\_\_ folder contains all tests for the specific screen

#### services
* connections to firebase backend

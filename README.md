# Geospatial Data Explorer Web Application

DEMO: https://hassantayyab.github.io/geospatial-data-explorer/

## Description

I have used a simple React library along with Axios for API calls, typescript for strict typing, and mini.css for basic styling.

The reason for using React was because the application was a very simple single-page app with very basic functionality. Any other framework such as Angular would have been an overkill for this since it comes with a lot of other dependencies that would not have been used and would have grown the size of the application for no reason.

This also gave me a chance to delve into react and refresh my concepts about it. I also had the opportunity to use typescript with React which was also something new for me. This way I got to work on this project while also learning along the way.

### How to run the project?

To start the project with working Google Maps please add a valid Google API key directly in code in the file `./src/Map/index.tsx` or create a `.env` file as follows:

```
// .env

REACT_APP_GOOGLE_API_KEY=google_api_key
```

To start the project please run the following command, in order, in the project directory:

#### `yarn install && yarn start`

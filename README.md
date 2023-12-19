# Task for Frontend Developer Postion

Project: Geospatial Data Explorer Web Application

## Description

I have used simple React library along with axios for api calls, typescript for strict typing, and mini.css for basic styling.

The reason for using react was because the application was a very simple single page app with very basic functionality. Any other framework such as Angular would have been an overkill for this since it comes with a lot of other dependencies that would not have been used and would have grown the size of application for no reason.

This also gave me a chance to delve into react and refresh my concepts about it. I also had the opportunity to use typescript with react whcih was also something new for me. This wasy I got to work on this project while also learning along the way.

### How to run the project?

To start the project with working google maps please add a valid google api key directly in code in file `./src/Map/index.tsx` or create a `.env` file as follows:

```
// .env

REACT_APP_GOOGLE_API_KEY=google_api_key
```

To start he project please run the following command, in order, in the project directory:

#### `yarn install && yarn start`

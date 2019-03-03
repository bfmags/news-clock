# News Clock API 2 CasparCG

This app connects to a CasparCG Server and allows to control the visibility of the clock on the
lower thirds strap. It will also automatically update the clock every minute.

It relies on [SuperFlyTV casparcg-connection](https://github.com/SuperFlyTV/casparcg-connection) to send ACMP commands to the CasparCG Server.

**Configuration**

Configuration for the casparcg server address and port, across different environments, can be accessed in the root of the project config.json file.


## Installing

Install dependencies
`npm i`

Serve the app at localhost:8080
`npm start`

## Test

Test the app
`npm run test`

## Docker

Building the image
`docker build -t bfmags/news-clock .`

Run the image
`docker run -p 8080:8080 -d bfmags/news-clock`

Access the app
`curl -i localhost:8080`

## API

- Animate the clock in
`localhost:8080/news_clock/on`

- Animate the clock out
`localhost:8080/news_clock/off`
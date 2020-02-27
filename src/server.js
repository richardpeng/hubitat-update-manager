// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

module.exports = function (dev) {
  const app = next({
    dev,
    dir: `${path.relative(process.cwd(), __dirname)}/../`
  })
  const handle = app.getRequestHandler()

  return app.prepare().then(() => {
    return createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    }).listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
}

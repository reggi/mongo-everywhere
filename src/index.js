import express from 'express'
import session from 'express-session'
import expressMongodb from 'express-mongo-db'
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo(session)

export default (uri, secret, resave = true, saveUninitialized = false) => {
  var router = express.Router()
  // set express mongo allows for req.db
  router.use(expressMongodb(uri))
  // set mongo db session
  router.use((req, res, next) => {
    return session({
      secret: secret,
      store: new MongoStore({db: req.db}),
      resave: resave,
      saveUninitialized: saveUninitialized
    })(req, res, next)
  })
  return router
}

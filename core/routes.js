const express =  require('express')

const routes = express.Router()

const Usercontroller = require('./controllers/UserController')
const GameController = require('./controllers/GameController')
const GameModecontroller = require('./controllers/GameModeController')
const MatchController = require('./controllers/MatchController')


routes.get('/', (req, res) => {
    return res.json('Hello World!!')
})

routes.post('/user', Usercontroller.create)
routes.get('/user', Usercontroller.list)
routes.delete('/user/:user_id', Usercontroller.delete)

routes.post('/game/:mode_id', GameController.create)
routes.get('/game', GameController.list)
routes.delete('/game/:game_id', GameController.delete)
routes.get('/game/queue/:game_id', GameController.queue)
routes.post('/game/queue/:game_id/:user_id', GameController.store)
routes.delete('/game/queue/:game_id/:user_id', GameController.left_queue)

routes.post('/mode', GameModecontroller.create)
routes.get('/mode', GameModecontroller.list)
routes.put('/mode/:mode_id', GameModecontroller.update)
routes.delete('/mode/:mode_id', GameModecontroller.delete)


routes.put('/match/:game_id/:user_id/:mode_id', MatchController.into_match )


module.exports = routes
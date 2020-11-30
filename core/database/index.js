const Sequelize = require('sequelize')
const dbconfig = require('../config/dbconfig')
const User  = require('../models/User')
const Game = require('../models/Game')
const Mode = require('../models/Mode')

const connection = new Sequelize(dbconfig)

User.init(connection)
Game.init(connection)
Mode.init(connection)

User.associate(connection.models)
Game.associate(connection.models)
Mode.associate(connection.models)

module.exports = connection
const Game = require('../models/Game')
const Mode = require('../models/Mode')
const User = require('../models/User')

module.exports = {

    async create(req, res) {
        const { mode_id } = req.params
        const { nm_name, nm_path } = req.body


        const mode = await Mode.findByPk(mode_id)

        if (!mode)
            return res.status(404).json({ error: 'Mode not created yet' })

        const game = await Game.create({ nm_name, nm_path })

        await game.addMode(mode)

        return res.json(game)

    },



    async list(req, res) {
        const game = await Game.findAll({
            include: [
                { association: 'modes', attributes: ['id', 'qt_user', 'nm_mode'], through: {attributes: []}, }
            ]
        })

        return res.json(game)
    },

    async delete(req, res) {
        const { game_id } = req.params

        const game = await Game.findByPk(game_id)

        if (!game) return res.status(404).json({ error: 'Game not found!' })

        await Game.destroy({
            where: {
                id: game.id
            }
        })

        return res.json(game)
    },

    async queue(req, res) {
        const { game_id } = req.params

        const game = await Game.findByPk(game_id, {
            attributes: ['id', 'nm_name', 'nm_path'],
            include: [
                { association: 'modes', attributes: ['id', 'nm_mode', 'qt_user'], through: { attributes: [] } },
                { association: 'users', attributes: ['id', 'nm_name', 'nm_path', 'in_match'], through: { attributes: [] } }
            ]

        })

        if (!game) return res.status(404).json({ error: 'Game not found!' })

        return res.json(game)
    },

    async store(req, res) {
        const { user_id, game_id } = req.params

        const game = await Game.findByPk(game_id)
        const user = await User.findByPk(user_id)

        if (!user || !game)
            return res.status(404).json({ error: 'User or game not found' })

        await game.addUser(user)

        return res.json(user)

    },

    async left_queue(req, res) {
        const {  game_id, user_id } = req.params

        const game = await Game.findByPk(game_id)
        const user = await User.findByPk(user_id)

        if (!user || !game)
            return res.status(404).json({ error: 'User or game not found' })

        await game.removeUser(user)

        await user.update({in_match: false})

        return res.json(user)
    }
}
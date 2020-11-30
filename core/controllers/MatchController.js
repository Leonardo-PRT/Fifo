const Game = require('../models/Game')
const User = require('../models/User')
const Mode = require('../models/Mode')

module.exports = {

    async into_match(req, res) {
        const { user_id, game_id, mode_id } = req.params

        const user = await User.findByPk(user_id)
        const game = await Game.findByPk(game_id, {
            attributes: [ 'id'],
            include: [
                {association: 'modes', where: {
                    created: true
                }}
            ]
        })
        const mode = await Mode.findByPk(mode_id,{
            attributes: ['id', 'qt_user', 'nm_mode'],
            include: [
                {
                    association: 'games', where: {
                        id: game_id
                    }
                }
            ]
        })

        console.log(mode_id)

        const total_users = await game.countUsers({
            where: {
                in_match: true
            }
        })

        if (!game || !user)
            return res.status(404).json({ error: 'Game or user not found' })

        if (total_users >= mode.qt_user)
            return res.status(400).json({ error: 'Match is full' })


        console.log(mode.qt_user)
        await user.update({ in_match: true })

        return res.json(user)

    }

}
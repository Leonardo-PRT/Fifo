const Game = require('../models/Game')
const Mode = require('../models/Mode')

module.exports = {
    async create(req, res) {
        const { qt_user, nm_mode } = req.body
        const mode = await Mode.create({qt_user, nm_mode})

        await mode.update({ created: true })

        return res.json(mode)

    },

    async list(req, res) {
        const mode = await Mode.findAll()

        
        return res.json(mode)
    },

    async update(req, res) {
        const {mode_id} = req.params
        const {qt_user, nm_mode} = req.body

        const mode = await Mode.findByPk(mode_id)

        if(!mode) return res.status(404).json({error: 'Mode not found!' })

        await mode.update({qt_user, nm_mode})

        return res.json(mode)
    },

    async delete(req, res) {
        const { mode_id } = req.params

        const mode = await Mode.findByPk(mode_id)

        if(!mode) return res.status(404).json({error: 'Mode not found!' })

        await Mode.destroy({
            where: {
                id: mode.id
            }
        })

        return res.json(mode)
    },

 }
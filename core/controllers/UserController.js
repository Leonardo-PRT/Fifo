const User = require('../models/User')

module.exports = {
    async create(req, res) {
        const  { nm_name,  nm_path, cd_email } = req.body
        const user = await User.create({ nm_name,  nm_path, cd_email })

        return res.json(user)
    },

    async list(req, res){
        const user = await User.findAll()

        if(!user) return res.status(404).json({error: 'User not found!' })

        return res.json(user)
    },

    async delete(req, res) {
        const { user_id } = req.params

        const user = await User.findByPk(user_id)

        if(!user) return res.status(404).json({error: 'User not found!' })

        await User.destroy({
            where: {
                id: user.id
            }
        })

        return res.json(user)
    }
}

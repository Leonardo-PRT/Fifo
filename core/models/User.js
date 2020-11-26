const {Model, DataTypes} = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            nm_name: DataTypes.STRING,
            in_match: DataTypes.STRING,
            nm_path: DataTypes.STRING,
            cd_email: DataTypes.STRING,

         }, {
            sequelize
         })
    }

    static associate(models) {
        this.belongsToMany(models.Game, {
            foreignKey: "user_id",
            through: 'order_game_users',
            as: "games"
        })
    }
}

module.exports = User
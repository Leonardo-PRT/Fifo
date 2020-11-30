const {Model, DataTypes} = require('sequelize')

class Game extends Model {
    static init(sequelize) {
        super.init({
            nm_name: DataTypes.STRING,
            nm_path: DataTypes.STRING
        }, {
            sequelize,
            tableName: "games"
        })

    }

    static associate(models) {
        this.belongsToMany(models.Mode, {
            foreignKey: "game_id",
            through: 'order_game_modes',
            as: "modes"
        })

        this.belongsToMany(models.User, {
            foreignKey: "game_id",
            through: 'order_game_users',
            as: "users"
        })
        
    }

}

module.exports = Game
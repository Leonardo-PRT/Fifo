const {Model, DataTypes} = require('sequelize')

class Mode extends Model {
    static init(sequelize) {
        super.init({
            qt_user: DataTypes.INTEGER,
            nm_mode: DataTypes.STRING,
            created: DataTypes.BOOLEAN
        }, {
            sequelize,
            tableName: "modes"
        })

    }

    static associate(models) {

        this.belongsToMany(models.Game, {
            foreignKey: "mode_id",
            through: 'order_game_modes',
            as: "games"
        })
    }

}

module.exports = Mode

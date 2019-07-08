const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres://andrew:password@localhost:5432/andrew-db2'

const sequelize = new Sequelize(databaseUrl, {define: {timestamps: false}})

sequelize
    .sync()
    .then(() => {
        console.log('Database schema updated')
        
    })
    .catch(console.error)

module.exports = sequelize
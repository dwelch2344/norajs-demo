const nora = require('norajs')
const massive = require('massive');

class Config extends nora.Configuration {

  async preConfigure(server, config, idx){   
    const db = await massive({
      host: '127.0.0.1',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      // password: ''
    })    
    server.named.db = db
    this.logger.info('Database configured')
  }
}

module.exports = new Config()
const nora = require('norajs')
class DummyService extends nora.Service {

  configure(server){
    this.logger.info('Configured!')
    this.db = server.named.db
  }

  async doSomething(){
    let result = await this.db.run('select 1 as id')
    return result[0]
  }
}

module.exports = new DummyService()
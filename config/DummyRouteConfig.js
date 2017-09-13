const nora = require('norajs')
class DummyRouter extends nora.Configuration {

  postConfigure(server, config, idx){   
    const { DummyService } = server.named

    const router = nora.Router()
    router.get('/', async (req, res, next) => {
      const result = await DummyService.doSomething()
      res.send({name: 'Jimbo Jones', message: result })
    })

    router.get('/error', async (req, res, next) => {
      throw new Error('We blew up!')
    })

    server.app.use('/dummy', router)
  }
}

module.exports = new DummyRouter()
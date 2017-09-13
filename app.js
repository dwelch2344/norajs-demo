const AppServer = require('./server')
const server = new AppServer()
server.start()
server.logger.info('Listening on', server.config.port)
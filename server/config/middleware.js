var morgan = require('morgan'); // express morgan, used for logging incoming request
var bodyParser = require('body-parser'); // express bodyParser, parses the body of incoming requests
var helpers = require('./helpers.js'); // error logging middleware


module.exports = function (app, express) {
// create flashcard category tag and flashcard question sub routers
  var tagRouter = express.Router();
  var questionRouter = express.Router();

  // logger using express morgan
  app.use(morgan('dev'));
  // parse forms using express bodyParser (not implemented yet)
  app.use(bodyParser.urlencoded({extended: true}));
  // parse JSON (uniform resource locators) using express bodyParser
  app.use(bodyParser.json());
  // serve static files
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/tags', tagRouter); // use tag router for all tag requests

  app.use('/api/questions', questionRouter); // question router for question requests
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject sub routers into their respective route files
  require('../tags/tagRoutes.js')(tagRouter);
  require('../questions/questionRoutes.js')(questionRouter);
};

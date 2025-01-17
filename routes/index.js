const auth = require('../controller/auth');
class RouteFactory {
    constructor() {}
    initialize(app, db) {
        app.use('/api/v0.1/', (req, res, next)=>{
            switch(req.path) {
                case '/signin':
                case '/signup':
                case '/password':
                    next();
                break;
                default:
                    if(!auth.isSessionValid(req.get('sid'))) {
                        res.status(401).json({ message: 'Auth failed - Session is invalid or user has logged out.'});
                    }
                    else {
                        next();
                    }
                break;
            }
        });
        app.use('/api/v0.1/:tid/albums/', require('./albums'));
        app.use('/api/v0.1/:tid/comments/', require('./comments'));
        app.use('/api/v0.1/:tid/feed/', require('./feed'));
        app.use('/api/v0.1/:tid/media/', require('./media'));
        app.use('/api/v0.1/:tid/moments', require('./moments'));
        app.use('/api/v0.1/:tid/people/', require('./people'));
        app.use('/api/v0.1/:tid/reactions/', require('./reactions'));
        app.use('/api/v0.1/trees/', require('./trees'));
        app.use('/api/v0.1/signup/', require('./signup'));
        app.use(function(req, res, next) {
            res.status(404).json({ message: "Aarg! no man's land" });
        });
    }
}
module.exports = new RouteFactory();
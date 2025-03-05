const userRouter = require('../routes/User');
const courseRouter = require('../routes/Course');
const progressRouter = require('../routes/Progress');


const routes = (app) => {

   app.use('/api/user',userRouter)
   app.use('/api/course',courseRouter)
   app.use('/api/progress',progressRouter)
}
module.exports = routes;
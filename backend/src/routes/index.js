const userRouter = require('../routes/User');
const courseRouter = require('../routes/Course');


const routes = (app) => {

   app.use('/api/user',userRouter)
   app.use('/api/course',courseRouter)
}
module.exports = routes;
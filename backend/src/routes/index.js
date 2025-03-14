const userRouter = require('../routes/User');
const courseRouter = require('../routes/Course');
const progressRouter = require('../routes/Progress');
const categoryRouter = require('../routes/Category');
const enrollRouter = require('../routes/Enroll');


const routes = (app) => {

   app.use('/api/user',userRouter)
   app.use('/api/course',courseRouter)
   app.use('/api/progress',progressRouter)
   app.use('/api/category',categoryRouter)
   app.use('/api/enroll',enrollRouter)
}
module.exports = routes;
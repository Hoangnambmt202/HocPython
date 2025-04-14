const userRouter = require('../routes/User');
const courseRouter = require('../routes/Course');
const categoryRouter = require('../routes/Category');
const enrollRouter = require('../routes/Enroll');
const chapterRouter = require('../routes/Chapter');
const lessonRouter = require('../routes/Lesson');
const quizRouter = require('../routes/Quiz');
const progressRouter = require('../routes/Progress');
const notificationRoutes = require('../routes/Notification');
const routes = (app) => {

   app.use('/api/user',userRouter)
   app.use('/api/course',courseRouter)
   app.use('/api/progress',progressRouter)
   app.use('/api/category',categoryRouter)
   app.use('/api/enroll',enrollRouter)
   app.use('/api/chapters',chapterRouter)
   app.use('/api/lessons',lessonRouter)
   app.use('/api/quiz',quizRouter)
   app.use('/api/notifications', notificationRoutes);
}
module.exports = routes;
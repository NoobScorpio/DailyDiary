// const classcontroller=require('../controllers/class');
// const teachercontroller=require('../controllers/teacher');
// const parentcontroller=require('../controllers/parent');
// const studentcontroller=require('../controllers/student');
const logincontroller=require('../controllers/login');
const usercontroller=require('../controllers/user');
const initendpoints=(app)=>
{
   

    /** App Starting Route */
    app.get('/', (req, res) => {
        res.send('API is Working');
    });


    // /** Classes Route */
    //  app.use('/classes/',classcontroller);
    //  /** Teachers Route */
    //  app.use('/teachers/',teachercontroller);
    //  /** Parents Route */
    //  app.use('/parents/',parentcontroller);
    //  /** Students Route */
    //  app.use('/students/',studentcontroller);
    //  /** Login Route */
     app.use('/login/',logincontroller);
      /** Login Route */
      app.use('/users/',usercontroller);
}

module.exports=initendpoints;
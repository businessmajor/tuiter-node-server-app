import users from './users.js'
let userData = users

const UserController = (app) => {
   app.get('/api/users', findUsers)
   app.get('/api/users/:uid', findUserById);
   app.post('/api/users', createUser);
   app.delete('/api/users/:uid', deleteUser);
   app.put('/api/users/:uid', updateUser);
}

const findUsers = (req, res) => {
   const type = req.query.type
   if (type) {
      const usersOfType = userData
         .filter(u => u.type === type)
      res.json(usersOfType)
      return
   }
   res.json(userData)
}

const findUserById = (req, res) => {
   const userId = req.params.uid;
   const user = userData
      .find(u => u._id === userId);
   res.json(user);
}

const createUser = (req, res) => {
   const newUser = req.body;
   newUser._id = (new Date()).getTime() + '';
   userData.push(newUser);
   res.json(newUser);
}

const deleteUser = (req, res) => {
   const userId = req.params['uid'];
   userData = userData.filter(usr => usr._id !== userId);
   res.sendStatus(200);
 }

 const updateUser = (req, res) => {
   const userId = req.params['uid'];
   const updates = req.body;
   userData = userData.map((usr) =>
     usr._id === userId ?
       {...usr, ...updates} :
       usr
   );
   res.sendStatus(200);
  }


export default UserController
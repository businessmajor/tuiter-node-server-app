const UserController = (app) => {
  app.get('/api/users', findUsers);
  app.get('/api/users/:uid', findUserById);
  app.post('/api/users', createUser);
  app.delete('/api/users/:uid', deleteUser);
  app.put('/api/users/:uid', updateUser);
};

let users = [];

const findUsers = (req, res) => {
  res.json(users);
};

const findUserById = (req, res) => {
  const userId = req.params.uid;
  const user = users.find((usr) => usr._id === userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const createUser = (req, res) => {
  const newUser = req.body;
  newUser._id = (new Date()).getTime().toString();
  users.push(newUser);
  res.json(newUser);
};

const deleteUser = (req, res) => {
  const userId = req.params.uid;
  users = users.filter((usr) => usr._id !== userId);
  res.sendStatus(200);
};

const updateUser = (req, res) => {
  const userId = req.params.uid;
  const updates = req.body;
  users = users.map((usr) =>
    usr._id === userId ? { ...usr, ...updates } : usr
  );
  res.sendStatus(200);
};

export default UserController;

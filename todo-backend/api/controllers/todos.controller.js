const Todo = require("../../todo.model");

const addT = async (todoReceived) => {
  const newtodo = new Todo(todoReceived);
  await newtodo.save();
  return newtodo;
};

//deletedAt
const updateDeletionStatus = async (id, deletedAt) => {
  await Todo.findByIdAndUpdate(id, {
    $set: { deletedAt: deletedAt },
  });
};

const updateDescription = async (id, description) => {
  return await Todo.findByIdAndUpdate(id, {
    $set: { todoDescription: description },
  });
};

const updateStatus = async (id, completedStatus) => {
  return await Todo.findByIdAndUpdate(id, {
    $set: { completed: completedStatus },
  });
};

const deleteTodo = async (req, res) => {
  console.log("in deletion at backend: id is :", req.body._id);
  console.log("Deletion status is this", req.body.deletedAt);
  res.send(await updateDeletionStatus(req.body._id, req.body.deletedAt));
};
const get = async ({ filterVal, sort_by, limit, page }) => {
  console.log(`F"${filterVal} S"${sort_by} L"${limit} P"${page}`);
  if (filterVal === "All") {
    try {
      const totalItems = await Todo.countDocuments();
      console.log("TOTAL ITEMS********** = ", totalItems, "^^^^^^");
      const totalPages = Math.ceil(totalItems / limit);
      const todos = await Todo.find()
        .sort({ [sort_by]: -1 })
        .skip((page - 1) * limit) // Skip previous pages
        .limit(limit) // Limit results per page
        .exec();
      return { todos: todos, totalPages: totalPages };
    } catch (err) {
      console.error(err);
    }
  } else if (filterVal === "Active") {
    const totalItems = await Todo.countDocuments({ deletedAt: "N/A" });
    const totalPages = Math.ceil(totalItems / limit);
    const todos = await Todo.find({ deletedAt: "N/A" })
      .sort({ [sort_by]: -1 })
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit) // Limit results per page
      .exec();
    return { todos: todos, totalPages: totalPages };
  } else if (filterVal === "Deleted") {
    const totalItems = await Todo.countDocuments({
      deletedAt: { $ne: "N/A" },
    });
    const totalPages = Math.ceil(totalItems / limit);
    const todos = await Todo.find({ deletedAt: { $ne: "N/A" } })
      .sort({ [sort_by]: -1 })
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit) // Limit results per page
      .exec();
    return { todos: todos, totalPages: totalPages };
  }
};
const getAll = async (req, res, next) => {
  const validFilters = ["All", "Active", "Deleted"];
  const filtervalue = req.query.filterVal;
  console.log("filter Value before", filtervalue);
  if (!validFilters.includes(filtervalue)) {
    console.log("entering valid check");
    return res.status(400).json({
      error: "Bad Request",
      message:
        'The "term" query parameter is required and cannot be null or empty.',
    });
  }
  try {
    console.log("filterValue", filtervalue);
    const response = await get(req.query);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    // Pass the error to the global error handler
    next(error);
  }
};
const post = async (req, res) => {
  console.log("obj received at post", req.body);
  const newTodo = await addT(req.body);
  console.log("In Post: Object Received: ", newTodo);
  res.status(200).send(newTodo);
};
const update = async (req, res) => {
  console.log("whole Obj: ", req.body);
  await updateDescription(req.body._id, req.body.description);
  await updateStatus(req.body._id, req.body.completed);
  console.log("post done");
  res.send({ message: `Done!!!` });
};

module.exports = {
  getAll,
  update,
  post,
  deleteTodo,
};

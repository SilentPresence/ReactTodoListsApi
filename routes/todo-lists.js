const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { sanitize, check, validationResult } = require('express-validator');
const TodoList = require('../models/TodoList');
const sanitizerHandlers = [
  sanitize('title')
    .customSanitizer(input => {
      if (input) {
        return input.replace(/\s\s+/g, ' ');
      }
      return input;
    })
    .trim()
    .escape()
    .stripLow(),
  sanitize('items.*.todo')
    .customSanitizer(input => {
      if (input) {
        return input.replace(/\s\s+/g, ' ');
      }
      return input;
    })
    .trim()
    .escape()
    .stripLow()
];
const commonValidationHandlers = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('items', 'List must have items').isArray({ min: 1 }),
  check('items.*.todo', 'Todo item cannot be empty')
    .not()
    .isEmpty(),
  check('items', 'There are duplicate todo items').custom(async input => {
    const todosCounts = input
      .map(x => x.todo)
      .reduce((todoCount, todo) => {
        const count = todoCount[todo] || 0;
        todoCount[todo] = count + 1;
        return todoCount;
      }, {});
    const keys = Object.keys(todosCounts);
    for (const key of keys) {
      if (todosCounts[key] > 1) {
        return Promise.reject();
      }
    }
  })
];
const addValidationHandlers = [
  check('title', 'There is already a list with this title').custom(
    async input => {
      const todoList = await TodoList.find({
        title: input
      });
      if (todoList.length > 0) {
        return Promise.reject();
      }
    }
  )
];
const updateValidationHandlers = [
  check('title', 'There is already a list with this title').custom(
    async (input, { req }) => {
      const todoList = await TodoList.find({
        title: input,
        _id: { $ne: req.params.id }
      });
      if (todoList.length > 0) {
        return Promise.reject();
      }
    }
  )
];
// // @route GET api/todo-lists
// // @desc Get all todo lists
// // @access Public
// router.get('/', async (req, res) => {
//   try {
//     const todoLists = await TodoList.find();
//     res.json(todoLists);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send();
//   }
// });

// @route GET api/todo-lists
// @desc Get all todo lists
// @access Public
router.get('/', async (req, res) => {
  try {
    let todoLists = await TodoList.find();
    todoLists = todoLists.map(list => {
      return {
        _id: list._id,
        items: list.items,
        title: list.title,
        createdAt: list.createdAt,
        itemCount: list.items.length,
        completedItemCount: list.items.filter(item => item.completed).length
      };
    });
    res.json(todoLists);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});
// @route GET api/todo-lists/:id
// @desc Get a todo list with the specified id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (!todoList) {
      return res.status(404);
    }
    res.json(todoList);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});
// @route POST api/todo-lists
// @desc Add new todo list
// @access Public
router.post(
  '/',
  [...sanitizerHandlers, ...commonValidationHandlers, ...addValidationHandlers],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, items } = req.body;
    const sanitizedItems = items.map(x => {
      return {
        todo: x.todo,
        completed: x.completed
      };
    });
    try {
      const newTodoList = new TodoList({
        title: title,
        items: sanitizedItems
      });
      const todoList = await newTodoList.save();
      res.json(todoList);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

// @route PUT api/todo-lists/:id
// @desc Update a todo list
// @access Public
router.put(
  '/:id',
  [
    ...sanitizerHandlers,
    ...commonValidationHandlers,
    ...updateValidationHandlers
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const dbTodoList = await TodoList.findById(req.params.id);
      if (!dbTodoList) {
        return res.status(404);
      }
      const { title: savedTitle, items: savedItems } = req.body;
      dbTodoList.title = savedTitle;
      //Iterate backwards to prevent skipping items in case one of the items will be deleted
      for (let i = dbTodoList.items.length - 1; i >= 0; --i) {
        const dbTodoItem = dbTodoList.items[i];
        const savedItem = savedItems.find(item =>
          dbTodoItem._id.equals(item._id)
        );
        //If the current item from db does not exist in the saved items, delete it
        if (!savedItem) {
          dbTodoList.items.splice(i, 1);
        }
        //Else update the db item using the saved item
        else {
          dbTodoItem.todo = savedItem.todo;
          dbTodoItem.completed = savedItem.completed;
        }
      }
      for (const savedTodoItem of savedItems) {
        if (!savedTodoItem._id) {
          dbTodoList.items.push({
            todo: savedTodoItem.todo,
            completed: savedTodoItem.completed
          });
        }
      }

      const newTodoList = await dbTodoList.save();
      res.json(newTodoList);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  }
);

// @route DELETE api/todo-lists/:id
// @desc Delete a todo list
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (!todoList) {
      return res.status(404);
    }
    await TodoList.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

module.exports = router;

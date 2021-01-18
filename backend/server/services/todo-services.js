import Todo from '../models/todo';

export const search =  (params) => {
    const promise = Todo.find(params).exec();
    return promise;
};

export const save = (todo) => {
    const newTodo = new Todo(todo);
    const promise = newTodo.save();
    return promise;
};

export const find = (id) => {
    const promise = Todo.findById(id).exec();
    return promise;
};

export const update = (id, newValue) => {
    newValue.lastModifiedDate = new Date();
    const promise = Todo.findOneAndUpdate(
        {_id: id},
        newValue,
        {new: true}
    ).exec();
    return promise;
};

export const remove = (id) => {
    const promise = Todo.remove({_id: id});
    return promise;
};
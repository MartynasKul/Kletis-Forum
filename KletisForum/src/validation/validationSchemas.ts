export const login = {
    email: 'email|required',
    password: 'required'
};

export const createUser = {
    username: 'required|start|end|minLength1|maxLength25',
    email: 'email|required',
    password: 'password|required',
    type: 'required'
};

export const createUserSimple = {
    username: 'required|start|end|minLength1|maxLength25',
    email: 'email|required',
    password: 'password|required',
};

export const editUser = {
    username: 'required|start|end|minLength1|maxLength25',
    email: 'email',
    password: 'password',
}

export const createTractor = {
    name: 'required|start|end|minLength1|maxLength40',
    description: 'required|minLength1|maxLength256',
    // created_by: 'required|objectId'
};

export const editTractor = {
    name: 'required|start|end|minLength1|maxLength40',
    description: 'required|minLength1|maxLength256'
};

export const createPost = {
    title: 'required|minLength1|maxLength40',
    content: 'required|minLength1|maxLength256',

};

export const editPost = {
    title: 'required|minLength1|maxLength40',
    content: 'required|minLength1|maxLength256'
};

export const createComment = {
    content: 'required|minLength1|maxLength256',

};

export const editComment = {
    content: 'required|minLength1|maxLength256'
};

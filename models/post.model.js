const filename = './data/posts.json';
let posts = require('../data/posts.json');
const helper = require('../helpers/helper.js');

let getPosts = () => { };
let getPost = (id) => { };
let insertPost = (newPost) => { };
let updatePost = (id, newPost) => { };
let deletePost = (id) => { };

getPosts = () => {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'Posts are not available',
                status: 202
            });
        }
        resolve(posts);
    });
}

getPost = (id) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
            .then(post => resolve(post))
            .catch(err => reject(err));
    });
}

insertPost = (newPost) => {
    return new Promise((resolve, reject) => {
        
        const id = { id: helper.getNewId(posts) };
        const date = {
            createdAt: helper.getDate(),
            updatedAt: helper.getDate()
        };
        newPost = { ...id, ...date, ...newPost };
        posts.push(newPost);
        
        helper.writeJSONFile(filename, posts);

        resolve(newPost);
    });
}

updatePost = (id, newPost) => {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
            .then(post => {
                const index = posts.findIndex(p => p.id == post.id)
                id = { id: post.id };
                const date = {
                    createdAt: post.createdAt,
                    updatedAt: helper.getDate()
                }

                posts[index] = { ...id, ...date, ...newPost };
                helper.writeJSONFile(filename, posts);
                resolve(posts[index]);
            })
            .catch(err => reject(err))
    })
}

deletePost = (id) => {
    return new Promise((resolve, reject) => {

        helper.mustBeInArray(posts, id)
            .then(() => {
                index = posts.findIndex(p => p.id === id);
                posts.splice(index, 1);
                helper.writeJSONFile(filename, posts);

                resolve();
            })
            .catch(err => reject(err))
    });
}

module.exports = {
    insertPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}
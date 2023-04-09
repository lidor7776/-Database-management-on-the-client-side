import axios from 'axios';

const getAll = (url) => axios.get(url);

const getUserTasks = async (id) => {
  const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  const { data: userTodos } = await getAll(`${todosUrl}?userId=${id}`);
  return userTodos;
};
const getUserPosts = async (id) => {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const { data: userposts } = await getAll(`${postsUrl}?userId=${id}`);
    return userposts;
  };

export { getAll, getUserTasks,getUserPosts };
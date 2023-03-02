import {users} from './users';

const getUser = localStorage?.getItem("token");
// const myuser = ;

export const user = users?.filter((user) => user.token === getUser)[0]
console.log(user)
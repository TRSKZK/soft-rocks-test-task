import { User, UserToAdd } from '../typedefs'
const USERS_URL = 'https://mate.academy/students-api/users';

export async function loadUsers():Promise<User[]> {
  const response = await fetch(`${USERS_URL}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const users = await response.json();

  return users;
};

export async function addUser(body: UserToAdd):Promise<User> {
  const response = await fetch(`${USERS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const addedUser = await response.json();
  // console.log(addedUser)

  return addedUser;
}

export async function deleteUser(userId: number):Promise<User>{
  const response = await fetch(`${USERS_URL}/${userId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const deletedUser = await response.json();

  return deletedUser;
}

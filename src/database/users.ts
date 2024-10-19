import { UserData } from '../common/types';
import { v4 as uuid } from 'uuid';

class UserStorage {
  private static instance: UserStorage;

  private users: Required<UserData>[] = [
    // {
    //   id: '528e2bed-f8d6-4aae-9b9c-d4fa645ba8ee',
    //   username: 'user_loh',
    //   age: 35,
    //   hobbies: ['codding'],
    // },
  ];

  public static getInstance(): UserStorage {
    if (!UserStorage.instance) {
      UserStorage.instance = new UserStorage();
    }
    return UserStorage.instance;
  }

  public getUsers = () => this.users;

  public getUserById = (id: string): UserData | undefined =>
    this.users.find((user) => user.id === id);

  public addUser = (userInfo: Omit<UserData, 'id'>): UserData => {
    const id = uuid();
    const userData: Required<UserData> = { id: id, ...userInfo };
    this.users.push(userData);

    return userData;
  };

  public deleteUser = (id: string) => {
    this.users.splice(
      this.users.findIndex((user) => user.id === id),
      1,
    );
  };

  public updateUser = (userInfo: Required<UserData>) => {
    const user = this.getUserById(userInfo.id);
    if (user) {
      user.username = userInfo.username;
      user.age = userInfo.age;
      user.hobbies = userInfo.hobbies;
    }

    return user;
  };
}

const userStorage = UserStorage.getInstance();

export default userStorage;

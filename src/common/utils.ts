import { UserData } from './types';

export const validateUserInfo = (userInfo: UserData) => {
  const required: { [key in keyof Partial<UserData>]: string } = {
    username: 'string',
    age: 'number',
  };

  for (const key in required) {
    if (
      typeof userInfo[key as keyof UserData] !==
      required[key as keyof typeof required]
    )
      return false;
  }

  return (
    Array.isArray(userInfo.hobbies) &&
    userInfo.hobbies.every((el) => typeof el === 'string')
  );
};

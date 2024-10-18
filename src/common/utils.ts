import { UserData } from './types';

export const validateUserInfo = (userInfo: UserData) => {
  const required: { [key in keyof Partial<UserData>]: string } = {
    username: 'string',
    age: 'number',
  };

  Object.entries(required).forEach(([key, value]) => {
    if (typeof userInfo[key as keyof UserData] === value) return false;
  });

  return (
    Array.isArray(userInfo.hobbies) &&
    userInfo.hobbies.every((el) => typeof el === 'string')
  );
};

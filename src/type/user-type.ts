import { IUser } from '../models/user-model';

export type RegisterUserRequest = {
  username: string;
  fullName: string;
  email: string;
  profileImg?: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  fullName?: string;
  email?: string;
  profileImg?: string;
  password?: string;
};

export type UserResponse = {
  _id: string;
  username: string;
  fullName: string;
  token?: string;
};

export const toUserResponse = (user: IUser): UserResponse => {
  return {
    _id: user._id as string,
    username: user.username,
    fullName: user.fullName,
  };
};

import { sequelize } from '../database/sequelize';
import { UserCreationType } from '../interfaces/IUser';
import { User } from '../model';
import Cart from '../model/cart';
import AppError from '../utils/appError';
import bcrypt from 'bcryptjs';

export const registerUser = async (request: UserCreationType) => {
  const existingUser = await User.findOne({ where: { email: request.email } });
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }
  const transaction = await sequelize.transaction();
  const newUser = await User.create(
    {
      first_name: request.first_name,
      last_name: request.last_name,
      email: request.email,
      password: await bcrypt.hash(request.password, 12),
      created_at: new Date(),
    },
    { transaction }
  );
  // create a cart for the user
  await Cart.create(
    {
      user_id: newUser.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    { transaction }
  );
  await transaction.commit();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }
  return user;
};

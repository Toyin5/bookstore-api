import User from '../../core/model/user';
import bcrypt from 'bcryptjs';
import * as authController from '../../core/controllers/auth.controller';

jest.mock('../../core/model/user');
jest.mock('../../core/model/cart');
jest.mock('../../core/model/cartItem');
jest.mock('bcryptjs');

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser = {
        id: 1,
        user_id: 'test-user-id',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'hashedPassword123',
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (User.findOne as jest.Mock).mockResolvedValue(null); // No existing user

      const result = await authController.registerUser({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
        password: 'password123',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(User.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should return 400 if email already exists', async () => {
      const request = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
        password: 'password123',
      } as const;

      (User.findOne as jest.Mock).mockResolvedValue({ email: request.email }); // Existing user

      await expect(
        authController.registerUser({
          first_name: 'Test',
          last_name: 'User',
          email: 'test@test.com',
          password: 'password123',
        })
      ).rejects.toThrow('User with this email already exists');

      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const mockUser = {
        id: 1,
        user_id: 'test-user-id',
        email: 'test@example.com',
        password: 'hashedPassword123',
      };

      const request = {
        email: 'test@example.com',
        password: 'password123',
      } as const;

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await authController.loginUser(request.email, request.password);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
    });

    it('should return 401 for invalid credentials', async () => {
      const req = {
        email: 'test@example.com',
        password: 'wrongpassword',
      } as const;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authController.loginUser(req.email, req.password)).rejects.toThrow(
        'Invalid email or password'
      );

      expect(bcrypt.compare).not.toHaveBeenCalled();
    });
  });
});

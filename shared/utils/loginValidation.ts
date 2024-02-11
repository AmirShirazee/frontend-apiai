import bcrypt from 'bcryptjs';
import { User, UserDocument } from '../models/user.model';
import {
  validateAdvancedLoginInput,
  validateBasicLoginInput,
} from '../models/validations/user.validation';

const loginLogic = async (
  username: string,
  password: string,
): Promise<{ user?: UserDocument; message?: string }> => {
  const basicValidation = validateBasicLoginInput({ username, password });
  const advancedValidation = validateAdvancedLoginInput({ username, password });

  if (basicValidation.error) {
    return { message: basicValidation.error.details[0].message };
  }

  if (advancedValidation.error) {
    return { message: advancedValidation.error.details[0].message };
  }

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    return { message: 'Invalid username and/or password.' };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { message: 'Invalid username and/or password.' };
  }

  if (!user.isVerified) {
    return {
      message: 'Your account has not been verified. Please activate your account.',
    };
  }

  return { user };
};

export default loginLogic;

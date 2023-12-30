import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  username: string;
  image: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: String,
});

const User = model<IUser>('User', userSchema);

export default User;

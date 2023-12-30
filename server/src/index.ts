import dotenv from 'dotenv';

import app from './app';
import connectDB from './db';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log('Server is listening on PORT', PORT))
  )
  .catch((error) => console.log('MONGODB CONNECTION FAILED', error));

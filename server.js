const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');  // <-- updated path

connectDB();

const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

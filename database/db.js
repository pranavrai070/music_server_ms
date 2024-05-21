import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@flipkart.ejltgee.mongodb.net/ms_musicDB`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
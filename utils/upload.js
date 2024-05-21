import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url:  `mongodb+srv://${username}:${password}@flipkart.ejltgee.mongodb.net/ms_musicDB`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg", "audio/flac"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-music-${file.originalname}`;

        return {
            bucketName: "audios",
            filename: `${Date.now()}-music-${file.originalname}`
        }
    }
});

export default multer({storage}); 
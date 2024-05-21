import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8001";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (request, response) => {
  if (!request.file) return response.status(404).json("File not found");

  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json({message:"File Uploaded Successfully",imageUrl});
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(response);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    // Fetch all file names in the 'audios.files' collection
    let filesData=[];
    gridfsBucket.find().toArray((err, files)=>{
      if (err) {
        console.error("Error fetching files:", err);
      } else {
        if (files.length === 0) {
          console.log("No files found");
        } else {
          files.forEach((file,i) => {
            console.log("getting files console");
            console.log(file.filename);
            filesData.push({id:i+1,fileName:file.filename});
          });
        }
        return res.status(200).json({ files:filesData });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

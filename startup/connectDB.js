const mongoose = require('mongoose');

exports.connectDB = async () => {
    await mongoose.connect('mongodb+srv://quyhuu19:12345sau@atlascluster.a0jn3af.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster');
    console.log('mongoDB connected');
} 
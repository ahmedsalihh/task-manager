import mongoose from 'mongoose';

mongoose.connect(global.gConfig.DB, { useNewUrlParser: true },function(err, db) {
    if(err) {
        console.log('database is not connected:'+err)
    }
    else {
        console.log('connected!!')
    }
});
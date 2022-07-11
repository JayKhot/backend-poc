const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    deleted_at:{
        type: Date,
        default: null
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        default: null
    },
    updated_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        default: null
    }
  });

  const User = mongoose.model('user', UserSchema);
  User.createIndexes()
  module.exports = User;
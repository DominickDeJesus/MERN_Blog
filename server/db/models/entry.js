const mongoose = require('mongoose'),
  moment = require('moment');

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        lastUpdated: {
          type: Date
        },
        name: {
          type: String
        },
        content: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

entrySchema.methods.toJSON = function () {
  const entry = this;
  const entryObject = entry.toObject();
  if (entryObject.createdAt) {
    entryObject.createdAt = moment(entryObject.createdAt).format('YYYY-MM-DD');
  }
  return entryObject;
};

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;

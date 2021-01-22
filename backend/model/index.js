const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;

// for learnimg
const productSchema = Schema({
  id: ObjectId,
  name: String,
  image: String,
  price: Number,
  description: String,
  manufacturer: { type: ObjectId, ref: 'Manufacturer' }
});

const manufacturerSchema = Schema({
  id: ObjectId,
  name: String,
});

// for my real task
const roomWaterUseSchema = Schema({
  id: ObjectId,
  name: String, // room name
  value: Number // room water use
});


// for learnimg
const Product = model('Product', productSchema);
const Manufacturer = model('Manufacturer', manufacturerSchema);

// for my real task
const roomWaterUse = model('roomWaterUse', roomWaterUseSchema);






module.exports = { Product, Manufacturer, roomWaterUse};


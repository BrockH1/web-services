const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("sample_mflix").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContactById = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("sample_mflix")
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const buildContact = async (req, res) => {
  const person =
  {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    color: req.body.color,
    birthday: req.body.birthday
  }
  const query = await mongodb
  .getDb()
  .db("sample_mflix")
  .collection("contacts")
  .insertOne(person);

  if (query.acknowledged) {
    res.status(201).json(query);
  } else {
    res.status(500).json(query.error || 'Could not create contact');
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const person = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    color: req.body.color,
    birthday: req.body.birthday
  };

  const query = await mongodb
    .getDb()
    .db("sample_mflix")
    .collection("contacts")
    .replaceOne({ _id: userId }, person);
  console.log(query);
  if (query.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(query.error || 'Could not update contact');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const query = await mongodb.getDb().db("sample_mflix").collection('contacts').deleteOne({ _id: userId });
  console.log(query);
  if (query.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(query.error || 'Could not delete contact.');
  }
};

module.exports = { getContacts, getContactById, buildContact, updateContact, deleteContact };
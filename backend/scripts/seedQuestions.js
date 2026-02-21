// seedQuestions.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Question = require('../models/Question');
const questions = require('./questionsList');

const seedQuestions = async () => {
  try {
  
    await connectDB();
    console.log('Connected to MongoDB');

 
    const deleteResult = await Question.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing questions`);

   
    const inserted = await Question.insertMany(questions);
    console.log(`Seeded ${inserted.length} questions successfully`);

    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedQuestions();

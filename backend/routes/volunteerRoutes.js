const express = require('express');
const Volunteer = require('../models/Volunteer');
const Certificate = require('../models/Certificate');

const router = express.Router();

// Волонтёр ажлуудын жагсаалт авах
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Волонтёр ажил үүсгэх (админ)
router.post('/', async (req, res) => {
  try {
    const { title, description, organization, location, requiredHours, startDate, endDate, category } = req.body;
    
    const volunteer = await Volunteer.create({
      title, description, organization, location, requiredHours, startDate, endDate, category
    });
    
    res.status(201).json({ message: 'Волонтёр ажил үүсгэгдлээ', volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Волонтёр ажилд бүртгүүлэх
router.post('/:id/register', async (req, res) => {
  try {
    const { userId } = req.body;
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ error: 'Волонтёр ажил олдсонгүй' });
    }
    
    volunteer.registeredUsers.push({ userId, registeredDate: Date.now() });
    await volunteer.save();
    
    res.json({ message: 'Амжилттай бүртгүүлсэн', volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Сертификат үүсгэх
router.post('/:id/certificate', async (req, res) => {
  try {
    const { userId, hoursCompleted } = req.body;
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ error: 'Волонтёр ажил олдсонгүй' });
    }
    
    const certificate = await Certificate.create({
      userId,
      volunteerId: req.params.id,
      volunteerTitle: volunteer.title,
      organization: volunteer.organization,
      hoursCompleted
    });
    
    res.status(201).json({ message: 'Сертификат үүсгэгдлээ', certificate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

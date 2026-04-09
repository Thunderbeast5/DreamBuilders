import Contact from '../models/Contact.js';

// POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, phone, service, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact (admin only)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

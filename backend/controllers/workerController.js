import Worker from '../models/Worker.js';

// GET /api/workers
export const getWorkers = async (req, res, next) => {
  try {
    const workers = await Worker.find().populate('site', 'name location').sort('-createdAt');
    res.json(workers);
  } catch (error) {
    next(error);
  }
};

// GET /api/workers/:id
export const getWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id).populate('site', 'name location');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    next(error);
  }
};

// POST /api/workers
export const createWorker = async (req, res, next) => {
  try {
    const { name, phone, skill, dailyWage, status, site } = req.body;
    const worker = await Worker.create({ name, phone, skill, dailyWage, status, site });
    res.status(201).json(worker);
  } catch (error) {
    next(error);
  }
};

// PUT /api/workers/:id
export const updateWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('site', 'name location');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/workers/:id
export const deleteWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json({ message: 'Worker deleted' });
  } catch (error) {
    next(error);
  }
};

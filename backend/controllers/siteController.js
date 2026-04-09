import Site from '../models/Site.js';
import Worker from '../models/Worker.js';

// GET /api/sites
export const getSites = async (req, res, next) => {
  try {
    const sites = await Site.find().populate('workers', 'name skill status').sort('-createdAt');
    res.json(sites);
  } catch (error) {
    next(error);
  }
};

// GET /api/sites/:id
export const getSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id).populate('workers', 'name skill status phone dailyWage');
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (error) {
    next(error);
  }
};

// POST /api/sites
export const createSite = async (req, res, next) => {
  try {
    const { name, location, status } = req.body;
    const site = await Site.create({ name, location, status });
    res.status(201).json(site);
  } catch (error) {
    next(error);
  }
};

// PUT /api/sites/:id
export const updateSite = async (req, res, next) => {
  try {
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('workers', 'name skill status');
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/sites/:id
export const deleteSite = async (req, res, next) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    // Unassign workers from this site
    await Worker.updateMany({ site: site._id }, { site: null, status: 'available' });

    res.json({ message: 'Site deleted' });
  } catch (error) {
    next(error);
  }
};

// POST /api/sites/:id/assign
export const assignWorker = async (req, res, next) => {
  try {
    const { workerId } = req.body;
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    // Add worker to site if not already
    if (!site.workers.includes(workerId)) {
      site.workers.push(workerId);
      await site.save();
    }

    // Update worker status
    worker.site = site._id;
    worker.status = 'assigned';
    await worker.save();

    const populated = await site.populate('workers', 'name skill status');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

// POST /api/sites/:id/unassign
export const unassignWorker = async (req, res, next) => {
  try {
    const { workerId } = req.body;
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    site.workers = site.workers.filter((w) => w.toString() !== workerId);
    await site.save();

    await Worker.findByIdAndUpdate(workerId, { site: null, status: 'available' });

    const populated = await site.populate('workers', 'name skill status');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

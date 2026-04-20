const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const supabase = require('../config/supabase');

// @route   GET api/admin/stats
// @desc    Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
    const { count: companyCount } = await supabase.from('companies').select('*', { count: 'exact', head: true });
    const { count: driveCount } = await supabase.from('drives').select('*', { count: 'exact', head: true });
    const { count: offerCount } = await supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'Accepted');

    res.json({
      totalStudents: studentCount,
      activeCompanies: companyCount,
      liveDrives: driveCount,
      studentsPlaced: offerCount,
      placementRate: studentCount > 0 ? (offerCount / studentCount) * 100 : 0
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/admin/students
// @desc    Get all students
router.get('/students', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const { data: students, error } = await supabase.from('students').select('*');
    if (error) throw error;
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

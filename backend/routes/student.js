const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const supabase = require('../config/supabase');

// @route   GET api/student/profile
// @desc    Get current student profile
router.get('/profile', auth, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/student/drives
// @desc    Get all available drives
router.get('/drives', auth, async (req, res) => {
  try {
    const { data: drives, error } = await supabase
      .from('drives')
      .select('*, companies(name, logo, color)')
      .order('drive_date', { ascending: true });

    if (error) throw error;
    res.json(drives);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/student/apply
// @desc    Apply for a drive
router.post('/apply', auth, async (req, res) => {
  const { driveId } = req.body;
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        student_id: req.user.id,
        drive_id: driveId,
        timeline: ['Applied']
      }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/student/applications
// @desc    Get student applications
router.get('/applications', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, drives(*, companies(name))')
      .eq('student_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

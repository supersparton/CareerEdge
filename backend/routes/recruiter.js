const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const supabase = require('../config/supabase');

// @route   POST api/recruiter/drives
// @desc    Create a drive
router.post('/drives', auth, async (req, res) => {
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { companyId, role, driveDate, driveTime, venue, package, jobType, description, requirements, location } = req.body;

  try {
    const { data, error } = await supabase
      .from('drives')
      .insert([{
        company_id: companyId,
        role,
        drive_date: driveDate,
        drive_time: driveTime,
        venue,
        package,
        job_type: jobType,
        description,
        requirements,
        location
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

// @route   GET api/recruiter/applications/:driveId
// @desc    Get applicants for a drive
router.get('/applications/:driveId', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, students(*)')
      .eq('drive_id', req.params.driveId);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

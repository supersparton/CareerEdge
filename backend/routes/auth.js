const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', async (req, res) => {
  const { email, password, role, name } = req.body;

  try {
    // Check if user exists
    let { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, role, name }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Create profile based on role
    if (role === 'student') {
      const { error: studentError } = await supabase
        .from('students')
        .insert([{ 
          id: newUser.id, 
          name: name || '',
          dept: req.body.dept || '',
          batch: req.body.batch || null,
          reg_no: req.body.reg_no || ''
        }]);
      
      if (studentError) {
        console.error('Student profile creation error:', studentError);
        await supabase.from('users').delete().eq('id', newUser.id);
        return res.status(500).json({ message: 'Failed to create student profile' });
      }
    } else if (role === 'recruiter') {
      // Logic for recruiters - e.g., link to company or create recruiter profile
      // For now, we'll just track recruiter info in user metadata or a new table if needed
      // Let's assume we store company_name in a metadata field or just log it
      console.log(`Recruiter registered for company: ${req.body.company_name}`);
    } else if (role === 'admin') {
      // Check admin code
      const ADMIN_SECRET = 'ADMIN123'; // Simple secret for now
      if (req.body.admin_code !== ADMIN_SECRET) {
        await supabase.from('users').delete().eq('id', newUser.id);
        return res.status(401).json({ message: 'Invalid Admin Authorization Code' });
      }
    }

    // Return JWT
    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: newUser.role, user: { id: newUser.id, email: newUser.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, user: { id: user.id, email: user.email } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

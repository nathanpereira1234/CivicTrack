const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Issue = require('../models/Issue');

const router = express.Router();

// --- Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// --- API Route Definitions ---

// **MODIFIED PART: This GET route fetches all issues**
// Handles GET requests to '/api/issues'
router.get('/', async (req, res) => {
  try {
    // Find all documents in the 'issues' collection and sort newest first
    const issues = await Issue.find({}).sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).send('Server Error');
  }
});

// **This is your existing POST route for creating a new issue**
// Handles POST requests to '/api/issues'
router.post('/', upload.single('image'), async (req, res) => {
  
  // Debugging logs to check incoming data
  console.log('--- New Issue Request ---');
  console.log('Request Body (Form Fields):', req.body);
  console.log('Request File (Image Info):', req.file);
  console.log('-------------------------');

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'An image file is required.' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ message: 'Error uploading image to Cloudinary.' });
        }

        const { category, description, latitude, longitude, isAnonymous } = req.body;
        
        const newIssue = new Issue({
          category: category,
          description: description,
          imageUrl: result.secure_url,
          isAnonymous: isAnonymous === 'true',
          location: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)], 
          },
        });

        await newIssue.save();
        res.status(201).json({ message: 'Issue submitted successfully!', data: newIssue });
      }
    );
    
    uploadStream.end(req.file.buffer);

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).send('An unexpected server error occurred.');
  }
});

// ++ ADD THIS NEW ROUTE ++
// This route handles GET requests to '/api/issues/:id' to fetch a single issue
router.get('/:id', async (req, res) => {
  try {
    // Find the issue by its ID and populate the 'reportedBy' field
    // to include the user's name from the User model.
    const issue = await Issue.findById(req.params.id).populate('reportedBy', 'name');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json(issue);
  } catch (err) {
    console.error('Error fetching single issue:', err);
    res.status(500).send('Server Error');
  }
});


// ++ ADD THIS NEW ROUTE ++
// This route gets issues for the logged-in user: GET /api/issues/myissues
router.get('/myissues', protect, async (req, res) => {
  try {
    // req.user.id is available from the 'protect' middleware
    const issues = await Issue.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    console.error('Error fetching user issues:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
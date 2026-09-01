import express from 'express';
import multer from 'multer';
import path from 'path';
import { generateQuestions, generateFeedback, uploadResume } from '../controllers/interviewController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

router.post('/upload-resume', upload.single('resume'), uploadResume);
router.post('/generate', generateQuestions);
router.post('/feedback', generateFeedback);

export default router;

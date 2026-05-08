import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });
const port = process.env.PORT || 4000;

const catalog = {
  courses: [
    { id: 'btech', name: 'B.Tech', semesters: 8 },
    { id: 'mba', name: 'MBA', semesters: 4 },
    { id: 'polytechnic', name: 'Polytechnic', semesters: 6 },
    { id: 'bca', name: 'BCA', semesters: 6 },
    { id: 'mca', name: 'MCA', semesters: 4 },
  ],
  contentTypes: ['notes-pdf', 'video-lecture', 'ppt', 'assignment', 'important-questions', 'pyq'],
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', app: 'AKTU Study Hub' });
});

app.get('/api/catalog', (_request, response) => {
  response.json(catalog);
});

app.post('/api/admin/upload', upload.single('file'), (request, response) => {
  const { course, semester, subject, unit, type, videoUrl } = request.body;
  response.status(201).json({
    message: 'Content uploaded successfully',
    content: {
      course,
      semester,
      subject,
      unit,
      type,
      videoUrl,
      file: request.file?.filename ?? null,
      uploadedAt: new Date().toISOString(),
    },
  });
});

app.delete('/api/admin/content/:id', (request, response) => {
  response.json({ message: 'Content deleted', id: request.params.id });
});

app.listen(port, () => {
  console.log(`AKTU Study Hub API running on http://localhost:${port}`);
});

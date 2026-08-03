import { Router } from 'express';

const router = Router();

const entries = [
  {
    title: 'Learning Express',
    body: 'Today I learned how Express routes match incoming requests.'
  },
  {
    title: 'Using EJS',
    body: 'EJS lets a server place dynamic data inside an HTML template.'
  },
  {
    title: 'Semantic HTML',
    body: 'Semantic elements give a web page structure and meaning.'
  }
];

router.get('/', (req, res) => {
  res.send('Hello! Welcome to my web server.');
});

router.get('/about', (req, res) => {
  res.send('This is a web programming course.');
});

router.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}!`);
});

router.get('/repeat/:word', (req, res) => {
  const { word } = req.params;
  res.send(`${word} ${word} ${word}`);
});

router.get('/count', (req, res) => {
  const from = req.query.from || 1;
  const to = req.query.to || 10;

  res.send(`Counting from ${from} to ${to}.`);
});

router.get('/entries', (req, res) => {
  res.render('entries', {
    title: 'Entries',
    entries
  });
});

router.get('/entries/:id', (req, res) => {
  const { id } = req.params;
  const index = Number(id);

  if (!Number.isInteger(index) || index < 0 || index >= entries.length) {
    return res.status(404).render('error', {
      title: 'Entry Not Found',
      message: 'Entry not found.'
    });
  }

  const entry = entries[index];

  res.render('entry-detail', {
    entry
  });
});

export default router;
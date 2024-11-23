import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import db from '../database/init.js';

export const router = Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await db.query(`
      SELECT id, title, subtitle, author, image_url, status, views, created_at, updated_at
      FROM articles
      ORDER BY created_at DESC
    `);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await db.get('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Increment views
    await db.run('UPDATE articles SET views = views + 1 WHERE id = ?', [req.params.id]);
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Create article
router.post('/', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
  try {
    const { title, subtitle, content, author, image_url, status } = req.body;

    const result = await db.run(`
      INSERT INTO articles (title, subtitle, content, author, image_url, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [title, subtitle, content, author, image_url, status]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article
router.put('/:id', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
  try {
    const { title, subtitle, content, author, image_url, status } = req.body;

    const result = await db.run(`
      UPDATE articles
      SET title = ?, subtitle = ?, content = ?, author = ?, image_url = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, subtitle, content, author, image_url, status, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const result = await db.run('DELETE FROM articles WHERE id = ?', [req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});
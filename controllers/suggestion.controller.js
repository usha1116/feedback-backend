import Suggestion from '../models/suggestion.model.js';

export const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSuggestion = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const suggestion = new Suggestion({ title, description });
    await suggestion.save();

    // Emit new suggestion to all connected clients
    req.io.emit('newSuggestion', suggestion);

    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const upvoteSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }

    // Emit updated suggestion to all connected clients
    req.io.emit('suggestionUpdated', suggestion);

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downvoteSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );

    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }

    // Emit updated suggestion to all connected clients
    req.io.emit('suggestionUpdated', suggestion);

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


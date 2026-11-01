import React, { useState } from 'react'
import './AddSnippetModal.css'
import { X } from 'lucide-react';

function AddSnippetModal({ isOpen, onClose, onAddSnippet }) {
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [tagsInput, setTagsInput] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !code.trim()) return;

        const tags = tagsInput 
            ? tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean) 
            : [language.toLowerCase()];

        const newSnippet = {
            id: Date.now().toString(),
            title: title.trim(),
            language: language.toLowerCase().trim(),
            description: description.trim(),
            code: code,
            tags: tags
        };

        onAddSnippet(newSnippet);

        // Reset form & close
        setTitle('');
        setLanguage('javascript');
        setDescription('');
        setCode('');
        setTagsInput('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Code Snippet</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Snippet Title / Filename</label>
                        <input
                            type="text"
                            placeholder="e.g., LocalStorage Hook"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Language</label>
                            <input
                                type="text"
                                placeholder="e.g., javascript, css, python"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tags (comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g., hooks, storage, react"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Brief explanation of what this snippet does..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>Code Block</label>
                        <textarea
                            className="code-textarea"
                            placeholder="Paste your code here..."
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            rows="6"
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Save Snippet</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSnippetModal;
import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './DeleteConfirmModal.css';

export default function DeleteConfirmModal({ isOpen, snippet, onClose, onConfirm }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !snippet) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="delete-modal-title-wrap">
            <div className="delete-warning-icon">
              <AlertTriangle size={20} />
            </div>
            <h2>Delete Snippet</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cancel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="delete-modal-body">
          <p>
            Are you sure you want to delete <strong className="snippet-delete-name">&ldquo;{snippet.title}&rdquo;</strong>?
          </p>
          <p className="delete-warning-note">
            This action cannot be undone and will permanently remove this snippet from your library.
          </p>
        </div>

        <div className="modal-actions delete-modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger-delete"
            onClick={() => onConfirm(snippet.id)}
          >
            Delete Snippet
          </button>
        </div>
      </div>
    </div>
  );
}

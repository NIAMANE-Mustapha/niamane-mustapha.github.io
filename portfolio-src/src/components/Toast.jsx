import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
    return (
        <div className="toast-container" aria-live="polite" aria-atomic="true">
            {toasts.map((toast) => {
                let Icon = CheckCircle;
                let iconColor = 'var(--primary-glow)';
                
                if (toast.type === 'error') {
                    Icon = AlertCircle;
                    iconColor = '#ef4444';
                } else if (toast.type === 'info') {
                    Icon = Info;
                    iconColor = 'var(--secondary)';
                }

                return (
                    <div key={toast.id} className="toast show">
                        <div className="toast-icon" style={{ color: iconColor }}>
                            <Icon size={20} />
                        </div>
                        <div className="toast-message">{toast.message}</div>
                        <button 
                            className="toast-close" 
                            onClick={() => removeToast(toast.id)}
                            aria-label="Fermer la notification"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Toast;

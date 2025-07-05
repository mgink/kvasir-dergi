'use client';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    text?: string;
    centered?: boolean;
}

export default function LoadingSpinner({
    size = 'md',
    color = 'primary',
    text = 'Yükleniyor...',
    centered = false
}: LoadingSpinnerProps) {
    const sizeClass = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    }[size];

    const content = (
        <div className="d-flex flex-column align-items-center">
            <div className={`spinner-border text-${color} ${sizeClass}`} role="status">
                <span className="visually-hidden">{text}</span>
            </div>
            {text && (
                <div className="mt-2 text-muted">
                    {text}
                </div>
            )}
        </div>
    );

    if (centered) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                {content}
            </div>
        );
    }

    return content;
}

// Page Loading Component
export function PageLoading() {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Sayfa yükleniyor...</span>
                </div>
                <h5 className="text-muted">Kvasir Dergi</h5>
                <p className="text-muted">Sayfa yükleniyor...</p>
            </div>
        </div>
    );
}

// Button Loading State
interface LoadingButtonProps {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export function LoadingButton({
    loading,
    children,
    className = 'btn btn-primary',
    disabled = false,
    onClick,
    type = 'button'
}: LoadingButtonProps) {
    return (
        <button
            type={type}
            className={className}
            disabled={loading || disabled}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                    </span>
                    Yükleniyor...
                </>
            ) : (
                children
            )}
        </button>
    );
}

type BlockProps = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  type: string;
  content?: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function truncate(s?: string, n = 120) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export default function Block({
  left,
  top,
  width,
  height,
  type,
  content,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: BlockProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={`${type}${content ? `: ${truncate(content)}` : ''}`}
      style={{
        position: 'absolute',
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        width: `${width * 100}%`,
        height: `${height * 100}%`,
        border: isActive ? '2px solid #2563eb' : '2px solid #f59e0b',
        background: isActive ? 'rgba(37,99,235,0.15)' : 'rgba(245,158,11,0.12)',
        borderRadius: 4,
        transition: 'border-color 120ms, background 120ms, box-shadow 120ms',
        boxShadow: isActive ? '0 0 0 2px rgba(37,99,235,0.35)' : 'none',
        cursor: 'pointer',
        pointerEvents: 'auto',
      }}
    >
      {isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: 4,
            padding: '4px 8px',
            background: '#1e293b',
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            borderRadius: 4,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
          }}
        >
          <div style={{ fontWeight: 600, color: '#60a5fa' }}>{type}</div>
        </div>
      )}
    </div>
  );
}


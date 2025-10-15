export type BlockProps = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  type: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type BlockType = {
  type: string;
  bbox: {
    left: number;
    top: number;
    width: number;
    height: number;
    page: number;
  };
  content?: string;
};

// Color mapping for different block types
const BLOCK_COLORS: Record<string, { border: string; background: string; label: string }> = {
  'Header': {
    border: '#7c3aed',
    background: 'rgba(124, 58, 237, 0.12)',
    label: '#a78bfa',
  },
  'Title': {
    border: '#dc2626',
    background: 'rgba(220, 38, 38, 0.12)',
    label: '#f87171',
  },
  'Text': {
    border: '#0891b2',
    background: 'rgba(8, 145, 178, 0.12)',
    label: '#67e8f9',
  },
  'Figure': {
    border: '#059669',
    background: 'rgba(5, 150, 105, 0.12)',
    label: '#6ee7b7',
  },
  'Section Header': {
    border: '#ea580c',
    background: 'rgba(234, 88, 12, 0.12)',
    label: '#fdba74',
  },
  'List Item': {
    border: '#0284c7',
    background: 'rgba(2, 132, 199, 0.12)',
    label: '#7dd3fc',
  },
  'Table': {
    border: '#9333ea',
    background: 'rgba(147, 51, 234, 0.12)',
    label: '#c084fc',
  },
  'Footer': {
    border: '#64748b',
    background: 'rgba(100, 116, 139, 0.12)',
    label: '#cbd5e1',
  },
  'Page Number': {
    border: '#475569',
    background: 'rgba(71, 85, 105, 0.12)',
    label: '#94a3b8',
  },
};

// Default color for unknown block types
const DEFAULT_COLOR = {
  border: '#f59e0b',
  background: 'rgba(245, 158, 11, 0.12)',
  label: '#fbbf24',
};

// Active state color (blue) used for all types when hovered
const ACTIVE_COLOR = {
  border: '#2563eb',
  background: 'rgba(37, 99, 235, 0.15)',
  boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.35)',
};

export default function Block({
  left,
  top,
  width,
  height,
  type,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: BlockProps) {
  const colors = BLOCK_COLORS[type] || DEFAULT_COLOR;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={type}
      style={{
        position: 'absolute',
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        width: `${width * 100}%`,
        height: `${height * 100}%`,
        border: isActive ? `2px solid ${ACTIVE_COLOR.border}` : `2px solid ${colors.border}`,
        background: isActive ? ACTIVE_COLOR.background : colors.background,
        borderRadius: 4,
        transition: 'border-color 120ms, background 120ms, box-shadow 120ms',
        boxShadow: isActive ? ACTIVE_COLOR.boxShadow : 'none',
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
          <div style={{ fontWeight: 600, color: colors.label }}>{type}</div>
        </div>
      )}
    </div>
  );
}


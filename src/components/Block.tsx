import { BLOCK_COLORS, DEFAULT_COLOR, ACTIVE_COLOR } from '../utils/constants';

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


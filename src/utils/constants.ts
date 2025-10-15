// Color mapping for different block types
export const BLOCK_COLORS: Record<string, { border: string; background: string; label: string }> = {
  'Header': {
    border: '#4f46e5',
    background: 'rgba(79, 70, 229, 0.12)',
    label: '#818cf8',
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
    border: '#7c3aed',
    background: 'rgba(124, 58, 237, 0.12)',
    label: '#a78bfa',
  },
  'Table': {
    border: '#db2777',
    background: 'rgba(219, 39, 119, 0.12)',
    label: '#f9a8d4',
  },
  'Footer': {
    border: '#64748b',
    background: 'rgba(100, 116, 139, 0.12)',
    label: '#cbd5e1',
  },
  'Page Number': {
    border: '#84cc16',
    background: 'rgba(132, 204, 22, 0.12)',
    label: '#bef264',
  },
};

// Default color for unknown block types
export const DEFAULT_COLOR = {
  border: '#f59e0b',
  background: 'rgba(245, 158, 11, 0.12)',
  label: '#fbbf24',
};

// Active state color (blue) used for all types when hovered
export const ACTIVE_COLOR = {
  border: '#2563eb',
  background: 'rgba(37, 99, 235, 0.15)',
  boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.35)',
};


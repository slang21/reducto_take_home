import { BLOCK_COLORS, DEFAULT_COLOR } from '../utils/constants';

type BlockTypeSelectorProps = {
  availableTypes: string[];
  selectedTypes: string[];
  onSelectionChange: (types: string[]) => void;
};

export default function BlockTypeSelector({
  availableTypes,
  selectedTypes,
  onSelectionChange,
}: BlockTypeSelectorProps) {
  const uniqueTypes = Array.from(new Set(availableTypes)).sort();

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onSelectionChange(selectedTypes.filter((t) => t !== type));
    } else {
      onSelectionChange([...selectedTypes, type]);
    }
  };

  return (
    <div style={{ marginBottom: 20, padding: 16, background: '#f8fafc', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Block Types</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onSelectionChange(uniqueTypes)} style={buttonStyle}>
            All
          </button>
          <button onClick={() => onSelectionChange([])} style={buttonStyle}>
            None
          </button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {uniqueTypes.map((type) => {
          const isSelected = selectedTypes.includes(type);
          const color = (BLOCK_COLORS[type] || DEFAULT_COLOR).border;
          
          return (
            <label
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 10px',
                background: '#fff',
                border: `2px solid ${isSelected ? color : '#e5e7eb'}`,
                borderRadius: 6,
                cursor: 'pointer',
                opacity: isSelected ? 1 : 0.5,
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleType(type)}
                style={{ cursor: 'pointer', accentColor: color }}
              />
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
              <span style={{ fontSize: 13 }}>{type}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '4px 12px',
  fontSize: 12,
  border: '1px solid #d1d5db',
  borderRadius: 4,
  background: '#fff',
  cursor: 'pointer',
};


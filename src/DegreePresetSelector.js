import React from 'react';
import { Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const degreePresets = {
  quad: [0, 90, 180, 270],
  half: [0, 180],
  star: [0, 72, 144, 216, 288],
};

const renderPresetLines = (degrees) => {

  const center = 25; // Center of the SVG
  const radius = 20; // Length of the line
  return (
    <svg width="50" height="50" viewBox="0 0 50 50">
      {degrees.map((degree) => {
        const rad = (degree * Math.PI) / 180;
        const x2 = center + radius * Math.cos(rad);
        const y2 = center - radius * Math.sin(rad); // SVG y-axis is downwards
        return <line key={degree} x1={center} y1={center} x2={x2} y2={y2} stroke="black" />;
      })}
    </svg>
  );
};

const DegreePresetSelector = ({ onChange }) => {
  const { t } = useTranslation();

  const handleChange = (value) => {
    if (onChange) {
      onChange(degreePresets[value]);
    }
  };

  return (
    <Select placeholder={t('select_degree_preset')} style={{
      width: '100%',
    }} onChange={handleChange}>
      {Object.entries(degreePresets).map(([preset, degrees]) => (
        <Option key={preset} value={preset}>
          <Row align="middle">
            <Col span={16}>
              {preset} ({degrees.join(', ')})
            </Col>
            <Col span={8}>
              {renderPresetLines(degrees)}
            </Col>
          </Row>
        </Option>
      ))}
    </Select>
  );
};

export default DegreePresetSelector;

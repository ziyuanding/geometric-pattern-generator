import React from 'react';
import { ColorPicker, Row, Col, Divider } from 'antd';
import { presets } from './utils';

const PresetColorPicker = ({ value, param, handleColorChange }) => {
  const customPanelRender = (_, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider
        type="vertical"
        style={{
          height: 'auto',
        }}
      />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      value={value}
      onChangeComplete={(e) => handleColorChange(param[0], param[1], param[2], 'color', e)}
      styles={{
        popupOverlayInner: {
          width: 480,
        },
      }}
      presets={presets}
      panelRender={customPanelRender}
    />
  );
};

export default PresetColorPicker;

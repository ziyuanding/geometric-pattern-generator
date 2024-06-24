import React from 'react';
import { Button, Row, Col, Card, Tooltip, Divider, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { weight2prob, genPresets } from './utils';
import { shape_options, initialData } from './initialData'
import PresetColorPicker from './PresetColorPicker';
import LanguageSwitcher from './LanguageSwitcher';
import PaletteSelector from './PaletteSelector';
import DegreePresetSelector from './DegreePresetSelector';

import { CloseOutlined } from '@ant-design/icons';

const ConfigPanel = ({ data, setData }) => {
  const { t } = useTranslation();

  const handleShapeChange = (layerIndex, shapeIndex, key, value) => {
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex][key] = value;
    setData(newData);
  };

  const handleColorChange = (layerIndex, shapeIndex, colorIndex, key, value) => {
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].colors[colorIndex][key] = value;
    setData(newData);
  };

  const handleDegreeChange = (layerIndex, shapeIndex, degreeIndex, key, value) => {
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].degrees[degreeIndex][key] = value;
    setData(newData);
  };

  const addShape = (layerIndex) => {
    const newData = { ...data };
    const newShape = structuredClone(initialData.layers[0].shapes[0]);
    newData.layers[layerIndex].shapes.push(newShape);
    setData(newData);
  };

  const addLayer = () => {
    const newData = { ...data };
    const newLayer = structuredClone(initialData.layers[0]);
    newData.layers.push(newLayer);
    setData(newData);
  };

  const removeShape = (layerIndex, shapeIndex) => {
    const newShapes = data.layers[layerIndex].shapes.filter((_, index) => index !== shapeIndex);
    const newData = { ...data };
    newData.layers[layerIndex].shapes = newShapes;
    setData(newData);
  };

  const removeLayer = (layerIndex) => {
    const newLayers = data.layers.filter((_, index) => index !== layerIndex);
    setData({ ...data, layers: newLayers });
  };

  const isShapeDeleteDisabled = (layerIndex) => {
    return data.layers[layerIndex].shapes.length === 1;
  };

  const isLayerDeleteDisabled = () => {
    return data.layers.length === 1;
  };

  const isColorDeleteDisabled = (layerIndex, shapeIndex) => {
    return data.layers[layerIndex].shapes[shapeIndex].colors.length === 1;
  };

  const isDegreeDeleteDisabled = (layerIndex, shapeIndex) => {
    return data.layers[layerIndex].shapes[shapeIndex].degrees.length === 1;
  };

  const addColor = (layerIndex, shapeIndex) => {
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].colors.push({ color: '#fe0000', weight: 1 })
    setData(newData);
  }

  const addDegree = (layerIndex, shapeIndex) => {
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].degrees.push({ degree: 0, weight: 1 })
    setData(newData);
  }

  const removeColor = (layerIndex, shapeIndex, colorIndex) => {
    const newColors = data.layers[layerIndex].shapes[shapeIndex].colors.filter((_, index) => index !== colorIndex);
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].colors = newColors;
    setData(newData);
  }

  const removeDegree = (layerIndex, shapeIndex, degreeIndex) => {
    const newDegrees = data.layers[layerIndex].shapes[shapeIndex].degrees.filter((_, index) => index !== degreeIndex);
    const newData = { ...data };
    newData.layers[layerIndex].shapes[shapeIndex].degrees = newDegrees;
    setData(newData);
  }

  const handlePaletteChange = (palette) => {
    console.log('Selected palette:', palette);
  };

  const handleDegreePresetChange = (degrees) => {
    console.log('Selected degrees:', degrees);
  };
  return (
    <div>
      <Button type="primary" onClick={addLayer} style={{ marginBottom: '20px' }}>
        {t('add_layer')}
      </Button>
      <LanguageSwitcher />
      {data.layers.map((layer, layerIndex) => (
        <div key={layerIndex}>
          <Button type="primary" onClick={() => addShape(layerIndex)} style={{ marginBottom: '20px' }}>
            {t('add_panel')}
          </Button>
          <Tooltip title={isLayerDeleteDisabled() ? 'Cannot delete the last layer' : ''}>
            <Button type="primary" danger disabled={isLayerDeleteDisabled()} onClick={() => removeLayer(layerIndex)} style={{ marginBottom: '20px' }}>
              {t('remove_layer')}
            </Button>
          </Tooltip>
          <Row gutter={16}>
            {layer.shapes.map((shape, shapeIndex) => (
              <Col span={6} key={shapeIndex}>
                <Card
                  title={`Shape ${shapeIndex + 1}`}
                  extra={
                    <div>
                      <Tooltip title={isShapeDeleteDisabled(layerIndex) ? 'Cannot delete the last shape' : ''}>
                        <Button type="primary" danger disabled={isShapeDeleteDisabled(layerIndex)} onClick={() => removeShape(layerIndex, shapeIndex)}>
                          {t('remove_panel')}
                        </Button>
                      </Tooltip>
                    </div>
                  }
                  style={{ marginBottom: '20px', backgroundColor: '#ededed' }}
                >

                  {/* Shape */}
                  <Row gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                      <Select
                        defaultValue={shape.shape}
                        style={{ width: '100%' }}
                        options={shape_options}
                        onChange={(value) => handleShapeChange(layerIndex, shapeIndex, 'shape', value)}
                      />
                    </Col>
                    <Col span={6}>
                      <InputNumber
                        min={0}
                        step={0.01}
                        defaultValue={shape.weight}
                        onChange={(value) => handleShapeChange(layerIndex, shapeIndex, 'weight', value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col span={6}>
                      {t('prob')}: {weight2prob(layer.shapes, shape.weight)}
                    </Col>
                  </Row>

                  {/* Color */}
                  <Divider></Divider>
                  <PaletteSelector onChange={handlePaletteChange} />
                  {shape.colors.map((color, colorIndex) => (
                    <Row key={colorIndex} gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                      <Col span={5}>
                        <PresetColorPicker
                          value={color.color}
                          param={[layerIndex, shapeIndex, colorIndex]}
                          handleColorChange={handleColorChange}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {t('weight')}:
                      </Col>
                      <Col span={5}>
                        <InputNumber
                          min={0}
                          step={0.01}
                          value={color.weight}
                          onChange={(value) => handleColorChange(layerIndex, shapeIndex, colorIndex, 'weight', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={6}>
                        {t('prob')}: {weight2prob(shape.colors, color.weight)}
                      </Col>
                      <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title={isColorDeleteDisabled(layerIndex, shapeIndex) ? 'Cannot delete the last color' : ''}>
                          <Button
                            disabled={isColorDeleteDisabled(layerIndex, shapeIndex)}
                            onClick={() => removeColor(layerIndex, shapeIndex, colorIndex)}
                            type="primary" shape="circle" danger
                            icon={<CloseOutlined />}
                            size="small" />
                        </Tooltip>

                      </Col>
                    </Row>
                  ))}
                  <Button onClick={() => addColor(layerIndex, shapeIndex)} style={{
                    width: '100%',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    color: 'white'
                  }}>{t('add_color')}</Button>

                  {/* Degree */}
                  <Divider></Divider>
                  <DegreePresetSelector onChange={handleDegreePresetChange} />
                  {shape.degrees.map((degree, degreeIndex) => (
                    <Row key={degreeIndex} gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                      <Col span={5}>
                        <InputNumber
                          min={0}
                          max={360}
                          step={1}
                          value={degree.degree}
                          onChange={(value) => handleDegreeChange(layerIndex, shapeIndex, degreeIndex, 'degree', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {t('weight')}:
                      </Col>
                      <Col span={5} >
                        <InputNumber
                          min={0}
                          step={0.01}
                          value={degree.weight}
                          onChange={(value) => handleDegreeChange(layerIndex, shapeIndex, degreeIndex, 'weight', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={6}>
                        {t('prob')}: {weight2prob(shape.degrees, degree.weight)}
                      </Col>
                      <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title={isDegreeDeleteDisabled(layerIndex, shapeIndex) ? 'Cannot delete the last degree' : ''}>
                          <Button
                            disabled={isDegreeDeleteDisabled(layerIndex, shapeIndex)}
                            onClick={() => removeDegree(layerIndex, shapeIndex, degreeIndex)}
                            type="primary" shape="circle" danger
                            icon={<CloseOutlined />}
                            size="small" />
                        </Tooltip>
                      </Col>
                    </Row>
                  ))}
                  <Button onClick={() => addDegree(layerIndex, shapeIndex)} style={{
                    width: '100%',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    color: 'white'
                  }}>{t('add_degree')}</Button>

                </Card>
              </Col>
            ))}
          </Row>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ConfigPanel;

import React, { useState } from 'react';
import { Button, InputNumber, Select, Row, Col, Input, Card, Tooltip, Divider } from 'antd';
import 'antd/dist/reset.css';  // 确保引入了样式
import { choice } from './util'

const initialData = {
  layers: [
    {
      shapes: [
        {
          shape: 'blank',
          weight: 1,
          colors: [
            { color: '#FFFFFF', weight: 1 },
            { color: '#D3E5FF', weight: 1 },
            { color: '#A6CAFF', weight: 1 },
            { color: '#79AFFF', weight: 1 },
            { color: '#4C94FF', weight: 1 },
            { color: '#1F79FF', weight: 1 },
          ],
          degrees: [
            { degree: 0, weight: 1 },
            { degree: 90, weight: 1 },
            { degree: 270, weight: 1 },
            { degree: 360, weight: 1 },
          ],
        },
      ],
    }
  ]
};

const shape_options = [
  {
    value: 'circle',
    label: 'circle',
  },
  {
    value: 'quarter_circle',
    label: 'quarter_circle',
  },
  {
    value: 'blank',
    label: 'blank',
  },
  {
    value: 'diagonal',
    label: 'diagonal',
  },
]

const App = () => {
  const [data, setData] = useState(initialData);

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
    newData.layers[layerIndex].shapes = newShapes

    setData(newData);
  };

  const removeLayer = (layerIndex) => {
    const newLayers = data.layers.filter((_, index) => index !== layerIndex);
    setData({ ...data, layers: newLayers });
  };

  function getShape(shapeName, shapeColors, shapeDegrees) {
    const svgns = "http://www.w3.org/2000/svg";
    let shapeElement;
    switch (shapeName) {
      case 'circle':
        shapeElement = document.createElementNS(svgns, 'circle');
        shapeElement.setAttribute('cx', '50');
        shapeElement.setAttribute('cy', '50');
        shapeElement.setAttribute('r', '50');
        break;
      case 'quarter_circle':
        shapeElement = document.createElementNS(svgns, 'path');
        shapeElement.setAttribute('d', 'M0,0 Q0,100 100,100 L100,0 Z');
        break;
      case 'blank':
        shapeElement = document.createElementNS(svgns, 'path');
        shapeElement.setAttribute('d', 'M0,0 L100,0 L100,100 L0,100 Z');
        break;
      case 'diagonal':
        shapeElement = document.createElementNS(svgns, 'path');
        shapeElement.setAttribute('d', 'M0,0 L100,0 L0,100 Z');
        break;
    }
    shapeElement.setAttribute('fill', choice(shapeColors).color);
    shapeElement.setAttribute('transform', `rotate(${choice(shapeDegrees).degree},50,50)`);
    return shapeElement
  }

  function generateSVG(shapeName, shapeColors, shapeDegrees) {
    const svgns = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgns, 'svg');
    // svgElement.setAttribute('width', '100');
    // svgElement.setAttribute('height', '100');
    var svgShape = null
    svgShape = getShape(shapeName, shapeColors, shapeDegrees)
    svgElement.appendChild(svgShape);
    return svgElement;
  }

  function generateAndDisplayPattern() {
    const svgContainer = document.getElementById('svgContainer');
    svgContainer.innerHTML = '';

    const svgTotal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgTotal.setAttribute('width', '1000');
    svgTotal.setAttribute('height', '600');

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        for (let k = 0; k < data.layers.length; k++) {
          const shape = choice(data.layers[k].shapes)
          const shapeName = shape.shape
          const shapeColors = shape.colors
          const shapeDegrees = shape.degrees

          const svg = generateSVG(shapeName, shapeColors, shapeDegrees);
          svg.setAttribute('x', j * 100);
          svg.setAttribute('y', i * 100);
          svgTotal.appendChild(svg);
        }

      }
    }
    let scale = 0.05
    svgTotal.setAttribute('viewBox', `0 0 ${100 / scale} ${100 / scale}`);
    svgContainer.appendChild(svgTotal);
  }


  const isShapeDeleteDisabled = (layerIndex) => {
    return data.layers[layerIndex].shapes.length === 1;
  };

  const isLayerDeleteDisabled = () => {
    return data.layers.length === 1;
  };

  const weight2prob = (arr, weight) => {
    const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);
    const prob = weight / totalWeight
    return prob.toFixed(2);
  }

  return (
    <div style={{ padding: '1px' }} className="container">
      <div className="left-pane">
        <Button type="primary" onClick={addLayer} style={{ marginBottom: '20px' }}>
          添加Layer
        </Button>
        {data.layers.map((layer, layerIndex) => (
          <div>
            <Button type="primary" onClick={() => addShape(layerIndex)} style={{ marginBottom: '20px' }}>
              添加面板
            </Button>

            <Tooltip title={isLayerDeleteDisabled() ? 'Cannot delete the last layer' : ''}>
              <Button type="primary" danger disabled={isLayerDeleteDisabled()} onClick={() => removeLayer(layerIndex)} style={{ marginBottom: '20px' }}>
                删除整层
              </Button>
            </Tooltip>

            <Row gutter={16}>
              {layer.shapes.map((shape, shapeIndex) => (
                <Col span={6} key={shapeIndex}>
                  <Card
                    title={`Shape ${shapeIndex + 1}`}
                    extra={
                      <Tooltip title={isShapeDeleteDisabled(layerIndex) ? 'Cannot delete the last shape' : ''}>
                        <Button type="primary" danger disabled={isShapeDeleteDisabled(layerIndex)} onClick={() => removeShape(layerIndex, shapeIndex)}>删除</Button>
                      </Tooltip>

                    }
                    style={{ marginBottom: '20px' }}
                  >
                    <Row gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                      <Col span={12}>
                        <Select defaultValue={shape.shape} style={{ width: '100%', }} options={shape_options}
                          onChange={(value) => handleShapeChange(layerIndex, shapeIndex, 'shape', value)}>
                        </Select>
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
                        prob: {weight2prob(layer.shapes, shape.weight)}
                      </Col>
                    </Row>



                    {shape.colors.map((color, colorIndex) => (
                      <Row key={colorIndex} gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                        <Col span={12}>
                          <Input
                            type="color"
                            value={color.color}
                            onChange={(e) => handleColorChange(layerIndex, shapeIndex, colorIndex, 'color', e.target.value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col span={6}>
                          <InputNumber
                            min={0}
                            step={0.01}
                            value={color.weight}
                            onChange={(value) => handleColorChange(layerIndex, shapeIndex, colorIndex, 'weight', value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col span={6}>
                          prob: {weight2prob(shape.colors, color.weight)}
                        </Col>
                      </Row>
                    ))}
                    {shape.degrees.map((degree, degreeIndex) => (
                      <Row key={degreeIndex} gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                        <Col span={12}>
                          <InputNumber
                            min={0}
                            max={360}
                            step={1}
                            value={degree.degree}
                            onChange={(value) => handleDegreeChange(layerIndex, shapeIndex, degreeIndex, 'degree', value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col span={6}>
                          <InputNumber
                            min={0}
                            step={0.01}
                            value={degree.weight}
                            onChange={(value) => handleDegreeChange(layerIndex, shapeIndex, degreeIndex, 'weight', value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col span={6}>
                          prob: {weight2prob(shape.degrees, degree.weight)}
                        </Col>
                      </Row>
                    ))}
                  </Card>
                </Col>
              ))}
            </Row>
            <Divider />
          </div>
        ))}

      </div>
      <div className="right-pane">
        <Button onClick={generateAndDisplayPattern}> regenerate </Button>
        <Button> export svg </Button>
        <div id="svgContainer"></div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default App;

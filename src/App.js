import React, { useState } from 'react';
import { Button, InputNumber, Select, Row, Col, Input, Card, Tooltip } from 'antd';
import 'antd/dist/reset.css';  // 确保引入了样式
import { choice } from './util'

const initialData = {
  shapes: [
    {
      shape: 'blank',
      prob: 0.25,
      colors: [
        { color: '#FFFFFF', prob: 0.1667 },
        { color: '#D3E5FF', prob: 0.1667 },
        { color: '#A6CAFF', prob: 0.1667 },
        { color: '#79AFFF', prob: 0.1667 },
        { color: '#4C94FF', prob: 0.1667 },
        { color: '#1F79FF', prob: 0.1667 },
      ],
      degrees: [
        { degree: 0, prob: 0.25 },
        { degree: 90, prob: 0.25 },
        { degree: 270, prob: 0.25 },
        { degree: 360, prob: 0.25 },
      ],
    },
  ],
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

  const handleShapeChange = (shapeIndex, key, value) => {
    const newData = { ...data };
    newData.shapes[shapeIndex][key] = value;
    setData(newData);
  };

  const handleColorChange = (shapeIndex, colorIndex, key, value) => {
    const newData = { ...data };
    newData.shapes[shapeIndex].colors[colorIndex][key] = value;
    setData(newData);
  };

  const handleDegreeChange = (shapeIndex, degreeIndex, key, value) => {
    const newData = { ...data };
    newData.shapes[shapeIndex].degrees[degreeIndex][key] = value;
    setData(newData);
  };

  const addShape = () => {
    const newLayer = structuredClone(initialData.shapes[0]);
    setData({ ...data, shapes: [...data.shapes, newLayer] });
  };

  const removeShape = (shapeIndex) => {
    const newShapes = data.shapes.filter((_, index) => index !== shapeIndex);
    setData({ ...data, shapes: newShapes });
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
    console.log(choice(shapeColors))
    shapeElement.setAttribute('fill', choice(shapeColors).color);
    shapeElement.setAttribute('transform', `rotate(${choice(shapeDegrees).degree},50,50)`);
    return shapeElement
  }

  function generateSVG(shapeName, shapeColors, shapeDegrees) {
    const svgns = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgns, 'svg');
    svgElement.setAttribute('width', '100');
    svgElement.setAttribute('height', '100');
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
        // shape 1, should always be blank shape
        // select a shape
        const shape = choice(data.shapes)
        console.log(data.shapes)
        console.log(choice(data.shapes))
        const shapeName = shape.shape
        const shapeColors = shape.colors
        const shapeDegrees = shape.degrees

        const svg = generateSVG(shapeName, shapeColors, shapeDegrees);
        svg.setAttribute('x', j * 100);
        svg.setAttribute('y', i * 100);
        svgTotal.appendChild(svg);
      }
    }
    let scale = 0.05
    svgTotal.setAttribute('viewBox', `0 0 ${100 / scale} ${100 / scale}`);
    svgContainer.appendChild(svgTotal);
  }

  const isDeleteDisabled = data.shapes.length === 1;

  return (
    <div style={{ padding: '1px' }} className="container">

      <div className="left-pane">
        <Button type="primary" onClick={addShape} style={{ marginBottom: '20px' }}>
          添加面板
        </Button>
        <Row gutter={16}>
          {data.shapes.map((shape, shapeIndex) => (
            <Col span={6} key={shapeIndex}>
              <Card
                title={`Shape ${shapeIndex + 1}`}
                extra={
                  <Tooltip title={isDeleteDisabled ? 'Cannot delete the last layer' : ''}>
                    <Button  type="primary" danger disabled={isDeleteDisabled} onClick={() => removeShape(shapeIndex)}>删除</Button>
                  </Tooltip>
                
              }
                style={{ marginBottom: '20px' }}
              >
                <Row gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                  <Col span={12}>
                    <Select defaultValue={shape.shape} style={{ width: '100%', marginBottom: '10px' }} options={shape_options}
                      onChange={(value) => handleShapeChange(shapeIndex, 'shape', value)}>
                    </Select>
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      min={0}
                      max={1}
                      step={0.01}
                      defaultValue={shape.prob}
                      onChange={(value) => handleShapeChange(shapeIndex, 'shapeProb', value)}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </Row>



                {shape.colors.map((color, colorIndex) => (
                  <Row key={colorIndex} gutter={8} align="middle" style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                      <Input
                        type="color"
                        value={color.color}
                        onChange={(e) => handleColorChange(shapeIndex, colorIndex, 'color', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col span={12}>
                      <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        value={color.prob}
                        onChange={(value) => handleColorChange(shapeIndex, colorIndex, 'prob', value)}
                        style={{ width: '100%' }}
                      />
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
                        onChange={(value) => handleDegreeChange(shapeIndex, degreeIndex, 'degree', value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                    <Col span={12}>
                      <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        value={degree.prob}
                        onChange={(value) => handleDegreeChange(shapeIndex, degreeIndex, 'prob', value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="right-pane">
        <Button onClick={generateAndDisplayPattern}> regenerate </Button>
        <Button> export svg </Button>
        <div id="svgContainer"></div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;

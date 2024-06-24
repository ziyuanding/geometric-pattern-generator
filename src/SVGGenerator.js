import React from 'react';
import { Button, message } from 'antd';

import { choice } from './utils';
import { useTranslation } from 'react-i18next';

const SVGGenerator = ({ data }) => {
  const { t } = useTranslation();

  const generateSVG = (shapeName, shapeColors, shapeDegrees) => {
    const svgns = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgns, 'svg');
    let svgShape = getShape(shapeName, shapeColors, shapeDegrees);
    svgElement.appendChild(svgShape);
    return svgElement;
  };

  const getShape = (shapeName, shapeColors, shapeDegrees) => {
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
    return shapeElement;
  };

  const generateAndDisplayPattern = () => {
    const svgContainer = document.getElementById('svgContainer');
    svgContainer.innerHTML = '';

    const svgTotal = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    for (let i = 0; i < data.grid_ver; i++) {
      for (let j = 0; j < data.grid_hor; j++) {
        for (let k = 0; k < data.layers.length; k++) {
          const shape = choice(data.layers[k].shapes);
          const shapeName = shape.shape;
          const shapeColors = shape.colors;
          const shapeDegrees = shape.degrees;

          const svg = generateSVG(shapeName, shapeColors, shapeDegrees);
          svg.setAttribute('x', j * 100);
          svg.setAttribute('y', i * 100);
          svgTotal.appendChild(svg);
        }
      }
    }

    let height = 0;
    let width = 0;
    const original_aspect_ratio = data.grid_ver / data.grid_hor;

    if (data.grid_ver > data.grid_hor) {
      height = Math.min(600, 500 * original_aspect_ratio);
      width = height / original_aspect_ratio;
    } else {
      width = Math.min(500, 600 * original_aspect_ratio);
      height = width * original_aspect_ratio;
    }
    svgTotal.setAttribute('width', width);
    svgTotal.setAttribute('height', height);
    svgTotal.setAttribute('viewBox', `0 0 ${data.grid_hor * 100} ${data.grid_ver * 100}`);

    svgContainer.appendChild(svgTotal);
  };

  const exportSVG = () => {
    const originalSVG = document.getElementById('svgContainer').querySelector('svg');
    let svgElement = originalSVG.cloneNode(true);

    svgElement.setAttribute('width', data.grid_hor * 100);
    svgElement.setAttribute('height', data.grid_ver * 100);
    svgElement.setAttribute('viewBox', `0 0 ${data.grid_hor * 100} ${data.grid_ver * 100}`);

    const svgContent = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pattern.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data))
      .then(() => {
        message.success('Text copied to clipboard!');
      })
      .catch(err => {
        message.error('Failed to copy text.');
        console.error('Failed to copy text: ', err);
      });
  }
  return (
    <div>
      <Button className="bottom-button" onClick={generateAndDisplayPattern}> {t('regenerate')} </Button>
      <Button className="bottom-button" onClick={exportSVG}> {t('export_svg')} </Button>
      <Button className="bottom-button" onClick={copyJSON}> {t('copy_current_json')} </Button>
    </div>
  );
};

export default SVGGenerator;

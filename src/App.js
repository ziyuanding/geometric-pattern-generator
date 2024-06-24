import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import ConfigPanel from './ConfigPanel';
import SVGGenerator from './SVGGenerator';
import initialData from './initialData';
import LanguageSwitcher from './LanguageSwitcher';

import './App.css';

const App = () => {
  const [data, setData] = useState(initialData);

  const handleGridChange = (key, value) => {
    const newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  return (
    <div style={{ padding: '1px' }} className="container">
      <LanguageSwitcher />
      <div className="left-pane">
        <ConfigPanel data={data} setData={setData} />
      </div>
      <div className="right-pane">
        <div>
          grid_hor:
          <InputNumber
            min={1}
            step={1}
            value={data.grid_hor}
            onChange={(value) => handleGridChange('grid_hor', value)}
          />
          grid_ver:
          <InputNumber
            min={1}
            step={1}
            value={data.grid_ver}
            onChange={(value) => handleGridChange('grid_ver', value)}
          />
        </div>
        <div id="svgContainer"></div>
        <SVGGenerator data={data} />
        <a href="https://www.buymeacoffee.com/ziyuanding" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'right' }}>
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ height: '30px', width: '100px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default App;

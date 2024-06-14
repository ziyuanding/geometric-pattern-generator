import React from 'react';
import { Button, DatePicker, message } from 'antd';
import 'antd/dist/reset.css';  // 确保引入了样式

const App = () => {
  const handleClick = () => {
    message.info('Button clicked!');
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Welcome to My Ant Design Project</h1>
      <DatePicker onChange={(date, dateString) => message.info(`Selected Date: ${dateString}`)} />
      <Button type="primary" onClick={handleClick} style={{ marginLeft: 8 }}>
        Click Me
      </Button>
    </div>
  );
};

export default App;

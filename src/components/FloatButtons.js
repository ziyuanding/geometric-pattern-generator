
import React from 'react';
import { ShareAltOutlined, CoffeeOutlined } from '@ant-design/icons';
import { FloatButton, Button, message } from 'antd';
const FloatButtons = () => {

    const handleCopy = () => {
        const currentUrl = window.location.href; // 获取当前页面的URL
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                message.success('URL copied to clipboard!');
            })
            .catch(err => {
                message.error('Failed to copy URL.');
                console.error('Failed to copy URL: ', err);
            });
    };
    return (
        <FloatButton.Group shape="square" style={{ right: 5 }}>
            <FloatButton onClick={handleCopy} icon={<ShareAltOutlined />} />
            <a href="https://www.buymeacoffee.com/ziyuanding" target="_blank" rel="noopener noreferrer"><FloatButton icon={<CoffeeOutlined />}> </FloatButton>
            </a>
        </FloatButton.Group>
    )
}

export default FloatButtons;

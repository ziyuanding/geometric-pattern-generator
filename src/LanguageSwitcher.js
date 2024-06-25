import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown, Button } from 'antd';
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select defaultValue={'en'} style={{ height: '100%' }} onChange={changeLanguage}>
      <Option value="en"><GlobalOutlined /> English</Option>
      <Option value="zh"><GlobalOutlined /> 中文</Option>
    </Select>
  );
};

export default LanguageSwitcher;
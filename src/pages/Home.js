import React, { useState } from 'react';
import { InputNumber } from 'antd';
import ConfigPanel from '../components/ConfigPanel';
import SVGGenerator from '../components/SVGGenerator';
import { initialData } from '../initialData';
import FloatButtons from '../components/FloatButtons'
import { useTranslation } from 'react-i18next';


const Home = () => {
    const { t } = useTranslation();

    const [data, setData] = useState(initialData);

    const handleGridChange = (key, value) => {
        const newData = { ...data };
        newData[key] = value;
        setData(newData);
    };

    return (
        <div style={{ padding: '1px' }} className="container">

            <div className="left-pane">

                <ConfigPanel data={data} setData={setData} />
            </div>
            <div className="right-pane">
                <div>
                    {t('hor_grid_count')}:
                    <InputNumber
                        min={1}
                        step={1}
                        value={data.grid_hor}
                        onChange={(value) => handleGridChange('grid_hor', value)}
                    />
                    {t('ver_grid_count')}:
                    <InputNumber
                        min={1}
                        step={1}
                        value={data.grid_ver}
                        onChange={(value) => handleGridChange('grid_ver', value)}
                    />
                </div>
                <div id="svgContainer"></div>
                <SVGGenerator data={data} />


                <FloatButtons></FloatButtons>

            </div>
        </div>
    );
};

export default Home;

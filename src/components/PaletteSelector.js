import React, { useState } from 'react';
import { Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const colorPalettes = {
    color_red: ['#FFA07A', '#FA8072', '#E9967A', '#F08080'],
    color_yellow: ['#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5'],
    color_blue: ['#A6CAFF', '#79AFFF', '#4C94FF', '#1F79FF'],
    color_green: ['#98FB98', '#90EE90', '#00FA9A', '#00FF7F'],
};

const PaletteSelector = ({ onChange, param }) => {
    const { t } = useTranslation();
    const [selectedPalette, setSelectedPalette] = useState([]);

    const handleChange = (value) => {
        const selectedColors = colorPalettes[value];
        setSelectedPalette(selectedColors);
        onChange(selectedColors, param[0], param[1]);
    };

    const renderPalette = (palette) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {palette.map((color, index) => (
                <div key={index} style={{ backgroundColor: color, width: '20px', height: '20px', marginRight: '4px' }}></div>
            ))}
        </div>
    );

    return (
        <Select
            placeholder={t('select_palette')}
            onChange={handleChange}
            style={{
                width: '100%',
            }}
        >
            {Object.keys(colorPalettes).map((palette) => (
                <Option key={palette} value={palette}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '8px' }}>
                            {t(palette)}
                        </div>
                        {renderPalette(colorPalettes[palette])}
                    </div>
                </Option>
            ))}
        </Select>
    );
};


export default PaletteSelector

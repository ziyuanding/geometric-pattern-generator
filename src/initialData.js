export const initialData = {
  grid_hor: 10,
  grid_ver: 6,
  layers: [
    {
      shapes: [
        {
          shape: 'blank',
          weight: 1,
          colors: [
            { color: '#BAE0FF', weight: 1 },
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

export const shape_options = [
  { value: 'circle', label: 'circle' },
  { value: 'quarter_circle', label: 'quarter_circle' },
  { value: 'blank', label: 'blank' },
  { value: 'diagonal', label: 'diagonal' },
];

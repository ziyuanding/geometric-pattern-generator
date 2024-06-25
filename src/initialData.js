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
            // { color: '#BAE0FF', weight: 1 },
            // { color: '#D3E5FF', weight: 1 },
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
const svgns = "http://www.w3.org/2000/svg";
export const shape_options = [
  {
    value: 'circle', label: 'circle', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'circle');
      shapeElement.setAttribute('cx', '50');
      shapeElement.setAttribute('cy', '50');
      shapeElement.setAttribute('r', '50');
      return shapeElement
    }
  },
  {
    value: 'quarter_circle', label: 'quarter_circle', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,0 Q0,100 100,100 L100,0 Z');
      return shapeElement
    }
  },
  {
    value: 'blank', label: 'blank', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,0 L100,0 L100,100 L0,100 Z');
      return shapeElement
    }
  },
  {
    value: 'diagonal', label: 'diagonal', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,0 L100,0 L0,100 Z');
      return shapeElement
    }
  },
  {
    value: 'quarter_ring', label: 'quarter_ring', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,0 Q0,100 100,100 L100,0 Z');
      shapeElement.setAttribute('d', 'M0,0 Q0,50 50,50 L50,0 Z');
      return shapeElement
    }
  },
  {
    value: 'half_quarter_ring', label: 'half_quarter_ring', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,0 Q0,50 50,50 L50,0 Z');
      shapeElement.setAttribute('d', 'M0,0 Q0,25 25,25 L25,0 Z');
      return shapeElement
    }
  },
  {
    value: 'four_lines', label: 'four_lines', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M0,20 L100,20 M0,40 L100,40 M0,60 L100,60 M0,80 L100,80');
      shapeElement.setAttribute('stroke-width', '5');
      return shapeElement
    }
  },
  {
    value: 'mid_square', label: 'mid_square', shape: function () {
      let shapeElement;
      shapeElement = document.createElementNS(svgns, 'path');
      shapeElement.setAttribute('d', 'M25,25 L75,25 L75,75 L25,75 Z');
      return shapeElement
    }
  }
];

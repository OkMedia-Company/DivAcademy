

export const colourOptions = [
  { value: '1', label: 'Dərs də iştirak edib', color: '#00ff00', isFixed: true },
  { value: '2', label: 'Dərsə gecikib', color: '#ffff00', isDisabled: false },
  { value: '3', label: 'Dərs də iştirak etməyib', color: '#ff0000' },

];

export const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export const groupedOptions = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];

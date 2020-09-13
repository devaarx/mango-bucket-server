import { ICONS } from '../constants';

const getIcon = (name) => {
  let icon;

  switch (name) {
    case 'SEARCH':
      icon = ICONS.SEARCH;
      break;
    case 'SHOPPING_CART':
      icon = ICONS.SHOPPING_CART;
      break;
    case 'HEART':
      icon = ICONS.HEART;
      break;
    case 'USER':
      icon = ICONS.USER;
      break;

    default:
      break;
  }

  return icon;
};

export default getIcon;

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLink,
  faPowerOff,
  faUser,
  faGear,
  faGripVertical,
  faTrashCan,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faGear);
  library.add(faGripVertical);
  library.add(faTrashCan);
  library.add(faPlus);
}

export default initFontAwesome;

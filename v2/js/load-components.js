import MenuItems from './build-menu-items.js'
import ButtonGroup from './components/ButtonGroup.js';
import ExerciseList from './components/ExerciseList.js';

const loadComponents = {
    [ExerciseList.name]:  ExerciseList(MenuItems),
    // [ButtonGroup.name]:  ButtonGroup(),
};

export default loadComponents;


import {
    renderComponent,
    loadExercise, loadExerciseDescription,
    getHash, sleep,
    getCurrentExercise
} from "./app.js";

import { StartEditor } from "./editor.js";
import loadComponents from "./load-components.js";
import ValidateTypes from "./validate-types.js";
import ExerciseCaseItem from "./components/ExerciseCaseItem.js";
import storage from './storage.js';
import UpdateCaseItem from "./components/UpdateCaseItem.js";
import { STATUS } from "./consts.js";

let editor = StartEditor('editor');

Object.entries(loadComponents).forEach(async ([name, content]) => {
    renderComponent(name, content)
});

let runCodeButton = document.getElementById('run-code');
runCodeButton.addEventListener('click', async () => {
    let exercise = await getCurrentExercise();

    for (let [index, step] of exercise.steps.entries()) {
        let id = `${exercise.name}-${index}`;

        UpdateCaseItem({
            id,
            status: STATUS.LOADING
        });

        await sleep(1);

        for (let [index, assert] of step.assertions.entries()) {
            try {
                if (assert.execute(editor.getValue())) {
                    UpdateCaseItem({
                        id,
                        status: STATUS.SUCCESS
                    });
                }
            } catch (e) {
                UpdateCaseItem({
                    id,
                    status: STATUS.ERROR,
                    message: e.message
                });
                break;
            }
        }
    }
    
});

const bootstrap = async () => {
    let exercise = await getCurrentExercise();
    if(exercise) {
        let content = await loadExerciseDescription(getHash());
        let cases = exercise.steps.map((item, index) => {
            return ExerciseCaseItem({ ...item, id: `${exercise.name}-${index}` });
        });
        renderComponent("ExerciseContentByHash", content);
        renderComponent('ExerciseCases', cases.join(''));
        editor.setValue(storage.rawCode());
    }
};

window.addEventListener('hashchange', bootstrap);

bootstrap()


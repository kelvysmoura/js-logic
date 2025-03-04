import {clickEvent} from '../events.js';
import { toggleElementById } from '../actions.js';


export default function ButtonGroup() {
    let toggleExerciseAction = clickEvent(() => {
        let element = toggleElementById('ExerciseList');
    });

    let toggleCodeAction = clickEvent(() => {
        let element = toggleElementById('ExerciseContent');
    })

    return `
        <div class="mt-5 flex mb-1" id="button-group">
            <button class="bg-red-300 p-2 border-[1px] border-black 2xl:hidden" onclick="${toggleExerciseAction}()">Exercisios</button>
        </div>
    `;
}
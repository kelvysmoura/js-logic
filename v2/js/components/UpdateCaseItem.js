import { ICONS, STATUS } from "../consts.js";
import md from '../markdown.js';

export default function ({id, status, message = ''}) {
    let element = document.getElementById(id);
    let img = element.querySelector(".case-img");
    let divError = element.querySelector('.error-message');

    switch (status) {
        case STATUS.ERROR:
            img.classList.remove('animate-spin');
            img.classList.remove('bg-green-400');
            img.src = ICONS.ATTENTION;
            img.classList.add('bg-red-400')
            divError.innerHTML = md(message);    
            break;
        case STATUS.LOADING:
            img = element.querySelector(".case-img");
            img.src = ICONS.LOADING;
            img.classList.add('animate-spin');
            img.classList.remove('bg-red-400');
            break;
        case STATUS.SUCCESS:
            img.src = ICONS.SUCCESS
            img.classList.remove('animate-spin');
            img.classList.add('bg-green-400');
            divError.innerHTML = "";
            break;
        default:
            break;
    }


    if(status === 0) {
        
    }
}
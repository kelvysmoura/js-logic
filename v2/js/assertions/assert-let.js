
import { CASE_TYPES } from "../consts.js";

import safeGlobalVariable from "../core/safe-global-variable.js";

export default function assertLet({name}) {
    return {
        execute(content) {
            return safeGlobalVariable(name, () => {
                content = `
                    debugger;
                    {
                        ${content}
                    }

                    if(typeof ${name} !== 'undefined') {
                        throw new Error("\`${name}\` deve ser declarada como let");
                    }
                    return true;
                `;
                return (new Function(content))();
            });
        }
    }
}
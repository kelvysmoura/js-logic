
import safeGlobalVariable from "../core/safe-global-variable.js";

export default function assertConst({name}) {
    return {
        execute(content) {
            return safeGlobalVariable(name, () => {
                content = `
                    debugger;
                    try {
                        ${content}
                        ${name} = 123;
                    } catch(e) {
                        return true
                    }
                    
                    throw new Error("\`${name}\` deve ser declarada uma constante");
                `;
                return (new Function(content))();
            });
        }
    }
}
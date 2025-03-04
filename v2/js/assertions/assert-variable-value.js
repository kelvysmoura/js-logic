
import safeGlobalVariable from "../core/safe-global-variable.js";

export default function assertVariableValue({name, value}) {
    return {
        execute(content) {
            return safeGlobalVariable(name, () => {
                content = `
                    ${content}
                    if(${name} !== "${value}") {
                        throw new Error("\`${name}\` deve receber como valor \`${value}\`");
                    }
                    return true;
                `;
                return (new Function(content))();
            });
        }
    }
}
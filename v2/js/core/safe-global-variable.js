
export default function safeGlobalVariable(variableName, process) {
    let oldValue;
    if (window[variableName]) {
        oldValue = window[variableName];
        window[variableName] = undefined;
    }
    let result = process();
    window[variableName] = oldValue;
    return result;
}
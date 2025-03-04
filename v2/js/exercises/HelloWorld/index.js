
import assertConst from "../../assertions/assert-const.js";
import assertLet from "../../assertions/assert-let.js";
import assertVariableValue from "../../assertions/assert-variable-value.js";

const VARIABLE_HELLO_NAME = { name: "hello" };

export default {
    name: "helloworld",
    steps: [
        {
            label: `Variavel hello que guarda a frase "Hello World"`,
            assertions: [
                assertConst({ name: "hello" }),
                assertVariableValue({ name: "hello", value: "Hello World"})
            ]
        }
        
    ]
}
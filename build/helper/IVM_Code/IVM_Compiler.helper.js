"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm2_1 = require("vm2");
exports.javascriptCodeCompilerHelper = (code) => {
    const vm = new vm2_1.VM({
        sandbox: {
            console: {
                log: (output) => {
                    // Instead of logging to console, store the output in a variable
                    vm.output = (vm.output || "") + output + "\n";
                },
            },
        },
    });
    // Execute the code in a sandboxed environment
    vm.run(code);
    // Send the captured output back as the result
    const result = vm.output || "No output";
    return result;
};

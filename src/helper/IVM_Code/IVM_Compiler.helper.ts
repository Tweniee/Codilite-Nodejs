import { VM } from "vm2";

export const javascriptCodeCompilerHelper = (code: string | null) => {
  const vm: any = new VM({
    sandbox: {
      console: {
        log: (output: any) => {
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

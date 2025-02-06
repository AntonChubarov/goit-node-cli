import { exec } from "child_process";

const commands = [
    'node src/index.js -a list',
    'node src/index.js -a get -i "31abfbf7-b0e9-4d3e-9187-bc46ea9caa28"',
    'node src/index.js -a add -n "Mango Jango" -e "mango@gmail.com" -p "(571) 322-2222"',
    'node src/index.js -a remove -i "5802e71e-6975-4200-88f7-d9b937f6a47f"',
    'node src/index.js -a list',
];

commands.forEach(cmd => {
    console.log(`Executing: ${cmd}`);
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
});

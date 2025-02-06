import {program} from "commander";
import {addContact, getContactById, listContacts, removeContact} from "./contacts.js";

program
    .name("contacts-cli")
    .description("A simple CLI tool to manage contacts")
    .version("1.0.0")
    .option("-a, --action <type>", "choose action (list, get, add, remove)")
    .option("-i, --id <type>", "contact ID (required for 'get' and 'remove')")
    .option("-n, --name <type>", "contact name (required for 'add')")
    .option("-e, --email <type>", "contact email (required for 'add')")
    .option("-p, --phone <type>", "contact phone number (required for 'add')")
    .helpOption("-h, --help", "display help for command")
    .showHelpAfterError();

program.parse();
const options = program.opts();

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case "list":
            console.table(await listContacts());
            break;
        case "get":
            console.log(await getContactById(id));
            break;
        case "add":
            console.log(await addContact(name, email, phone));
            break;
        case "remove":
            console.log(await removeContact(id));
            break;
        default:
            console.warn("\x1B[31m Unknown action type! Use --help for usage details.");
    }
}

(async () => {
    await invokeAction(options);
})();

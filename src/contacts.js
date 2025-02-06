import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";

const contactsPath = path.join(process.cwd(), "src", "db", "contacts.json");

async function ensureFileExists() {
    try {
        await fs.access(contactsPath);
    } catch {
        await fs.writeFile(contactsPath, "[]", "utf-8");
    }
}

async function listContacts() {
    await ensureFileExists();
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) return null;

    const removedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {id: uuidv4(), name, email, phone};
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

export {listContacts, getContactById, removeContact, addContact};

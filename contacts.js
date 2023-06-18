const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (idToFind) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === idToFind);

  if (index === -1) {
    console.log("there is no contacts with such id in db");
    return null;
  }

  return contacts.slice(index, index + 1);
};

const removeContact = async (idToFind) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === idToFind);

  if (index === -1) {
    console.log("there is no contacts to delete with such id in db");
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const changeContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === id);

  if (index === -1) {
    console.log("cant change element with such id");
    return null;
  }

  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
};

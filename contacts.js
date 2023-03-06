const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = `${path.dirname("./db/contacts.json")}/${path.basename(
  "./db/contacts.json"
)}`;

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const stringifiedData = data.toString();
    const parsedData = JSON.parse(stringifiedData);

    console.log("Contact list below: ");
    console.table(parsedData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  const stringifiedId = contactId.toString();
  try {
    const data = await fs.readFile(contactsPath);
    const stringifiedData = data.toString();
    const parsedData = JSON.parse(stringifiedData);

    const contactById = parsedData.filter(
      (contact) => contact.id === stringifiedId
    );

    if (contactById[0] === undefined) {
      const parsedArr = [...parsedData];
      console.warn("Wrong id. Try again. Contact list below:");
      console.table(parsedArr);
    }

    console.log(`Contact with id of ${stringifiedId}: `, contactById[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  const stringifiedId = contactId.toString();

  try {
    const data = await fs.readFile(contactsPath);
    const stringifiedData = data.toString();
    const parsedData = JSON.parse(stringifiedData);

    const contactIndex = parsedData.findIndex(
      (contact) => contact.id === stringifiedId
    );
    if (contactIndex === -1) {
      const parsedArr = [...parsedData];
      console.warn("Wrong id. Try again. Contact list below:");
      console.table(parsedArr);
      return false;
    }

    const parsedArr = [...parsedData];
    const removedData = parsedArr.splice(contactIndex, 1);

    const stringifiedArr = JSON.stringify(parsedArr);
    await fs.writeFile(contactsPath, stringifiedArr);

    console.log("You have removed contact: ", removedData[0]);
    console.log("Updated contact list below: ");
    console.table(parsedArr);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const stringifiedData = data.toString();
    const parsedData = JSON.parse(stringifiedData);

    const lastElement = parsedData.slice(-1);
    const newId = Number(lastElement[0].id) + 1;
    const stringifiedNewId = JSON.stringify(newId);
    const dataToSave = { id: stringifiedNewId, name, email, phone };

    const stringifiedArr = JSON.stringify([...parsedData, dataToSave]);
    const parsedArr = JSON.parse(stringifiedArr);

    await fs.writeFile(contactsPath, stringifiedArr);
    console.log(
      `You have added contact for: name: ${name}, email: ${email}, phone: ${phone}`
    );
    console.log("Updated contact list below: ");
    console.table(parsedArr);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

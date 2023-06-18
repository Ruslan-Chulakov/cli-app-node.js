const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse()
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch(action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case 'get':
            const contact = await contacts.getContactById(id);
            return console.log(contact)
        case 'remove':
            const removedContact = await contacts.removeContact(id);
            return console.log(removedContact);
        case 'add':
            const addContact = await contacts.addContact({ name, email, phone })
            return console.log(addContact);
        case 'change':
            const changeContact = await contacts.changeContact( id, {name, email, phone})
            return changeContact;
        default: 
            console.log('You can use actions: [list, get, remove, add, change]')
    }
}

invokeAction(options);

// invokeAction({ action: 'list' });
// invokeAction({ action: "get", id: "1" });
// invokeAction({action: 'remove', id: "1"});
// invokeAction({action: 'add', name: 'Viktor', email:'viktor@kusa4a9.com', phone: '9379992'})
// invokeAction({
//   action: "change",
//   id: "AeHIrLTr6JkxGE6SN-0Rw",
//   name: "Olen",
//   email: "asdlfkasdlf.ante@vestibul.co.uk",
//   phone: "(992) 914-3792- 88888",
// });


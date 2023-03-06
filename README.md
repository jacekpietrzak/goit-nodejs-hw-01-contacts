# Otrzymujemy i wyprowadzamy całą listę kontaktów w postaci tabeli (console.table)

node index.js --action list
![contactList](./assets/contactList.png)

# Otrzymujemy kontakt po id

node index.js --action get --id 5
![getById](./assets/getById.png)

# Dodajemy kontakt

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
![addContact](./assets/addContact.png)

# Usuwamy kontakt

node index.js --action remove --id 3
![removeContact](./assets/removeContact.png)

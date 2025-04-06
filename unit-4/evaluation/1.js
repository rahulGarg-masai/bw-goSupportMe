function filterContact(contacts, query){
    const searchTerm = query.toLowerCase();
    const filteredContacts = contacts.filter(contact=>{
        const name = contact.name.toLowerCase();
        const email = contact.email.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm);

    });
    return filteredContacts.sort((a,b)=>{
        return a.name.localeCompare(b.name);
    });
}
const express = require('express');
const fs = require('node:fs/promises');
const path= require('path');

// creating a middleware 
const app= express();
app.use(express.json());

// creating a port 
PORT = 3000; 


// storing the data in the form of array 
const contacts = []; 
// contacts.push(contact_data);


// Creating the server 
app.get('/', (req,res)=>{
   res.send('Good Morning Everyone'); 
}); 


// Api for storing contact data 
app.post('/contacts',async(req,res)=>{

const {name, email, message}= req.body; 
if (!name|| !email|| !message){
    return res.status(400).json({message: 'Please provide all the fields'});

}
console.log(name,email,message);

// push the data into the arry 
const contact_data = {name,email,message};
contacts.push(contact_data);


// storing the contact information into the file 
try {
    await fs.writeFile('./data.txt', JSON.stringify(contacts,null,2), 'utf8');
    console.log('Data saved successfully');
    res.json({
        message: 'Information successfully sent',
        data: contact_data
    })
}catch(error){
  console.error('Error saving data', error);
   return res.status(500).json({error: 'Failed to save data'});
}

})








app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



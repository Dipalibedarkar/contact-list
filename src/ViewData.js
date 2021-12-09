import React from 'react'


 const ViewData = ({contacts}) => {
    
    return contacts.map(contact=>(
        
        <tr key={contact.iban}>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.address}</td>
            <td>{contact.DOB}</td>
            <td>{contact.phone}</td>
            <td>{contact.iban}</td>           
        </tr>            
    
))
}

export default ViewData;
import React,{useState, useEffect} from 'react'
import View from './ViewData';
import api from './api/contacts'
import { uuid } from 'uuidv4';


// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('contacts');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

 const App = () => {

  // main array of objects state || contacts state || contacts array of objects
  const [contacts, setcontacts]=useState(getDatafromLS());
  // retrive contact data
   const retrieveContacts = async () => {
     const response = await api.get("/contacts");
     return response.data;
   }
  // input field states
  const [name, setName]=useState('');
  const [surname, setSurname]=useState('');
   const [DOB, setDob] = useState('');
   const [address, setAddress]=useState('');
   const [phone, setPhone] = useState('');
   const [iban, setIban]=useState('');
  // form submit event
  const handleAddcontactsubmit= async(e)=>{
    e.preventDefault();

    
    // creating an object
    let contact={
      name,
      surname,
      DOB,
      address,
      phone,
      iban,
    }
    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    setcontacts([...contacts,contact, response]); // contact
    setName('');
    setSurname('');
    setDob('');
    setAddress('');
    setPhone('');
    setIban('');


  }

  // delete contact from LS
  const deleteContact=(DOB)=>{
    const filteredcontacts=contacts.filter((element,index)=>{
      return element.DOB !== DOB
    })
    setcontacts(filteredcontacts);
  }

   useEffect(() => {
     const getAllContacts = async () => {
       const allContacts = await retrieveContacts()
       if (allContacts) setcontacts(allContacts);
     };
     getAllContacts()
   }, []);

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('contacts',JSON.stringify(contacts));
  },[contacts])

  
  return (
    <div className='wrapper'>
      <h1>Contact List</h1>
      
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddcontactsubmit}>
            <label >First Name</label><br></br>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={name}></input>
            <br></br>
            <label >Surname</label><br></br>
            <input type="text" className='form-control' required
            onChange={(e)=>setSurname(e.target.value)} value={surname}></input>
            <br></br>
            <label>D.O.B</label><br></br>
            <input type="date" className='form-control' required
            onChange={(e)=>setDob(e.target.value)} value={DOB}></input>
            <br></br>
            <label>Address</label><br></br>
            <input type="text" className='form-control' required
            onChange={(e)=>setAddress(e.target.value)} value={address}></input>
            <br></br>
            <label>Phone Number</label><br></br>
            <input type="tel" className='form-control'  required
            onChange={(e)=>setPhone(e.target.value)} value={phone}></input>
            <br></br>
            <label>IBAN</label><br></br>
            <input type="text" className='form-control' required
            onChange={(e)=>setIban(e.target.value)} value={iban}></input>
            <br></br><br></br>
            <div>
              <button type="submit" className=' btn-success'>
              Save
            </button></div>
          </form>
        </div>
        
</div><h2>Save Data</h2>
        <div className='view-container'>
          {contacts.length>0&&<>  
            <div className='table-responsive'>
            
              <table className='table'>
                <thead>
                  
                  <tr>
                    <th>Name</th>                  
                    <th>Surname</th>                  
                    <th>Address</th>
                      <th>D.O.B</th>
                    <th>Phone Number</th>
                    <th>IBAN</th>
                  </tr>
                </thead>
                <tbody>
                  <View contacts={contacts} deleteContact={deleteContact}/>
                </tbody>
              </table>
            </div>
            <br></br>
          <br></br>
          {/* //created remove button for try and test
             <button className='btn-success'
            onClick={()=>setcontacts([])}>Remove All</button> */}
          </>}
          {contacts.length < 1 && <div>No contacts are added yet</div>}
        </div>

      </div>
    
  )
}

export default App;



import React, { Component } from 'react';
// import './App.css';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
      screen: 'list', //list, create
      contacts: []
  }
  componentDidMount(){
        ContactsAPI.getAll().then( (contacts)=>{
            this.setState({contacts})
        } )
  }


  removeContact = contact =>{
      console.log('removing contact');
      this.setState( (state)=>({
            contacts: state.contacts.filter( c => c.id !== contact.id)
          })
      )
      ContactsAPI.remove(contact)
  }

    render() {
    return (
      <div className="App">
          {this.state.screen === 'list' && (
              <ListContacts
                  contacts={this.state.contacts}
                  onDeleteContact={this.removeContact}
                  onNavigate={() =>{
                      this.setState({screen: 'create'})
                  }}
              />
               )
          }
          {this.state.screen === 'create' && (
              <CreateContact/>
          )}

      </div>
    );
  }
}

export default App;

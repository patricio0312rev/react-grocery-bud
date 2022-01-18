import { useState } from "react";
import List from "./components/list.component";
import Alert from './components/alert.component';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if(!name) {
      // Display alert if value is empty
      showAlert(true, 'danger', 'This value can not be empty');
    } else if (name && isEditing) {
      // Deal with edit
    } else {
      // Show alert
      showAlert(true, 'success', 'Item added successfully')

      const newItem = {
        id: new Date().getTime().toString(), 
        title: name
      }

      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type="", msg="") => {
    setAlert({
      show,
      type,
      msg
    })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed');

    setList(list.filter((item) => item.id !== id));
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Grocery Bud</h3>

        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn">
            { isEditing ? 'Edit' : 'Submit' }
          </button>
        </div>
      </form>

      {
        list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem}/>
            <button className="clear-btn" onClick={clearList}>Clear Items</button>
          </div>
        )
      }

    </section>
  );
}

export default App;

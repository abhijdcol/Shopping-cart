import "./App.css";
import {
  Card,
  Button,
  EditableText,
  Toaster,
  Position,
} from "@blueprintjs/core";
import axios from "axios";
import { useEffect, useState } from "react";

const AppToaster = Toaster.create({
  position: Position.TOP,
});

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const onChangeHandler = (id, key, value) => {
    setPersons((values) => {
      return values.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  const updateData = (id) => {
    const data = persons.find((item) => item.id === id);
    axios.put(`http://localhost:5000/persons/${id}`, data).then((response) => {
      AppToaster.show({
        message: "Data updated successfully",
        intent: "success",
        timeout: 3000,
      });
    });
  };
  return (
    <div className="App">
      <Card>
        <table className="bp3-html-table .modifier">
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => {
              return (
                <tr key={person.id}>
                  <td>
                    <EditableText
                      value={person.name}
                      onChange={(value) =>
                        onChangeHandler(person.id, "name", value)
                      }
                    />
                  </td>
                  <td>
                    <EditableText
                      value={person.jobTitle}
                      onChange={(value) =>
                        onChangeHandler(person.id, "jobTitle", value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      intent="primary"
                      onClick={() => updateData(person.id)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// function App() {
//   const [users, setUsers] = useState([]);

//   const fetchData = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     setUsers(users);
//     return users;
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="app">
//       <Card>
//         <table style={{ border: "2px solid red", padding: "10px" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "2px solid red" }}>Title</th>
//               <th style={{ border: "2px solid red" }}>Body</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//     </div>
//   );
// }
export default App;

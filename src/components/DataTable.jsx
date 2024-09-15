import { useState } from "react";
import "./DataTable.css";

const DataTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      city: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      city: "Los Angeles",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      city: "Chicago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      city: "Houston",
    },
    {
      id: 5,
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      city: "Phoenix",
    },
    {
      id: 6,
      name: "Sophia Brown",
      email: "sophia.brown@example.com",
      city: "Philadelphia",
    },
    {
      id: 7,
      name: "James Taylor",
      email: "james.taylor@example.com",
      city: "San Antonio",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      city: "San Diego",
    },
    {
      id: 9,
      name: "Liam Anderson",
      email: "liam.anderson@example.com",
      city: "Dallas",
    },
    {
      id: 10,
      name: "Ava Thomas",
      email: "ava.thomas@example.com",
      city: "San Jose",
    },
  ]);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [newUser, setNewUser] = useState({
    id: null,
    name: "",
    email: "",
    city: "",
  });

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      item.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  // Open the modal for adding a new user
  const handleOpenAddModal = () => {
    setIsEditing(false); // Add mode
    setNewUser({ id: null, name: "", email: "", city: "" });
    setIsModalOpen(true);
  };

  // Open the modal for editing an existing user
  const handleEdit = (user) => {
    setIsEditing(true); // Edit mode
    setNewUser(user);
    setIsModalOpen(true);
  };

  // Save the edited or new user
  const handleSaveUser = () => {
    if (newUser.name && newUser.email && newUser.city) {
      if (isEditing) {
        // Update existing user
        setData(data.map((item) => (item.id === newUser.id ? newUser : item)));
      } else {
        // Add new user
        setData([...data, { id: data.length + 1, ...newUser }]);
      }
      setNewUser({ id: null, name: "", email: "", city: "" });
      setIsModalOpen(false); // Close modal on success
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handlers for deleting a user
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="data-table-container">
      <h1>Data Form Searching </h1>
      <div className="search-boxes">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>

      <button className="add-user-btn" onClick={handleOpenAddModal}>
        Add User
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
            <div className="modal-inputs">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={newUser.city}
                onChange={(e) =>
                  setNewUser({ ...newUser, city: e.target.value })
                }
              />
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveUser}>
                  {isEditing ? "Update" : "Save"}
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

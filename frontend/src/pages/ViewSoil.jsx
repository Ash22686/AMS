import React, { useState, useEffect } from 'react';

function ViewSoil() {
  const [soils, setSoils] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSoil, setEditSoil] = useState(null);
  const token = localStorage.getItem("token");

  // Load soil data from the server
  useEffect(() => {
    fetch("http://localhost:8080/soils" , {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSoils(data))
      .catch((error) => console.error("Error fetching soils:", error));
  }, []);

  // Delete function
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/soils/${id}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then(() => {
      const updatedSoils = soils.filter((soil) => soil.id !== id);
      setSoils(updatedSoils);
    })
    .catch((error) => console.error("Error deleting soil:", error));
  };

  // Edit function (start editing)
  const handleEdit = (soil) => {
    setIsEditing(true);
    setEditSoil(soil);
  };

  // Save edit changes
  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/soils/${editSoil.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editSoil),
    })
    .then((response) => response.json())
    .then(() => {
      const updatedSoils = soils.map((soil) =>
        soil.id === editSoil.id ? editSoil : soil
      );
      setSoils(updatedSoils);
      setIsEditing(false);
      setEditSoil(null);
    })
    .catch((error) => console.error("Error updating soil:", error));
  };

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSoil((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Farm Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Soil Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              pH
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Moisture
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {soils.map((soil) => (
            <tr key={soil.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing && editSoil?.id === soil.id ? (
                  <input
                    type="text"
                    name="farm"
                    value={editSoil.farm}
                    onChange={handleInputChange}
                    className="text-sm text-gray-900"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {soil.farm}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editSoil?.id === soil.id ? (
                  <input
                    type="text"
                    name="soiltype"
                    value={editSoil.soiltype}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  soil.soiltype
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editSoil?.id === soil.id ? (
                  <input
                    type="text"
                    name="ph"
                    value={editSoil.ph}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  soil.ph
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editSoil?.id === soil.id ? (
                  <input
                    type="text"
                    name="moisture"
                    value={editSoil.moisture}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  soil.moisture
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {isEditing && editSoil?.id === soil.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(soil)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(soil.id)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewSoil;

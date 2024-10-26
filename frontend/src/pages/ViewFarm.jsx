import React, { useState, useEffect } from 'react';

function ViewFarm() {
  const [farms, setFarms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFarm, setEditFarm] = useState(null);
  const token = localStorage.getItem("token");

  // Load farm data from the server
  useEffect(() => {
    fetch("http://localhost:8080/farms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return setFarms(data);
      })
      .catch((error) => console.error("Error fetching farms:", error));
  }, []);

  // Delete function
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/farm/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Farm deleted successfully:', data);
      const updatedFarms = farms.filter(farm => farm.id !== id);
      setFarms(updatedFarms);
    })
    .catch(error => console.error('Error deleting farm:', error));
  };
  

  // Edit function (start editing)
  const handleEdit = (farm) => {
    setIsEditing(true);
    setEditFarm(farm);
  };

 // Save edit changes
 const handleSaveEdit = () => {
  // Ensure the date is in 'YYYY-MM-DD' format
  const formattedDatePlanted = new Date(editFarm.datePlanted).toISOString().split('T')[0];

  const updatedFarm = { ...editFarm, datePlanted: formattedDatePlanted };

  fetch(`http://localhost:8080/farm/${editFarm.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFarm),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Farm updated successfully:', data);
    const updatedFarms = farms.map(farm =>
      farm.id === editFarm.id ? updatedFarm : farm
    );
    setFarms(updatedFarms);
    setIsEditing(false);
    setEditFarm(null);
  })
  .catch(error => console.error('Error updating farm:', error));
};


  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFarm((prev) => ({ ...prev, [name]: value }));
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
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Area
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crop Planted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Planted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expected Yield
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {farms.map((farm) => (
            <tr key={farm.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="farmName"
                    value={editFarm.farmName}
                    onChange={handleInputChange}
                    className="text-sm text-gray-900"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {farm.farmName}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="farmLocation"
                    value={editFarm.farmLocation}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  farm.farmLocation
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="farmArea"
                    value={editFarm.farmArea}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  farm.farmArea
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="cropPlanted"
                    value={editFarm.cropPlanted}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  farm.cropPlanted
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="datePlanted"
                    value={editFarm.datePlanted}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  new Date(farm.datePlanted).toLocaleDateString()
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editFarm?.id === farm.id ? (
                  <input
                    type="text"
                    name="expectedYield"
                    value={editFarm.expectedYield}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  farm.expectedYield
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {isEditing && editFarm?.id === farm.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(farm)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(farm.id)}
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

export default ViewFarm;

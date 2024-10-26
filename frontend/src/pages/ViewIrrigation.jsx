import React, { useState, useEffect } from "react";

function ViewIrrigation() {
  const [irrigations, setIrrigations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIrrigation, setEditIrrigation] = useState(null);
  const token = localStorage.getItem("token");

  // Load irrigation data from the server
  useEffect(() => {
    fetch("http://localhost:8080/irrigations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setIrrigations(data))
      .catch((error) => console.error("Error fetching irrigations:", error));
  }, []);

  // Delete function
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/irrigation/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedIrrigations = irrigations.filter(
          (irrigation) => irrigation.id !== id
        );
        setIrrigations(updatedIrrigations);
      })
      .catch((error) => console.error("Error deleting irrigation:", error));
  };

  // Edit function (start editing)
  const handleEdit = (irrigation) => {
    setIsEditing(true);
    setEditIrrigation(irrigation);
  };

  // Save edit changes
  const handleSaveEdit = () => {
    // Ensure the irrigation date is in 'YYYY-MM-DD' format
    const formattedIrrigationDate = new Date(editIrrigation.irrigationDate)
      .toISOString()
      .split("T")[0];

    const updatedIrrigation = {
      ...editIrrigation,
      irrigationDate: formattedIrrigationDate,
    };

    fetch(`http://localhost:8080/irrigation/${editIrrigation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIrrigation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Irrigation updated successfully:", data);
        const updatedIrrigations = irrigations.map((irrigation) =>
          irrigation.id === editIrrigation.id ? updatedIrrigation : irrigation
        );
        setIrrigations(updatedIrrigations);
        setIsEditing(false);
        setEditIrrigation(null);
      })
      .catch((error) => console.error("Error updating irrigation:", error));
  };

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditIrrigation((prev) => ({ ...prev, [name]: value }));
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
              Crop Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Irrigation Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {irrigations.map((irrigation) => (
            <tr key={irrigation.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing && editIrrigation?.id === irrigation.id ? (
                  <input
                    type="text"
                    name="farmName"
                    value={editIrrigation.farmName}
                    onChange={handleInputChange}
                    className="text-sm text-gray-900"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {irrigation.farmName}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editIrrigation?.id === irrigation.id ? (
                  <input
                    type="text"
                    name="cropName"
                    value={editIrrigation.cropName}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  irrigation.cropName
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editIrrigation?.id === irrigation.id ? (
                  <input
                    type="text"
                    name="irrigationQuantity"
                    value={editIrrigation.irrigationQuantity}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  irrigation.irrigationQuantity
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editIrrigation?.id === irrigation.id ? (
                  <input
                    type="text"
                    name="irrigationDate"
                    value={editIrrigation.irrigationDate}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  new Date(irrigation.irrigationDate).toLocaleDateString()
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {isEditing && editIrrigation?.id === irrigation.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(irrigation)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(irrigation.id)}
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

export default ViewIrrigation;

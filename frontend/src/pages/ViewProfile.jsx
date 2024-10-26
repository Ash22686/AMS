import React, { useState, useEffect } from 'react';

function ViewProfile() {
  const [profiles, setProfiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const token = localStorage.getItem("token");

  // Load profiles from the server
  useEffect(() => {
    fetch("http://localhost:8080/profiles" , {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  // Edit function (start editing)
const handleEdit = (profile) => {
  setIsEditing(true);
  setEditProfile(profile);
};

// Save edit changes
const handleSaveEdit = () => {
  fetch(`http://localhost:8080/profile/${editProfile.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editProfile),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Profile updated successfully:', data);
    const updatedProfiles = profiles.map(profile =>
      profile.id === editProfile.id ? editProfile : profile
    );
    setProfiles(updatedProfiles);
    setIsEditing(false);
    setEditProfile(null);
  })
  .catch(error => console.error('Error updating profile:', error));
};

// Delete function
const handleDelete = (id) => {
  fetch(`http://localhost:8080/profile/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Profile deleted successfully:', data);
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
  })
  .catch(error => console.error('Error deleting profile:', error));
};


  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mobile Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing && editProfile?.id === profile.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleInputChange}
                    className="text-sm text-gray-900"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    {profile.name}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editProfile?.id === profile.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editProfile.email}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  profile.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editProfile?.id === profile.id ? (
                  <input
                    type="text"
                    name="location"
                    value={editProfile.location}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  profile.location
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isEditing && editProfile?.id === profile.id ? (
                  <input
                    type="text"
                    name="mobileNumber"
                    value={editProfile.mobileNumber}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500"
                  />
                ) : (
                  profile.mobileNumber
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {isEditing && editProfile?.id === profile.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(profile)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(profile.id)}
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

export default ViewProfile;

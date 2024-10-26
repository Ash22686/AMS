import React, { useEffect, useState, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      VanillaTilt.init(imageRef.current, {
        max: 25,
        speed: 600,
        glare: true,
        'max-glare': 0.2,
      });
    }
  
    // Cleanup
    return () => {
      if (imageRef.current && imageRef.current.vanillaTilt) {
        imageRef.current.vanillaTilt.destroy();
      }
    };
  }, []);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    fetch('http://localhost:8080/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setFormData({ name: '', email: '', message: '' }); // Reset form after success
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    });
  };

  return (
    <div className='pt-4 pb-16 px-8 max-w-7xl mx-auto gap-28 glass'>
      <ToastContainer />
      <form className='contact flex justify-evenly' onSubmit={handleSubmit}>
        <div className='contact_img mt-24' ref={imageRef}>
          <img src='contact.png' alt='Contact'/>
        </div>

        <div className='contact_content flex-col'>
          <div className="max-w-sm space-y-3 w-[85vw]">
            <h1 className='bgclr h'>CONTACT US</h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-3 px-5 block w-full border-gray-200 rounded-full text-sm"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-3 px-5 block w-full border-gray-200 rounded-full text-sm"
              placeholder="Email"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="py-3 px-5 block w-full h-40 border-gray-200 rounded-xl text-sm"
              placeholder="Message"
              required
            />
            <button
              type="submit"
              className="bg-purple-500 w-full text-white py-3 px-10 rounded-xl hover:bg-purple-600 text-lg mt-5"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Contact;

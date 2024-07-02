import React, { useState } from 'react';
import { task } from './api/server';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function TaskPage() {
  const [email, setEmail] = useState('');
  const [additionalContent, setAdditionalContent] = useState('');

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleAdditionalContent = (event) => {
    setAdditionalContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const values = {
        email,
        additionalContent,
      };

      const response = await task(values);

      console.log('Response:', response);

      // Show success toast
      toast.success(response.message);

      // Clear the form fields
      setEmail('');
      setAdditionalContent('');

    } catch (error) {
      console.error('Error sending task:', error);

      // Show error toast
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('שגיאה בשליחת המשימה');
      }
    }
  };

  return (
    <div className='main_class' dir='rtl'>
      <div className='inner_class'>
        <form onSubmit={handleSubmit}>
          <h3 className='title'>הכנס משימה חדשה:</h3>
          <label><strong>הכנס אימייל:</strong></label>
          <input
            type="email"
            placeholder='הכנס אימייל'
            name='email'
            value={email}
            onChange={handleInput}
            className='form-control rounded-0'
            required
          />
          <label><strong>הוסף תוכן נוסף:</strong></label>
          <textarea
            placeholder='הוסף תוכן נוסף להודעה'
            name='additionalContent'
            value={additionalContent}
            onChange={handleAdditionalContent}
            className='form-control rounded-0'
          />
          <div className='text-center'>
            <button type='submit' className='btn btn-primary mt-3 mr-2'>שלח משימה</button>
          </div>
          <div className='text-center'>
            <Link to="/HomePage" className='btn btn-primary mt-3 mr-2'>חזור לדף הבית</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default TaskPage;
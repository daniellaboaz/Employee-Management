// frontend/src/RegisterPage
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import RegisterValidation from './ValidationFolder/RegisterValidation';

function RegisterPage() {
    // Initialize state with values from localStorage or defaults
    const [values, setValues] = useState({
        id: '',
        name: '',
        phone: '',
        email: '',
        employee_image: ''
    });

    const [errors, setErrors] = useState({});
    const [showReview, setShowReview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('tempRegistrationData'));
        if (savedData) {
            setValues(savedData);
        }
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'employee_image') {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newValues = { ...values, employee_image: reader.result };
                setValues(newValues);
                localStorage.setItem('tempRegistrationData', JSON.stringify(newValues));
            };
            reader.readAsDataURL(file);
        } else {
            const newValues = { ...values, [name]: value };
            setValues(newValues);
            localStorage.setItem('tempRegistrationData', JSON.stringify(newValues));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = RegisterValidation(values);
        setErrors(err);

        if (Object.keys(err).every(key => err[key] === "")) {
            setShowReview(true);
        } else {
            toast.error("Please fill in all fields correctly.");
        }
    };

   const handleConfirm = () => {
    try {
        // Save current user to localStorage
        localStorage.setItem('registrationData', JSON.stringify(values));

        toast.success(
            <div>
                הפרטים נשמרו בהצלחה
            </div>
        );

        setTimeout(() => {
            navigate('/register2Page'); 
        }, 1000);
    } catch (error) {
        console.error('Error saving data:', error);
        toast.error("Failed to save data. Please try again later.");
    }
};

    const handleEdit = () => {
        setShowReview(false);
    };

    return (
        <div className='main_class'>
            <div className='inner_class'>
                <h2 className='title'>:הוספת עובד חדש</h2>
                <h3 className='title'>שלב 1: פרטי העסקת העובד</h3>
                {!showReview ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='id' className='title'><strong>תעודת זהות</strong></label>
                            <input 
                                type='number' 
                                placeholder='הכנס מספר תעודת זהות' 
                                name='id'
                                value={values.id}
                                onChange={handleInput} 
                                className='form-control rounded-0' 
                            />
                            {errors.id && <span className='text-danger'> {errors.id} </span>}
                        </div>
                        <div>
                            <label htmlFor='name' className='title'><strong>שם מלא</strong></label>
                            <input 
                                type='text' 
                                placeholder='הכנס שם פרטי ושם משפחה' 
                                name='name'
                                value={values.name}
                                onChange={handleInput} 
                                className='form-control rounded-0' 
                            />
                            {errors.name && <span className='text-danger'> {errors.name} </span>}
                        </div>
                        <div>
                            <label htmlFor='phone' className='title'><strong>מספר טלפון</strong></label>
                            <input 
                                type='number' 
                                placeholder='הכנס מספר טלפון נייד' 
                                name='phone'
                                value={values.phone}
                                onChange={handleInput} 
                                className='form-control rounded-0' 
                            />
                            {errors.phone && <span className='text-danger'> {errors.phone} </span>}
                        </div>
                        <div>
                            <label htmlFor='email' className='title'><strong>אימייל</strong></label>
                            <input 
                                type='email' 
                                placeholder='הכנס אימייל אישי' 
                                name='email'
                                value={values.email}
                                onChange={handleInput} 
                                className='form-control rounded-0' 
                            />
                            {errors.email && <span className='text-danger'> {errors.email} </span>}
                        </div>
                        <div>
                            <label htmlFor='employee_image' className='title'><strong>תמונת עובד</strong></label>
                            <input 
                                type='file' 
                                accept='image/*' 
                                name='employee_image' 
                                onChange={handleInput} 
                                className='form-control rounded-0' 
                            />
                            {errors.employee_image && <span className='text-danger'> {errors.employee_image} </span>}
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary mt-3 mr-2 '>המשך</button>
                        </div>
                        <div className='text-center'>
                            <Link to="/HomePage" className='btn btn-primary mt-3 mr-2'>חזור לדף הבית</Link>
                        </div>
                        
                    </form>
                ) : (
                    <div className='review' dir='rtl'>
                        <h3>סיכום פרטי העובד:</h3>
                        <p><strong>תעודת זהות:</strong> {values.id}</p>
                        <p><strong>שם:</strong> {values.name}</p>
                        <p><strong>מספר טלפון:</strong> {values.phone}</p>
                        <p><strong>אימייל אישי:</strong> {values.email}</p>
                        {values.employee_image && (<img src={values.employee_image} alt="Employee" className='review-image' />)}
                        <div className='text-center'>
                            <button className='btn btn-primary mt-3 mr-2' onClick={handleConfirm}>אישור והמשך</button>
                            <button className='btn btn-secondary mt-3' onClick={handleEdit}>עריכה</button>
                        </div>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}

export default RegisterPage;

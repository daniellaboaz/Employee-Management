// frontend/src/Register2Page
import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register2Validation from './ValidationFolder/Register2Validation';

function Register2Page() {
    const localStorageKey = 'registrationData_page2';

    // Initialize state with values from localStorage or defaults
    const [values, setValues] = useState({
        id: '',  
        employee_type: '',
        start_date: '',
        Department: '',
        role: '',
        employee_manager: '',
        manager_role: '',
        meeting_location_building: '',
        meeting_location_floor: '',
        meeting_location_room: '',
        meeting_location_station: ''
    });

    const [errors, setErrors] = useState({});
    const [showReview, setShowReview] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(localStorageKey));
        if (savedData) {
            setValues(savedData);
        }
        // Retrieve id from localStorage (assuming it's saved on previous registration step)
        const idFromLocalStorage = localStorage.getItem('registrationData') ? JSON.parse(localStorage.getItem('registrationData')).id : '';
        setValues(prevValues => ({
            ...prevValues,
            id: idFromLocalStorage  // Update id in state with value from localStorage
        }));
    }, [localStorageKey]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        localStorage.setItem(localStorageKey, JSON.stringify(newValues));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Register2Validation(values);
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
            localStorage.setItem(localStorageKey, JSON.stringify(values));
            toast.success(
                <div>
                    הפרטים נשמרו בהצלחה
                </div>
            );
            setTimeout(() => {
                navigate('/register3Page'); 
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
                <h2 className='title'>הוספת עובד חדש</h2>
                <h3 className='title'> תעודת זהות: {values.id}</h3>
                <h3 className='title'> שלב 2: פרטי העסקת העובד</h3>
                {!showReview ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='employee_type' className='title'><strong>סוג עובד</strong></label>
                            <div className="radio-buttons">
                                <label className="radio-label">
                                    <input type='radio' value='contractor' name='employee_type' onChange={handleInput} checked={values.employee_type === 'contractor'} className='form-check-input' />קבלן
                                </label>
                                <label className="radio-label">
                                    <input type='radio' value='Municipal' name='employee_type' onChange={handleInput} checked={values.employee_type === 'Municipal'} className='form-check-input' />עירייה
                                </label>
                            </div>
                            {errors.employee_type && <span className='text-danger'> {errors.employee_type} </span>}
                        </div>
                        <div>
                            <label htmlFor='start_date' className='title'><strong>תאריך תחילת עבודה</strong></label>
                            <input type='date' name='start_date' value={values.start_date} onChange={handleInput} className='form-control rounded-0' />
                            {errors.start_date && <span className='text-danger'> {errors.start_date} </span>}
                        </div>
                        <div>
                            <label htmlFor='Department' className='title'><strong>מחלקה</strong></label>
                            <select name='Department' value={values.Department} onChange={handleInput} className='form-control rounded-0'>
                                <option value='non'>בחר מחלקה</option>
                                <option value='security_department'>ביטחון</option>
                                <option value='bookkeeping_department'>גזברות והנהלת חשבונות</option>
                                <option value='human_department'>הון אנושי</option>
                                <option value='income_department'>הכנסות</option>
                                <option value='engineering_department'>הנדסה</option>
                            </select>
                            {errors.Department && <span className='text-danger'> {errors.Department} </span>}
                        </div>
                        <div>
                            <label htmlFor='role' className='title'><strong>תפקיד</strong></label>
                            <input type='text' name='role' value={values.role} onChange={handleInput} className='form-control rounded-0' />
                            {errors.role && <span className='text-danger'> {errors.role} </span>}
                        </div>
                        <div>
                            <label htmlFor='employee_manager' className='title'><strong>שם המנהל</strong></label>
                            <input type='text' name='employee_manager' value={values.employee_manager} onChange={handleInput} className='form-control rounded-0' />
                            {errors.employee_manager && <span className='text-danger'> {errors.employee_manager} </span>}
                        </div>
                        <div>
                            <label htmlFor='manager_role' className='title'><strong>תפקיד המנהל</strong></label>
                            <input type='text' name='manager_role' value={values.manager_role} onChange={handleInput} className='form-control rounded-0' />
                            {errors.manager_role && <span className='text-danger'> {errors.manager_role} </span>}
                        </div>
                        <div>
                            <label htmlFor='meeting_location' className='title'><strong>מיקום הישיבה</strong></label>
                            <div className="meeting-locations">
                                <div className="location-item">
                                    <label htmlFor='meeting_location_building'>בניין</label>
                                    <input type='text' name='meeting_location_building' value={values.meeting_location_building} onChange={handleInput} className='form-control rounded-0' />
                                    {errors.meeting_location_building && <span className='text-danger'> {errors.meeting_location_building} </span>}
                                </div>
                                <div className="location-item">
                                    <label htmlFor='meeting_location_floor'>קומה</label>
                                    <input type='number' name='meeting_location_floor' value={values.meeting_location_floor} onChange={handleInput} className='form-control rounded-0' />
                                    {errors.meeting_location_floor && <span className='text-danger'> {errors.meeting_location_floor} </span>}
                                </div>
                                <div className="location-item">
                                    <label htmlFor='meeting_location_room'>חדר</label>
                                    <input type='text' name='meeting_location_room' value={values.meeting_location_room} onChange={handleInput} className='form-control rounded-0' />
                                    {errors.meeting_location_room && <span className='text-danger'> {errors.meeting_location_room} </span>}
                                </div>
                                <div className="location-item">
                                    <label htmlFor='meeting_location_station'>עמדה</label>
                                    <input type='text' name='meeting_location_station' value={values.meeting_location_station} onChange={handleInput} className='form-control rounded-0' />
                                    {errors.meeting_location_station && <span className='text-danger'> {errors.meeting_location_station} </span>}
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary mt-3'>המשך</button>
                        </div>
                        <div className='text-center'>
                            <Link to="/registerPage" className='btn btn-primary mt-3 mr-2'>חזור לדף קודם</Link>
                        </div>
                    </form>
                ) : (
                    <div className='review' dir='rtl'>
                        <h4 className='title'>סיכום פרטי עסקת העובד</h4>
                        <p><strong>סוג עובד:</strong> {values.employee_type}</p>
                        <p><strong>תאריך תחילת עבודה:</strong> {values.start_date}</p>
                        <p><strong>מחלקה:</strong> {values.Department}</p>
                        <p><strong>תפקיד:</strong> {values.role}</p>
                        <p><strong>שם המנהל:</strong> {values.employee_manager}</p>
                        <p><strong>תפקיד המנהל:</strong> {values.manager_role}</p>
                        <p><strong>מיקום הישיבה:</strong></p>
                        <p>בניין: {values.meeting_location_building}</p>
                        <p>קומה: {values.meeting_location_floor}</p>
                        <p>חדר: {values.meeting_location_room}</p>
                        <p>עמדה: {values.meeting_location_station}</p>
                        <div className='text-center'>
                            <button className='btn btn-primary mt-3 mr-2' onClick={handleConfirm}>אישור והמשך</button>
                            <button className='btn btn-secondary mt-3' onClick={handleEdit}>עריכה</button>
                        </div>
                    </div>
                )}
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register2Page;
// frontend/src/Register3Page
import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register3Validation from './ValidationFolder/Register3Validation';
import { register3, register2, register } from './api/server';


function Register3Page() {
    const localStorageKey = 'registrationData_page3';

    // Initialize state with values from localStorage or defaults
    const [values, setValues] = useState({
        id: '',
        authorization: '',
        classification: '',
        Laptop: '',
        mobile: '',
        car: '',
        chosen_classification: '',
        chosen_models: ''
    });

    const [errors, setErrors] = useState({});
    const [showReview, setShowReview] = useState(false);
    const [chooseItems, setChooseItems] = useState([]);
    const [chosenItems, setChosenItems] = useState([]);
    const [chooseModels, setChooseModels] = useState([]);
    const [chosenModels, setChosenModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(localStorageKey));
        if (savedData) {
            setValues(savedData);
            setChosenItems(savedData.chosen_classification ? JSON.parse(savedData.chosen_classification) : []);
            setChosenModels(savedData.chosen_models ? JSON.parse(savedData.chosen_models) : []);
        }
        // Retrieve id from localStorage (assuming it's saved on previous registration step)
        const idFromLocalStorage = localStorage.getItem('registrationData') ? JSON.parse(localStorage.getItem('registrationData')).id : '';
        setValues(prevValues => ({
            ...prevValues,
            id: idFromLocalStorage
        }));
    }, []);

    useEffect(() => {
        const initialChooseItems = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ].filter(item => !chosenItems.some(chosen => chosen.id === item.id));
        setChooseItems(initialChooseItems);

        const initialChooseModels = [
            { id: 1, name: 'Model 1' },
            { id: 2, name: 'Model 2' },
            { id: 3, name: 'Model 3' }
        ].filter(item => !chosenModels.some(chosen => chosen.id === item.id));
        setChooseModels(initialChooseModels);
    }, [chosenItems, chosenModels]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
        updateLocalStorage(newValues, chosenItems, chosenModels);
    };

    const handleItemClick = (item) => {
        let newChooseItems, newChosenItems;
        if (chooseItems.includes(item)) {
            newChooseItems = chooseItems.filter(i => i.id !== item.id);
            newChosenItems = [...chosenItems, item];
        } else {
            newChosenItems = chosenItems.filter(i => i.id !== item.id);
            newChooseItems = [...chooseItems, item];
        }
        setChooseItems(newChooseItems);
        setChosenItems(newChosenItems);
        updateLocalStorage(values, newChosenItems, chosenModels);
    };

    const handleModelsClick = (item) => {
        let newChooseModels, newChosenModels;
        if (chooseModels.includes(item)) {
            newChooseModels = chooseModels.filter(i => i.id !== item.id);
            newChosenModels = [...chosenModels, item];
        } else {
            newChosenModels = chosenModels.filter(i => i.id !== item.id);
            newChooseModels = [...chooseModels, item];
        }
        setChooseModels(newChooseModels);
        setChosenModels(newChosenModels);
        updateLocalStorage(values, chosenItems, newChosenModels);
    };

    const updateLocalStorage = (updatedValues, updatedChosenItems, updatedChosenModels) => {
        const updatedData = {
            ...updatedValues,
            chosen_classification: JSON.stringify(updatedChosenItems),
            chosen_models: JSON.stringify(updatedChosenModels)
        };
        localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = Register3Validation(values);
        setErrors(err);

        if (Object.keys(err).every(key => err[key] === "")) {
            setShowReview(true);
        } else {
            toast.error("Please fill in all fields correctly.");
        }
    };

    const handleConfirm = async () => {
        try {
            // Retrieve data from localStorage
            const registrationData = JSON.parse(localStorage.getItem('registrationData'));
            const registrationDataPage2 = JSON.parse(localStorage.getItem('registrationData_page2'));
            const registrationDataPage3 = JSON.parse(localStorage.getItem('registrationData_page3'));
    
            // API call to send data to backend endpoints
            await Promise.all([
                register(registrationData),
                register2(registrationDataPage2),
                register3(registrationDataPage3)
            ]);
    
            // Clear localStorage after successful submission
            localStorage.removeItem('tempRegistrationData');
            localStorage.removeItem('registrationData');
            localStorage.removeItem('registrationData_page2');
            localStorage.removeItem('registrationData_page3');
    
            toast.success("העובד נשמר בהצלחה");
            setTimeout(() => {
                navigate('/HomePage');
            }, 1000);
        } catch (error) {
            console.error('Error saving data:', error);
            if (error.response && error.response.status === 400 && error.response.data.error === 'ER_DUP_ENTRY') {
                toast.error("פרטים מסויימים נמצאו כפולים וכבר קיימים, אנא בדוק שוב את הפרטים");
            } else {
                toast.error("Failed to save data2. Please try again later.");
            }
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
                <h3 className='title'>שלב 3: רמת הסיווג ומתן הרשאות למערכת</h3>
                {!showReview ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='classification' className='title'><strong>רמת סיווג נדרשת</strong></label>
                            <div className="radio-buttons">
                                {['1', '2', '3', '4', '5'].map(level => (
                                    <label key={level} className="radio-label">
                                        <input type='radio' value={`classification${level}`} name='classification' onChange={handleInput} checked={values.classification === `classification${level}`} className='form-check-input' />
                                        {level}
                                    </label>
                                ))}
                            </div>
                            {errors.classification && <span className='text-danger'> {errors.classification} </span>}
                        </div>
                        <div>
                            <label htmlFor='authorizations' className='title'><strong>מתן הרשאות למערכות</strong></label>
                            <div className='boxes-container'>
                                <div className='box chosen'><h3>מערכות שנבחרו</h3>
                                    {chosenItems.map(item => (
                                        <div key={item.id} className='box-item' onClick={() => handleItemClick(item)}>{item.name}</div>
                                    ))}
                                </div>
                                <div className='box choose'><h3>בחירת מערכות</h3>
                                    {chooseItems.map(item => (
                                        <div key={item.id} className='box-item' onClick={() => handleItemClick(item)}>{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='boxes-container'>
                                <div className='box chosen'><h3>מודלים שנבחרו</h3>
                                    {chosenModels.map(item => (
                                        <div key={item.id} className='box-item' onClick={() => handleModelsClick(item)}>{item.name}</div>
                                    ))}
                                </div>
                                <div className='box choose'><h3>בחירת מודלים למערכת</h3>
                                    {chooseModels.map(item => (
                                        <div key={item.id} className='box-item' onClick={() => handleModelsClick(item)}>{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="radio-container">
                            <div className="radio-buttons">
                                <label className="radio-label">
                                    <input type='radio' value='read' name='authorization' onChange={handleInput} checked={values.authorization === 'read'} className='form-check-input' />
                                    קריאה
                                </label>
                                <label className="radio-label">
                                    <input type='radio' value='edit' name='authorization' onChange={handleInput} checked={values.authorization === 'edit'} className='form-check-input' />
                                    עריכה
                                </label>
                            </div>
                            <label htmlFor='authorization' className='title'><strong>מתן הרשאה</strong></label>
                            {errors.authorization && <span className='text-danger'> {errors.authorization} </span>}
                        </div>
                        <div className="radio-container">
                            <div className="radio-buttons">
                                <label className="radio-label">
                                    <input type='radio' value='Laptop_no' name='Laptop' onChange={handleInput} checked={values.Laptop === 'Laptop_no'} className='form-check-input' />
                                    לא
                                </label>
                                <label className="radio-label">
                                    <input type='radio' value='Laptop_yes'
                                    name='Laptop' onChange={handleInput} checked={values.Laptop === 'Laptop_yes'} className='form-check-input' />
                                    כן
                                </label>
                            </div>
                            <label htmlFor='Laptop' className='title'><strong>זכאי למחשב נייד</strong></label>
                            {errors.Laptop && <span className='text-danger'> {errors.Laptop} </span>}
                        </div>
                        <div className="radio-container">
                            <div className="radio-buttons">
                                <label className="radio-label">
                                    <input type='radio' value='mobile_no' name='mobile' onChange={handleInput} checked={values.mobile === 'mobile_no'} className='form-check-input' />
                                    לא
                                </label>
                                <label className="radio-label">
                                    <input type='radio' value='mobile_yes' name='mobile' onChange={handleInput} checked={values.mobile === 'mobile_yes'} className='form-check-input' />
                                    כן
                                </label>
                            </div>
                            <label htmlFor='mobile' className='title'><strong>זכאי לפלאפון</strong></label>
                            {errors.mobile && <span className='text-danger'> {errors.mobile} </span>}
                        </div>
                        <div className="radio-container">
                            <div className="radio-buttons">
                                <label className="radio-label">
                                    <input type='radio' value='car_no' name='car' onChange={handleInput} checked={values.car === 'car_no'} className='form-check-input' />
                                    לא
                                </label>
                                <label className="radio-label">
                                    <input type='radio' value='car_yes' name='car' onChange={handleInput} checked={values.car === 'car_yes'} className='form-check-input' />
                                    כן
                                </label>
                            </div>
                            <label htmlFor='car' className='title'><strong>זכאי לרכב</strong></label>
                            {errors.car && <span className='text-danger'> {errors.car} </span>}
                        </div>
                        
                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary'>המשך</button>
                        </div>

                        <div className='text-center'>
                            <Link to="/register2Page" className='btn btn-primary mt-3 mr-2'>חזור לדף קודם</Link>
                        </div>
                    </form>
                    
                ) : (
                    <div className='review' dir='rtl'>
                        <h4 className='title'>סיכום רמת סיווג ומתן הרשאות</h4>
                        <div>
                            <strong>רמת סיווג שנבחרה: </strong>{values.classification}
                        </div>
                        <div>
                            <strong>מערכות שנבחרו: </strong>{chosenItems.map(item => item.name).join(', ')}
                        </div>
                        <div>
                            <strong>מודלי מערכת שנבחרו: </strong>{chosenModels.map(item => item.name).join(', ')}
                        </div>
                        <div>
                            <strong>ניתן הרשאות של: </strong>{values.authorization === 'read' ? 'קריאה' : 'עריכה'}
                        </div>
                        <div>
                            <strong>האם זכאי למחשב נייד: </strong>{values.Laptop === 'Laptop_yes' ? 'כן' : 'לא'}
                        </div>
                        <div>
                            <strong>האם זכאי לטלפון: </strong>{values.mobile === 'mobile_yes' ? 'כן' : 'לא'}
                        </div>
                        <div>
                            <strong>האם זכאי לרכב: </strong>{values.car === 'car_yes' ? 'כן' : 'לא'}
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-primary mt-3 mr-2' onClick={handleConfirm}>אישור ושמירת עובד</button>
                            <button className='btn btn-secondary mt-3' onClick={handleEdit}>עריכה</button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register3Page;

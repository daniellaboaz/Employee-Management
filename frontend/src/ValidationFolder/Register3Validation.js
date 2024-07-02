// frontend/src/ValidationFolder/Register3Validation.js

const Register3Validation = (values) => {
    let errors = {};

    // Check if classification is selected
    if (!values.classification) {
        errors.classification = 'יש לבחור רמת סיווג נדרשת';
    }

    // Check if authorization is selected
    if (!values.authorization) {
        errors.authorization = 'יש לבחור הרשאה נדרשת';
    }

    // Check if Laptop is selected
    if (!values.Laptop) {
        errors.Laptop = 'יש לבחור האם זכאי למחשב נייד';
    }

    // Check if mobile is selected
    if (!values.mobile) {
        errors.mobile = 'יש לבחור האם זכאי לטלפון נייד';
    }

    // Check if car is selected
    if (!values.car) {
        errors.car = 'יש לבחור האם זכאי לרכב';
    }

    return errors;
};

export default Register3Validation;
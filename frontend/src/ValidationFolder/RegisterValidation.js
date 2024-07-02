// frontend/src/ValidationFolder/RegisterValidation.js

function RegisterValidation(values) {
    let errors = {};

    // Validate id (must be 9 numbers, not null)
    if (!values.id || values.id.length !== 9 || isNaN(values.id)) {
        errors.id = "ID must be 9 digits";
    } else {
        errors.id = "";
    }

    // Validate name (not null and at least one space)
    if (!values.name || !/\s/.test(values.name.trim())) {
        errors.name = "Name should not be empty and should include at least one space";
    } else {
        errors.name = "";
    }

    // Validate phone (must be 10 numbers, not null)
    if (!values.phone || values.phone.length !== 10 || isNaN(values.phone)) {
        errors.phone = "Phone must be 10 digits";
    } else {
        errors.phone = "";
    }

    // Validate email (not null and valid email format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email || !emailPattern.test(values.email)) {
        errors.email = "Enter a valid email address";
    } else {
        errors.email = "";
    }

    // Validate employee_image (not null)
    if (!values.employee_image) {
        errors.employee_image = "Please upload an image";
    } else {
        errors.employee_image = "";
    }

    return errors;
}

export default RegisterValidation;
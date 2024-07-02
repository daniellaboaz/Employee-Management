// frontend/src/ValidationFolder/Register2Validation.js

function Register2Validation(values) {
    let errors = {};

    // Validate employee_type
    if (!values.employee_type) {
        errors.employee_type = "Please select an employee type";
    } else {
        errors.employee_type = "";
    }

    // Validate start_date
    if (!values.start_date) {
        errors.start_date = "Please enter the start date";
    } else {
        errors.start_date = "";
    }

    // Validate role
    if (!values.role) {
        errors.role = "Please enter the role";
    } else {
        errors.role = "";
    }

    // Validate employee_manager
    if (!values.employee_manager) {
        errors.employee_manager = "Please enter the employee manager";
    } else {
        errors.employee_manager = "";
    }

    // Validate manager_role
    if (!values.manager_role) {
        errors.manager_role = "Please enter the manager role";
    } else {
        errors.manager_role = "";
    }

   // Validate Department
   if (!values.Department || values.Department === 'non') {
    errors.Department = "Please select a department";
} else {
    errors.Department = "";
}


    // Validate meeting_location_station
    if (!values.meeting_location_station) {
        errors.meeting_location_station = "Please enter meeting location 1";
    } else {
        errors.meeting_location_station = "";
    }

    // Validate meeting_location_room
    if (!values.meeting_location_room) {
        errors.meeting_location_room = "Please enter meeting location 2";
    } else {
        errors.meeting_location_room = "";
    }

    // Validate meeting_location_floor
    if (!values.meeting_location_floor) {
        errors.meeting_location_floor = "Please enter meeting location 3";
    } else {
        errors.meeting_location_floor = "";
    }

    // Validate meeting_location_building
    if (!values.meeting_location_building) {
        errors.meeting_location_building = "Please enter meeting location 4";
    } else {
        errors.meeting_location_building = "";
    }

    return errors;
}

export default Register2Validation;
import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import styles from './SignUpForm.module.css'; // Import the CSS module

function SignUpForm() {
  const onSubmit = async (event) => {
    event.preventDefault();

    // // You can access form data using event.target
    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData);

    // // Check for pen name uniqueness here (e.g., API call)
    // const isPenNameUnique = await checkPenNameUniqueness(data.penName);

    // if (!isPenNameUnique) {
    //   // Handle the error
    //   return;
    // }

    // Continue with Clerk's registration process
    // Your registration API call or Clerk's built-in process
  };

  return (
    <div className={styles['registration-form']}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className={styles['form-group']}>
          <label className={styles['label']} htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={styles['input']}
          />
        </div>
        
        <div className={styles['form-group']}>
          <label className={styles['label']} htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            required
            className={styles['input']}
          />
        </div>
        <button type="submit" className={styles['submit-button']}>Register</button>
      </form>
    </div>
  );
}

export default SignUpForm;

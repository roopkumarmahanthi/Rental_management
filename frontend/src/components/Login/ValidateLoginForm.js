function ValidateLoginForm(data){
   
    const {phonenumber, password} =data;
    const errors={};

  //1.validate phonenumber
  if (!/^[6-9]\d{9}$/.test(phonenumber)) {
    errors.phonenumber = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.";
  }

  //2.validate password
   if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
   } else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must contain at least one uppercase letter.";
   } else if (!/[a-z]/.test(password)) {
    errors.password = "Password must contain at least one lowercase letter.";
   } else if (!/[0-9]/.test(password)) {
    errors.password = "Password must contain at least one number.";
   } else if (!/[!@#$%^&*]/.test(password)) {
    errors.password = "Password must contain at least one special character (!@#$%^&*).";
   }
   return errors;

}
export default ValidateLoginForm
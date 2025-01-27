function ValidateAddDetailsForm(data){
     const errors={};
     if (!/^[6-9]\d{9}$/.test(data.ownerPhone)){
        errors.phonenumber = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.";
      }
    if(data.houseType.length===0){
              errors.houseType="select the houseType";
    }
    if(data.bhkType.length===0){
        errors.bhkType="select the bhkType";
    }
    return errors;
}
export default ValidateAddDetailsForm
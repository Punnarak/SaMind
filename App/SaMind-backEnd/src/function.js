function validateForm() {
    let x = document.forms["form"]["email"].value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (x == "") {
      alert("Email must be filled out");
      
      return false;
    } else if (re.test(String(x).toLowerCase()) == false) {
      alert("Email must be valid");
    
      return false;
    }
    return true;
  }

module.exports = validateForm
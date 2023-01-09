// importing Employee constructor 
const Employee = require('./Employee');

// manager constructor extends employee constructor 
class Manager extends Employee {
    constructor (managerName, id, email, officeNumber) {
        // calling employee constructor
        super (managerName, id, email); 
        
        this.officeNumber = officeNumber; 
    }

    // override employee role to manager 
    getRole () {
        return "Manager";
    }
}

// to be exported 
module.exports = Manager; 
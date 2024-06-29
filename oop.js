class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    getCountedSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary = this.baseSalary + 200;
        }
        return salary;
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff; 
    }

    getCountedSalary() {
        return super.getCountedSalary() * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team; 
    }

    getCountedSalary() {
        let salary = super.getCountedSalary();
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }

        let developerCount = this.team.filter(member => member instanceof Developer).length;
        if (developerCount > this.team.length / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers; 
    }
    giveSalary() {
        this.managers.forEach(manager => {
            console.log(`${manager.firstName} ${manager.lastName} отримав ${manager.getCountedSalary()} шекелів`);
            manager.team.forEach(member => {
                console.log(`${member.firstName} ${member.lastName} отримав ${member.getCountedSalary()} шекелів`);
            });
        });
    }
}

const dev1 = new Developer('John', 'Doe', 1000, 3);
const dev2 = new Developer('Jane', 'Smith', 1200, 6);
const des1 = new Designer('Alice', 'Brown', 1100, 4, 0.8);
const des2 = new Designer('Bob', 'White', 1300, 2, 0.9);

const manager1 = new Manager('George', 'Black', 1500, 7, [dev1, dev2, des1, des2]);
const department = new Department([manager1]);

department.giveSalary();

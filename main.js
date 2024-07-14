#! /usr/bin/env node
import inquirer from "inquirer";
//banl account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $ ${amount} successfull . Remaing balance: ${this.balance}`);
        }
        else {
            console.log("insufficient balance.");
        }
    }
    // credit money 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than 100$ is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $ ${amount} successsful. Remaing balance : $${this.balance}`);
    }
    //cheak balance 
    cheakBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
// customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2100)
];
// create customers
const customers = [
    new Customer("Farnaz", "Khan", "Female", 22, 3162223334, accounts[0]),
    new Customer("Saba", "Mughal", "Female", 21, 3172253634, accounts[1]),
    new Customer("Alishba", "Amir", "Female", 19, 3452223334, accounts[2])
];
//function to ineterect with bank account 
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`welcome! ${customer.firstName}${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", " Withdraw", "Cheak Balance", " Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit: "
                        }]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw: "
                        }]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Cheak Balance":
                    customer.account.cheakBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program ....");
                    console.log("\n Thankyou for using our bank services. Have a good day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number.. please try again.");
        }
    } while (true);
}
service();

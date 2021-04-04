

// Customer Class: Represents a Customer
class Customer {
    constructor(name, balance, accNum) {
      this.name = name;
      this.balance = balance;
      this.accNum = accNum;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayCustomers() {
      const Customers = Store.getCustomers();
  
      Customers.forEach((Customer) => UI.addCustomerToList(Customer));
    }
  
    static addCustomerToList(Customer) {
      const list = document.querySelector('#customer-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td class="forsearch">${Customer.name}</td>
        <td>${Customer.balance}</td>
        <td class="foredit">${Customer.accNum}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">X</a>||
           
        </td>
        <td>
         <button class="btn btn-primary" id="edit">edit</button> 
        </td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteCustomer(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
      }
      
      static addBalance(accNum) {
        const Customers = Store.getCustomers();
  
      Customers.forEach((Customer, index) => {
        if(Customer.accNum === accNum) {
            Customer.accNum === accNum;
        }
      });
  
      
      }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#Customer-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#balance').value = '';
      document.querySelector('#accNum').value = '';
      }
      


  }
  
  // Store Class: Handles Storage
  class Store {
    static getCustomers() {
      let Customers;
      if(localStorage.getItem('Customers') === null) {
        Customers = [];
      } else {
        Customers = JSON.parse(localStorage.getItem('Customers'));
      }
  
      return Customers;
    }
  
    static addCustomer(Customer) {
      const Customers = Store.getCustomers();
      Customers.push(Customer);
      localStorage.setItem('Customers', JSON.stringify(Customers));
    }


    static addBalance(accNum , balance) {
      
 
    }
  
    static removeCustomer(accNum) {
      const Customers = Store.getCustomers();
  
      Customers.forEach((Customer, index) => {
        if(Customer.accNum === accNum) {
          Customers.splice(index, 1);
        }
      });
  
      localStorage.setItem('Customers', JSON.stringify(Customers));
    }
  }
  
  // Event: Display Customers
  document.addEventListener('DOMContentLoaded', UI.displayCustomers);
  
  // Event: Add a Customer
  document.querySelector('#customer-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const name = document.querySelector('#name').value;
    const balance = document.querySelector('#balance').value;
    const accNum = document.querySelector('#accNum').value;
  
    // Validate
    if(name === '' || balance === '' || accNum === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate Customer
      const customer = new Customer(name, balance, accNum);
  
      // Add Customer to UI
      UI.addCustomerToList(customer);
  
      // Add Customer to store
      Store.addCustomer(customer);
  
      // Show success message
      UI.showAlert('Customer Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });



  
  // Event: Remove a Customer
  document.querySelector('#customer-list').addEventListener('click', (e) => {
    // Remove Customer from UI
    UI.deleteCustomer(e.target);
  
    // Remove Customer from store
    Store.removeCustomer(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Customer Removed', 'success');
  });

    // Search with customer Name

document.querySelector('#search').addEventListener('keyup', (e) => {

      // get search value
    const search = document.querySelector('#search').value;

   // get customer name 
    const customerName = document.getElementsByClassName('forsearch');

    
    for (let index = 0; index < customerName.length; index++) {
        const element = customerName[index];
        console.log(element.innerHTML)

        if (search != '') {
            
            if (element.innerHTML.toLocaleLowerCase().indexOf(search.toLocaleLowerCase())<0 ) {
                element.parentElement.classList.add('hidden');
            } else {
                
                element.parentElement.classList.remove('hidden');
            }
            
            
        } else {
            element.parentElement.classList.remove('hidden');
        }  
    }  
   
});


      // show balance form    

document.querySelector('.showaddcust').addEventListener('click', (e) => {
   
 
    const balform = document.querySelector('#balance-form');
    const cusform = document.querySelector('#customer-form');
    
   // balform.classList.toggle('hidden');
    cusform.classList.toggle('hidden'); 
   
  
})

      // show Customer form 

document.querySelector('.showaddbalance').addEventListener('click', (e) => {
   
 
    const balform = document.querySelector('#balance-form');
   // const cusform = document.querySelector('#customer-form');

    balform.classList.toggle('hidden');
  //cusform.classList.toggle('hidden');

 
  
 
});

    // add balance with accNum
document.querySelector('#balance-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
   
    const balance = document.querySelector('#balance1').value;
    const accNum = document.querySelector('#accNum1').value;

    const customers = Store.getCustomers();
    customers.forEach(ele => {
      console.log(ele.accNum);
      console.log(ele.balance)
      let b = parseInt(ele.balance)
      let a = parseInt(balance)
      if (ele.accNum===accNum) {
        b = b + a
        ele.balance = b;
        console.log(ele.balance)

        localStorage.setItem('Customers', JSON.stringify(customers));
            // Show success message
        UI.showAlert('balance Added  please Refresh page ', 'success');
        
     
      }
      
   
    })

  
    
 
});



  








class Student {
  constructor(name, surname, id,email,address) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.email = email;
    this.address = address;
  }
}


class UI {
  static displayStudent() {
    const students = Store.getStudent();

    students.forEach((student) => UI.addStudentToList(student));
  }

  static addStudentToList(student) {
    const list = document.querySelector('#Student-form');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.surname}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.address}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteStudent(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#Student-Registration-form');
    container.insertBefore(div, form);


    setTimeout(() => document.querySelector('.alert').remove(), 4000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#surname').value = '';
    document.querySelector('#id').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#address').value = '';
  }
}


class Store {
  static getStudent() {
    let students;
    if(localStorage.getItem('students') === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem('students'));
    }

    return students;
  }

  static addStudent(student) {
    const students = Store.getStudent();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  static removeStudent(address) {
    const students = Store.getStudent();

    students.forEach((student, index) => {
      if(student.address === address) {
        students.splice(index, 1);
      }
    });

    localStorage.setItem('students', JSON.stringify(students));
  }
}


document.addEventListener('DOMContentLoaded', UI.displayStudent);


document.querySelector('#Student-Registration-form').addEventListener('submit', (e) => {
 
  e.preventDefault();

 
  const name = document.querySelector('#name').value;
  const surname = document.querySelector('#surname').value;
  const id = document.querySelector('#id').value;
  const contact = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;

  
  if(name === '' || surname === '' || id === '' || email === '' || address === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
  
    const student = new Student(name, surname, id, email, address);

    UI.addStudentToList(student);

    
    Store.addStudent(student);

  
    UI.showAlert('Student Added', 'success');

 
    UI.clearFields();
  }
});

// Event: Remove a Student
document.querySelector('#Student-form').addEventListener('click', (e) => {
  // Remove student from UI
  UI.deleteStudent(e.target);

  // Remove student from store
  Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Student Removed', 'success');
});



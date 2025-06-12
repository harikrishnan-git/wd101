const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');

    // Load existing data from localStorage
    window.onload = () => {
      const saved = JSON.parse(localStorage.getItem('entries')) || [];
      saved.forEach(entry => addEntryToTable(entry));
    };

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const accepted = document.getElementById('terms').checked;

      if (!isValidAge(dob)) {
        alert("Age must be between 18 and 55 years.");
        return;
      }

      const entry = { name, email, password, dob, accepted };
      addEntryToTable(entry);
      saveEntry(entry);

      form.reset();
    });

    function addEntryToTable(entry) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.accepted}</td>
      `;
      tableBody.appendChild(row);
    }

    function saveEntry(entry) {
      const saved = JSON.parse(localStorage.getItem('entries')) || [];
      saved.push(entry);
      localStorage.setItem('entries', JSON.stringify(saved));
    }

    function isValidAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();

      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      const d = today.getDate() - birthDate.getDate();
      if (m < 0 || (m === 0 && d < 0)) {
        return age - 1 >= 18 && age - 1 <= 55;
      }
      return age >= 18 && age <= 55;
    }

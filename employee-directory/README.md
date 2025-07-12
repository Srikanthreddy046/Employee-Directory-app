# Employee Directory App

A simple, responsive Employee Directory application that allows users to add, edit, delete, search, filter, and sort employees with pagination support.

---

## ✨ Features

* List all employees in card format
* Add new employees via popup form
* Edit and delete employee entries
* Real-time search
* Filter by name, department, and role
* Sort by selected fields
* Pagination with user-defined items per page
* Responsive layout and modern UI

---

## 🚀 Setup and Run Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/employee-directory-app.git
   cd employee-directory-app
   ```

2. **Open **\`\`** in your browser**: You can simply double-click the file or use a live server (like VS Code Live Server extension).

3. **No backend required**: This project runs entirely in the browser with mock data.

---

---

## 🗂️ Project Structure

```
employee-directory-app/
├── main/
│   └── resources/
│       └── templates/
│           ├── dashboard.html      # Main dashboard layout
│           └── dashboard.ftlh      # Freemarker template (if used)
├── static/
│   ├── css/
│   │   └── style.css              # All styles for layout and components
│   └── js/
│       ├── app.js                 # Employee manager logic
│       └── data.js                # Mock employee data
└── README.md                      # Project documentation
```

---

## 🤔 Reflection

### Challenges Faced

* Managing responsive layout for the employee cards
* Ensuring the filter popup positions correctly on all screen sizes
* Keeping UI interactions smooth without any frameworks

### Improvements with More Time

* Add persistent storage via localStorage or backend API
* Add avatar image for each employee
* Export employee data to CSV or PDF
* Add animations and loading indicators
* Add tests for edge cases (form validation, large datasets)

---

Feel free to contribute or fork this project!

**Author:** Srikanth Reddy
**Year:** 2025

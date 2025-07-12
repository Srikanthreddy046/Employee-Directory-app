<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <div id="employee-list-container">
            <#list employees as employee>
                <div class="employee-card" data-employee-id="${employee.id}">
                    <h3>${employee.firstName} ${employee.lastName}</h3>
                    <p>ID: ${employee.id}</p>
                    <p>Email: ${employee.email}</p>
                    <p>Department: ${employee.department}</p>
                    <p>Role: ${employee.role}</p>
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            </#list>
        </div>
        <button id="add-employee-btn">Add Employee</button>
        <div id="pagination-controls"></div>
        <input type="text" id="search-input" placeholder="Search by name or email">
        <button id="filter-btn">Filter</button>
        <div id="filter-panel" class="hidden">
            <input type="text" id="filter-firstname" placeholder="First Name">
            <input type="text" id="filter-department" placeholder="Department">
            <input type="text" id="filter-role" placeholder="Role">
            <button id="apply-filter-btn">Apply Filter</button>
        </div>
        <select id="sort-select">
            <option value="firstName">Sort by First Name</option>
            <option value="department">Sort by Department</option>
        </select>
        <div id="form-container" class="hidden"></div>
    </div>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>

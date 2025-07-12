// Employee Manager Module
const EmployeeManager = {
    employees: [...mockEmployees],
    filteredEmployees: [],
    currentPage: 1,
    itemsPerPage: 10,
    filter: {},
    sortKey: 'firstName',
    searchQuery: '',
    editingEmployee: null,

    renderList() {
        let data = [...this.employees];
        // Filter
        if (this.filter.firstName) {
            data = data.filter(e => e.firstName.toLowerCase().includes(this.filter.firstName.toLowerCase()));
        }
        if (this.filter.department) {
            data = data.filter(e => e.department.toLowerCase().includes(this.filter.department.toLowerCase()));
        }
        if (this.filter.role) {
            data = data.filter(e => e.role.toLowerCase().includes(this.filter.role.toLowerCase()));
        }
        // Search
        if (this.searchQuery) {
            data = data.filter(e =>
                e.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                e.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                e.email.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
        // Sort
        if (this.sortKey) {
            data.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]));
        }
        // Pagination
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginated = data.slice(start, end);
        this.filteredEmployees = data;
        this.updateDOM(paginated);
        this.renderPagination(data.length);
    },

    updateDOM(list) {
        const container = document.getElementById('employee-list-container');
        container.innerHTML = '';
        list.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.setAttribute('data-employee-id', employee.id);
            card.innerHTML = `
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>ID: ${employee.id}</p>
                <p>Email: ${employee.email}</p>
                <p>Department: ${employee.department}</p>
                <p>Role: ${employee.role}</p>
                <div class="button-row">
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderPagination(total) {
        const controls = document.getElementById('pagination-controls');
        controls.innerHTML = '';
        const totalPages = Math.ceil(total / this.itemsPerPage);
        if (totalPages > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = 'Previous';
            prevBtn.disabled = this.currentPage === 1;
            prevBtn.onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderList();
                }
            };
            controls.appendChild(prevBtn);

            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next';
            nextBtn.disabled = this.currentPage === totalPages;
            nextBtn.onclick = () => {
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderList();
                }
            };
            controls.appendChild(nextBtn);
        }
    },

    addEmployee(employee) {
        employee.id = this.employees.length ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
        this.employees.push(employee);
        this.renderList();
    },

    editEmployee(id, updated) {
        const idx = this.employees.findIndex(e => e.id === id);
        if (idx !== -1) {
            this.employees[idx] = { ...this.employees[idx], ...updated };
            this.renderList();
        }
    },

    deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employees = this.employees.filter(e => e.id !== id);
            this.renderList();
        }
    },

    showForm(employee = null) {
    const formContainer = document.getElementById('form-container');
    formContainer.classList.remove('hidden');
    formContainer.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <form id="employee-form">
                    <input type="text" id="firstName" placeholder="First Name" value="${employee ? employee.firstName : ''}" required>
                    <input type="text" id="lastName" placeholder="Last Name" value="${employee ? employee.lastName : ''}" required>
                    <input type="email" id="email" placeholder="Email" value="${employee ? employee.email : ''}" required>
                    <input type="text" id="department" placeholder="Department" value="${employee ? employee.department : ''}" required>
                    <input type="text" id="role" placeholder="Role" value="${employee ? employee.role : ''}" required>
                    <button type="submit">Save</button>
                    <button type="button" id="cancel-btn">Cancel</button>
                    <div id="form-error" class="error"></div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('employee-form').onsubmit = (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const department = document.getElementById('department').value.trim();
        const role = document.getElementById('role').value.trim();
        let error = '';
        if (!firstName || !lastName || !email || !department || !role) {
            error = 'All fields are required.';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            error = 'Invalid email format.';
        }
        if (error) {
            document.getElementById('form-error').textContent = error;
            return;
        }
        if (employee) {
            EmployeeManager.editEmployee(employee.id, { firstName, lastName, email, department, role });
        } else {
            EmployeeManager.addEmployee({ firstName, lastName, email, department, role });
        }
        EmployeeManager.hideForm();
    };
    document.getElementById('cancel-btn').onclick = () => {
        EmployeeManager.hideForm();
    };
    },

    hideForm() {
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('employee-list-container').classList.remove('hidden');
    },

    setupEvents() {
        document.getElementById('add-employee-btn').onclick = () => this.showForm();
        document.getElementById('employee-list-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const id = Number(e.target.getAttribute('data-id'));
                const emp = this.employees.find(emp => emp.id === id);
                if (emp) {
                    this.showForm(emp);
                }
            }
            if (e.target.classList.contains('delete-btn')) {
                const id = Number(e.target.getAttribute('data-id'));
                this.deleteEmployee(id);
            }
        });
        document.getElementById('search-input').oninput = (e) => {
            this.searchQuery = e.target.value;
            this.currentPage = 1;
            this.renderList();
        };
        const filterBtn = document.getElementById('filter-btn');
        const filterPanel = document.getElementById('filter-panel');
        filterBtn.onclick = (e) => {
            // Position popup near filter button
            const rect = filterBtn.getBoundingClientRect();
            filterPanel.style.top = (rect.bottom + window.scrollY + 8) + 'px';
            filterPanel.style.right = (window.innerWidth - rect.right + 10) + 'px';
            filterPanel.classList.toggle('hidden');
        };
        document.getElementById('apply-filter-btn').onclick = () => {
            this.filter.firstName = document.getElementById('filter-firstname').value;
            this.filter.department = document.getElementById('filter-department').value;
            this.filter.role = document.getElementById('filter-role').value;
            this.currentPage = 1;
            this.renderList();
            filterPanel.classList.add('hidden');
        };
        document.getElementById('reset-filter-btn').onclick = () => {
            document.getElementById('filter-firstname').value = '';
            document.getElementById('filter-department').value = '';
            document.getElementById('filter-role').value = '';
            this.filter = {};
            this.currentPage = 1;
            this.renderList();
            filterPanel.classList.add('hidden');
        };
        document.getElementById('sort-select').onchange = (e) => {
            this.sortKey = e.target.value;
            this.renderList();
        };
        document.getElementById('show-count-select').onchange = (e) => {
            this.itemsPerPage = Number(e.target.value);
            this.currentPage = 1;
            this.renderList();
        };
    },

    init() {
        this.renderList();
        this.setupEvents();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    EmployeeManager.init();
});

// Student Management System

// Store students in localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');

// Calculate Grade based on average
function calculateGrade(average) {
    if (average >= 90) return 'A+';
    if (average >= 80) return 'A';
    if (average >= 70) return 'B';
    if (average >= 60) return 'C';
    if (average >= 50) return 'D';
    return 'F';
}

// Calculate Average Marks
function calculateAverage(math, science, english) {
    return ((math + science + english) / 3).toFixed(2);
}

// Add Student
function addStudent(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const mathMarks = Number(document.getElementById('mathMarks').value);
    const scienceMarks = Number(document.getElementById('scienceMarks').value);
    const englishMarks = Number(document.getElementById('englishMarks').value);

    // Validate if student ID already exists
    if (students.some(student => student.id === studentId)) {
        alert('Student ID already exists!');
        return;
    }

    const average = calculateAverage(mathMarks, scienceMarks, englishMarks);
    const grade = calculateGrade(average);

    const student = {
        id: studentId,
        name: studentName,
        math: mathMarks,
        science: scienceMarks,
        english: englishMarks,
        average: average,
        grade: grade
    };

    students.push(student);
    saveToLocalStorage();
    displayStudents();
    studentForm.reset();
}

// Delete Student
function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student record?')) {
        students = students.filter(student => student.id !== studentId);
        saveToLocalStorage();
        displayStudents();
    }
}

// Edit Student
function editStudent(studentId) {
    const student = students.find(student => student.id === studentId);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('mathMarks').value = student.math;
        document.getElementById('scienceMarks').value = student.science;
        document.getElementById('englishMarks').value = student.english;

        // Remove the student from array (will be re-added with updated info)
        students = students.filter(student => student.id !== studentId);
        saveToLocalStorage();
        displayStudents();
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Display Students
function displayStudents(searchTerm = '') {
    studentTableBody.innerHTML = '';
    
    let filteredStudents = students;
    if (searchTerm) {
        filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.math}</td>
            <td>${student.science}</td>
            <td>${student.english}</td>
            <td>${student.average}</td>
            <td>${student.grade}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Event Listeners
studentForm.addEventListener('submit', addStudent);
searchInput.addEventListener('input', (e) => displayStudents(e.target.value));

// Initial display
displayStudents(); 
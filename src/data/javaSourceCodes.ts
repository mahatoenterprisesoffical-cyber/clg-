import { ProjectBlueprint } from '../types';

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: 'college-mgmt',
    title: 'College & Student Information Management System',
    shortTitle: 'College ERP System',
    description: 'A comprehensive multi-tier Java Desktop & CLI College Information System featuring OOP Inheritance, Collections API, Multi-threading, JDBC Database connectivity, and a rich Java Swing Desktop GUI.',
    domain: 'Education / ERP',
    difficulty: 'Intermediate',
    techStack: ['Java 17 / 21', 'Java Swing GUI', 'JDBC (MySQL/SQLite)', 'Java Collections Framework', 'Java Streams API', 'File I/O Serialization'],
    keyFeatures: [
      'Student Enrollment & Profile Lifecycle',
      'Course Registration & Faculty Assignment',
      'Attendance Calculation & Warning Engine (<75%)',
      'Gradebook, GPA/CGPA Formula Calculation',
      'Fee Collection, Status Tracking & Invoicing',
      'Dual Interface: Interactive CLI & Swing GUI',
      'JDBC Database Persistence & Data Export'
    ],
    oopConcepts: [
      'Encapsulation (Private fields with getter/setter validations)',
      'Inheritance (Person -> Student & Faculty hierarchy)',
      'Polymorphism (Method overriding for displayDetails() & toString())',
      'Abstraction (Abstract Person class & DatabaseService interface)',
      'Exception Handling (Custom StudentNotFoundException & InvalidMarksException)',
      'Collections & Generics (ArrayList, HashMap, Streams for sorting/filtering)'
    ],
    databaseScript: `-- ==========================================================
-- College Management System (Database Schema: MySQL / PostgreSQL)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- 1. Departments Table
CREATE TABLE departments (
    dept_code VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    established_year INT
);

-- 2. Students Table
CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    dept_code VARCHAR(10),
    semester INT CHECK (semester BETWEEN 1 AND 8),
    section CHAR(1) DEFAULT 'A',
    cgpa DECIMAL(3,2) DEFAULT 0.00,
    attendance_pct DECIMAL(5,2) DEFAULT 0.00,
    fee_status ENUM('Paid', 'Pending', 'Partial', 'Overdue') DEFAULT 'Pending',
    status ENUM('Active', 'Graduated', 'Probation', 'Suspended') DEFAULT 'Active',
    date_of_birth DATE,
    admission_year INT,
    FOREIGN KEY (dept_code) REFERENCES departments(dept_code) ON DELETE SET NULL
);

-- 3. Faculty Table
CREATE TABLE faculty (
    faculty_id VARCHAR(20) PRIMARY KEY,
    emp_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    dept_code VARCHAR(10),
    designation VARCHAR(50),
    qualification VARCHAR(100),
    experience_years INT,
    FOREIGN KEY (dept_code) REFERENCES departments(dept_code)
);

-- 4. Courses Table
CREATE TABLE courses (
    course_code VARCHAR(20) PRIMARY KEY,
    course_title VARCHAR(150) NOT NULL,
    dept_code VARCHAR(10),
    credits INT DEFAULT 4,
    semester INT,
    faculty_id VARCHAR(20),
    FOREIGN KEY (dept_code) REFERENCES departments(dept_code),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
);

-- 5. Student Course Enrollments & Grades
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    internal_marks DECIMAL(5,2) DEFAULT 0,
    endsem_marks DECIMAL(5,2) DEFAULT 0,
    total_marks DECIMAL(5,2) DEFAULT 0,
    grade VARCHAR(2),
    grade_point INT,
    FOREIGN KEY (roll_no) REFERENCES students(roll_no) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE,
    UNIQUE KEY (roll_no, course_code)
);

-- Sample Data Inserts
INSERT INTO departments VALUES 
('CSE', 'Computer Science & Engineering', 'Dr. Ramesh Sharma', 2001),
('IT', 'Information Technology', 'Prof. Sneha Patel', 2005),
('ECE', 'Electronics & Communication', 'Dr. Vikram Mehta', 2002);

INSERT INTO students (student_id, roll_no, full_name, email, phone, dept_code, semester, section, cgpa, attendance_pct, fee_status)
VALUES 
('STU01', '22CS101', 'Aarav Deshmukh', 'aarav.22cs101@college.edu', '+91 9823145678', 'CSE', 4, 'A', 9.42, 92.5, 'Paid'),
('STU02', '22CS102', 'Diya Sharma', 'diya.22cs102@college.edu', '+91 9845278912', 'CSE', 4, 'A', 8.85, 88.0, 'Paid'),
('STU03', '22CS103', 'Rohan Verma', 'rohan.22cs103@college.edu', '+91 9711234567', 'CSE', 4, 'B', 7.65, 71.0, 'Pending');
`,
    files: [
      {
        name: 'Person.java',
        path: 'src/com/college/model/Person.java',
        category: 'model',
        description: 'Abstract base class modeling common attributes and behaviors of all college individuals (Encapsulation + Abstraction).',
        content: `package com.college.model;

import java.io.Serializable;

/**
 * Abstract Base Class: Person
 * Demonstrates Abstraction and Encapsulation.
 * Base class for Student and Faculty entities.
 */
public abstract class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String id;
    private String name;
    private String email;
    private String phone;
    private String address;

    // Default Constructor
    public Person() {}

    // Parameterized Constructor
    public Person(String id, String name, String email, String phone, String address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    // Abstract Method to be implemented by child classes (Polymorphism)
    public abstract void displayDetails();

    // Getters and Setters with basic validations
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty.");
        }
        this.name = name.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email != null && !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return String.format("ID: %s | Name: %s | Email: %s | Phone: %s", id, name, email, phone);
    }
}
`
      },
      {
        name: 'Student.java',
        path: 'src/com/college/model/Student.java',
        category: 'model',
        description: 'Child class representing a Student, demonstrating Inheritance, Method Overriding, and Collections integration.',
        content: `package com.college.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Child Class: Student
 * Demonstrates Inheritance (extends Person) and Polymorphism.
 */
public class Student extends Person implements Comparable<Student> {
    private static final long serialVersionUID = 2L;

    private String rollNo;
    private String branch;
    private int semester;
    private char section;
    private double cgpa;
    private double attendancePercentage;
    private String feeStatus; // "Paid", "Pending", "Partial", "Overdue"
    private String status;    // "Active", "Probation", "Graduated"
    
    // Course code -> Marks (Internal + EndSem)
    private Map<String, Double> courseMarks;

    // Default Constructor
    public Student() {
        super();
        this.courseMarks = new HashMap<>();
        this.feeStatus = "Pending";
        this.status = "Active";
    }

    // Parameterized Constructor
    public Student(String id, String rollNo, String name, String email, String phone, 
                   String branch, int semester, char section, double cgpa, double attendancePercentage) {
        super(id, name, email, phone, "Not Specified");
        this.rollNo = rollNo;
        this.branch = branch;
        this.semester = semester;
        this.section = section;
        this.cgpa = cgpa;
        this.attendancePercentage = attendancePercentage;
        this.feeStatus = "Paid";
        this.status = "Active";
        this.courseMarks = new HashMap<>();
    }

    // Polymorphic implementation of abstract method
    @Override
    public void displayDetails() {
        System.out.println("==================================================");
        System.out.println("           STUDENT ACADEMIC PROFILE               ");
        System.out.println("==================================================");
        System.out.println("Roll Number : " + rollNo);
        System.out.println("Full Name   : " + getName());
        System.out.println("Branch/Dept : " + branch + " (Semester " + semester + ", Sec " + section + ")");
        System.out.println("Email ID    : " + getEmail());
        System.out.println("Phone No    : " + getPhone());
        System.out.println("CGPA        : " + String.format("%.2f", cgpa));
        System.out.println("Attendance  : " + String.format("%.1f%%", attendancePercentage) + 
                           (attendancePercentage < 75.0 ? " [WARNING: LOW ATTENDANCE]" : " [OK]"));
        System.out.println("Fee Status  : " + feeStatus);
        System.out.println("Status      : " + status);
        System.out.println("==================================================");
    }

    // Business Logic: Check if student has attendance shortage (< 75%)
    public boolean hasAttendanceShortage() {
        return this.attendancePercentage < 75.0;
    }

    // Helper: Add marks for a course
    public void addCourseMarks(String courseCode, double marks) {
        this.courseMarks.put(courseCode, marks);
    }

    // Natural Sorting by Roll Number
    @Override
    public int compareTo(Student other) {
        return this.rollNo.compareToIgnoreCase(other.rollNo);
    }

    // Getters and Setters
    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }

    public char getSection() { return section; }
    public void setSection(char section) { this.section = section; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }

    public double getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(double attendancePercentage) { this.attendancePercentage = attendancePercentage; }

    public String getFeeStatus() { return feeStatus; }
    public void setFeeStatus(String feeStatus) { this.feeStatus = feeStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Map<String, Double> getCourseMarks() { return courseMarks; }
}
`
      },
      {
        name: 'Faculty.java',
        path: 'src/com/college/model/Faculty.java',
        category: 'model',
        description: 'Faculty entity extending Person base class, showing polymorphism and domain modeling.',
        content: `package com.college.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Faculty Model: Represents college professors and lecturers.
 * Extends Person class.
 */
public class Faculty extends Person {
    private static final long serialVersionUID = 3L;

    private String empCode;
    private String department;
    private String designation;
    private String qualification;
    private int experienceYears;
    private List<String> assignedCourses;

    public Faculty(String id, String empCode, String name, String email, String phone,
                   String department, String designation, String qualification, int experienceYears) {
        super(id, name, email, phone, "Faculty Quarters");
        this.empCode = empCode;
        this.department = department;
        this.designation = designation;
        this.qualification = qualification;
        this.experienceYears = experienceYears;
        this.assignedCourses = new ArrayList<>();
    }

    @Override
    public void displayDetails() {
        System.out.println("==================================================");
        System.out.println("            FACULTY MEMBER PROFILE                ");
        System.out.println("==================================================");
        System.out.println("Employee Code : " + empCode);
        System.out.println("Professor Name: " + getName());
        System.out.println("Department    : " + department);
        System.out.println("Designation   : " + designation);
        System.out.println("Qualification : " + qualification);
        System.out.println("Experience    : " + experienceYears + " Years");
        System.out.println("Email ID      : " + getEmail());
        System.out.println("Assigned Subjs: " + String.join(", ", assignedCourses));
        System.out.println("==================================================");
    }

    public void assignSubject(String courseCode) {
        this.assignedCourses.add(courseCode);
    }

    // Getters and Setters
    public String getEmpCode() { return empCode; }
    public String getDepartment() { return department; }
    public String getDesignation() { return designation; }
    public String getQualification() { return qualification; }
    public int getExperienceYears() { return experienceYears; }
    public List<String> getAssignedCourses() { return assignedCourses; }
}
`
      },
      {
        name: 'Course.java',
        path: 'src/com/college/model/Course.java',
        category: 'model',
        description: 'Course model representing subjects, credit weights, and assigned department.',
        content: `package com.college.model;

import java.io.Serializable;

public class Course implements Serializable {
    private static final long serialVersionUID = 4L;

    private String courseCode;
    private String title;
    private String department;
    private int credits;
    private int semester;
    private String facultyName;

    public Course(String courseCode, String title, String department, int credits, int semester, String facultyName) {
        this.courseCode = courseCode;
        this.title = title;
        this.department = department;
        this.credits = credits;
        this.semester = semester;
        this.facultyName = facultyName;
    }

    public String getCourseCode() { return courseCode; }
    public String getTitle() { return title; }
    public String getDepartment() { return department; }
    public int getCredits() { return credits; }
    public int getSemester() { return semester; }
    public String getFacultyName() { return facultyName; }

    @Override
    public String toString() {
        return String.format("[%s] %s (%d Credits, Sem %d) - Faculty: %s", 
            courseCode, title, credits, semester, facultyName);
    }
}
`
      },
      {
        name: 'DatabaseHelper.java',
        path: 'src/com/college/dao/DatabaseHelper.java',
        category: 'dao',
        description: 'Data Access Object (DAO) managing JDBC database connections, PreparedStatements, and SQL CRUD queries.',
        content: `package com.college.dao;

import com.college.model.Student;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * JDBC Database Helper Class
 * Implements CRUD operations for the MySQL/SQLite database.
 */
public class DatabaseHelper {
    // Database credentials configuration
    private static final String DB_URL = "jdbc:mysql://localhost:3306/college_db?useSSL=false&serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "admin123";

    /**
     * Establishes a connection to the SQL Database.
     */
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found in classpath: " + e.getMessage());
        }
    }

    /**
     * Inserts a new student record into the database.
     */
    public boolean insertStudent(Student student) {
        String query = "INSERT INTO students (student_id, roll_no, full_name, email, phone, dept_code, semester, section, cgpa, attendance_pct, fee_status) " +
                       "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setString(1, student.getId());
            pstmt.setString(2, student.getRollNo());
            pstmt.setString(3, student.getName());
            pstmt.setString(4, student.getEmail());
            pstmt.setString(5, student.getPhone());
            pstmt.setString(6, student.getBranch());
            pstmt.setInt(7, student.getSemester());
            pstmt.setString(8, String.valueOf(student.getSection()));
            pstmt.setDouble(9, student.getCgpa());
            pstmt.setDouble(10, student.getAttendancePercentage());
            pstmt.setString(11, student.getFeeStatus());

            int rowsInserted = pstmt.executeUpdate();
            return rowsInserted > 0;
        } catch (SQLException e) {
            System.err.println("Database Error during Insert: " + e.getMessage());
            return false;
        }
    }

    /**
     * Retrieves all active students from the database.
     */
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT * FROM students WHERE status = 'Active' ORDER BY roll_no ASC";

        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Student s = new Student(
                    rs.getString("student_id"),
                    rs.getString("roll_no"),
                    rs.getString("full_name"),
                    rs.getString("email"),
                    rs.getString("phone"),
                    rs.getString("dept_code"),
                    rs.getInt("semester"),
                    rs.getString("section").charAt(0),
                    rs.getDouble("cgpa"),
                    rs.getDouble("attendance_pct")
                );
                s.setFeeStatus(rs.getString("fee_status"));
                students.add(s);
            }
        } catch (SQLException e) {
            System.err.println("Database Error during Fetch: " + e.getMessage());
        }
        return students;
    }

    /**
     * Finds a single student by their unique roll number.
     */
    public Student findByRollNo(String rollNo) {
        String sql = "SELECT * FROM students WHERE roll_no = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, rollNo);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Student s = new Student(
                        rs.getString("student_id"),
                        rs.getString("roll_no"),
                        rs.getString("full_name"),
                        rs.getString("email"),
                        rs.getString("phone"),
                        rs.getString("dept_code"),
                        rs.getInt("semester"),
                        rs.getString("section").charAt(0),
                        rs.getDouble("cgpa"),
                        rs.getDouble("attendance_pct")
                    );
                    s.setFeeStatus(rs.getString("fee_status"));
                    return s;
                }
            }
        } catch (SQLException e) {
            System.err.println("Database Error during Lookup: " + e.getMessage());
        }
        return null;
    }

    /**
     * Deletes a student by roll number.
     */
    public boolean deleteStudent(String rollNo) {
        String sql = "DELETE FROM students WHERE roll_no = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, rollNo);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Database Error during Delete: " + e.getMessage());
            return false;
        }
    }
}
`
      },
      {
        name: 'StudentService.java',
        path: 'src/com/college/service/StudentService.java',
        category: 'service',
        description: 'Business logic layer using Java Collections, Stream API, Lambdas, and custom exceptions.',
        content: `package com.college.service;

import com.college.model.Student;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Layer: Encapsulates all Business Logic.
 * Uses Java Collections Framework & Stream API.
 */
public class StudentService {
    // In-memory collection storage for fast lookup
    private Map<String, Student> studentRegistry;

    public StudentService() {
        this.studentRegistry = new HashMap<>();
    }

    /**
     * Registers a new student.
     */
    public void registerStudent(Student student) {
        if (student == null) {
            throw new IllegalArgumentException("Student object cannot be null.");
        }
        if (studentRegistry.containsKey(student.getRollNo().toUpperCase())) {
            throw new IllegalStateException("Student with Roll No " + student.getRollNo() + " already exists!");
        }
        studentRegistry.put(student.getRollNo().toUpperCase(), student);
    }

    /**
     * Searches student by Roll Number (Case-insensitive).
     */
    public Optional<Student> getStudentByRollNo(String rollNo) {
        return Optional.ofNullable(studentRegistry.get(rollNo.toUpperCase()));
    }

    /**
     * Returns all students sorted by CGPA in descending order (Rank list).
     */
    public List<Student> getRankList() {
        return studentRegistry.values().stream()
                .sorted(Comparator.comparingDouble(Student::getCgpa).reversed())
                .collect(Collectors.toList());
    }

    /**
     * Returns students belonging to a specific department.
     */
    public List<Student> getStudentsByBranch(String branch) {
        return studentRegistry.values().stream()
                .filter(s -> s.getBranch().equalsIgnoreCase(branch))
                .sorted()
                .collect(Collectors.toList());
    }

    /**
     * Filters all students with attendance below 75% for exam debar warning.
     */
    public List<Student> getAttendanceDefaulters() {
        return studentRegistry.values().stream()
                .filter(Student::hasAttendanceShortage)
                .collect(Collectors.toList());
    }

    /**
     * Calculates the average CGPA across the college.
     */
    public double calculateAverageCGPA() {
        return studentRegistry.values().stream()
                .mapToDouble(Student::getCgpa)
                .average()
                .orElse(0.0);
    }

    /**
     * Deletes a student from the registry.
     */
    public boolean removeStudent(String rollNo) {
        return studentRegistry.remove(rollNo.toUpperCase()) != null;
    }

    public Collection<Student> getAllStudents() {
        return Collections.unmodifiableCollection(studentRegistry.values());
    }
}
`
      },
      {
        name: 'StudentManagementSystem.java',
        path: 'src/com/college/main/StudentManagementSystem.java',
        category: 'main',
        description: 'Main CLI Application entry point with interactive Scanner menu, validation, and ANSI colored UI.',
        content: `package com.college.main;

import com.college.model.Student;
import com.college.service.StudentService;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

/**
 * Main Application Class: StudentManagementSystem
 * Provides an interactive Console User Interface (CLI).
 */
public class StudentManagementSystem {
    private static final Scanner scanner = new Scanner(System.in);
    private static final StudentService service = new StudentService();

    public static void main(String[] args) {
        seedSampleData();
        displayWelcomeBanner();

        boolean running = true;
        while (running) {
            displayMenu();
            System.out.print("👉 Enter your choice [1-8]: ");
            String input = scanner.nextLine().trim();

            switch (input) {
                case "1":
                    addNewStudent();
                    break;
                case "2":
                    viewAllStudents();
                    break;
                case "3":
                    searchStudentByRollNo();
                    break;
                case "4":
                    viewDepartmentRankList();
                    break;
                case "5":
                    viewAttendanceDefaulters();
                    break;
                case "6":
                    calculateCollegeStatistics();
                    break;
                case "7":
                    deleteStudentRecord();
                    break;
                case "8":
                    System.out.println("\n👋 Thank you for using College ERP System. Exiting...");
                    running = false;
                    break;
                default:
                    System.out.println("❌ Invalid choice. Please enter a number between 1 and 8.\n");
            }
        }
        scanner.close();
    }

    private static void displayWelcomeBanner() {
        System.out.println("==========================================================");
        System.out.println("     🎓 JAVA COLLEGE MANAGEMENT SYSTEM - ERP v2.4 🎓      ");
        System.out.println("       Built with Core Java, OOP & Collections API        ");
        System.out.println("==========================================================");
    }

    private static void displayMenu() {
        System.out.println("\n----------------- MAIN OPERATIONS MENU -----------------");
        System.out.println(" [1] ➕ Register New Student");
        System.out.println(" [2] 📋 View All Registered Students");
        System.out.println(" [3] 🔍 Search Student by Roll Number");
        System.out.println(" [4] 🏆 Generate Merit / CGPA Rank List");
        System.out.println(" [5] ⚠️  View Attendance Shortage (<75%) List");
        System.out.println(" [6] 📊 View College Academic Performance Stats");
        System.out.println(" [7] 🗑️  Delete Student Record");
        System.out.println(" [8] 🚪 Exit Application");
        System.out.println("--------------------------------------------------------");
    }

    private static void addNewStudent() {
        System.out.println("\n--- [Register New Student] ---");
        try {
            System.out.print("Enter Roll Number (e.g. 22CS105): ");
            String roll = scanner.nextLine().trim();

            System.out.print("Enter Full Name: ");
            String name = scanner.nextLine().trim();

            System.out.print("Enter Email Address: ");
            String email = scanner.nextLine().trim();

            System.out.print("Enter Phone Number: ");
            String phone = scanner.nextLine().trim();

            System.out.print("Enter Department/Branch (CSE/IT/ECE/ME/AI & DS): ");
            String branch = scanner.nextLine().trim().toUpperCase();

            System.out.print("Enter Semester (1-8): ");
            int sem = Integer.parseInt(scanner.nextLine().trim());

            System.out.print("Enter Current CGPA (0.00 - 10.00): ");
            double cgpa = Double.parseDouble(scanner.nextLine().trim());

            System.out.print("Enter Attendance Percentage (0.0 - 100.0): ");
            double att = Double.parseDouble(scanner.nextLine().trim());

            String id = "STU" + System.currentTimeMillis() % 10000;
            Student student = new Student(id, roll, name, email, phone, branch, sem, 'A', cgpa, att);
            service.registerStudent(student);

            System.out.println("✅ Student '" + name + "' registered successfully with Roll No: " + roll);
        } catch (NumberFormatException e) {
            System.out.println("❌ Input Error: Please enter valid numerical values for Semester, CGPA, and Attendance.");
        } catch (Exception e) {
            System.out.println("❌ Registration Failed: " + e.getMessage());
        }
    }

    private static void viewAllStudents() {
        System.out.println("\n-------------------- ALL STUDENTS DIRECTORY --------------------");
        System.out.printf("%-10s | %-20s | %-8s | %-4s | %-6s | %-12s%n", "ROLL NO", "NAME", "BRANCH", "SEM", "CGPA", "ATTENDANCE");
        System.out.println("----------------------------------------------------------------");
        
        for (Student s : service.getAllStudents()) {
            System.out.printf("%-10s | %-20s | %-8s | %-4d | %-6.2f | %-5.1f%% %s%n",
                s.getRollNo(), s.getName(), s.getBranch(), s.getSemester(), s.getCgpa(),
                s.getAttendancePercentage(), (s.hasAttendanceShortage() ? "[⚠️ LOW]" : ""));
        }
    }

    private static void searchStudentByRollNo() {
        System.out.print("\n🔍 Enter Roll Number to Search: ");
        String roll = scanner.nextLine().trim();
        Optional<Student> studentOpt = service.getStudentByRollNo(roll);

        if (studentOpt.isPresent()) {
            studentOpt.get().displayDetails();
        } else {
            System.out.println("❌ No student found with Roll Number: " + roll);
        }
    }

    private static void viewDepartmentRankList() {
        System.out.println("\n🏆 ================== MERIT & CGPA RANK LIST ================== 🏆");
        List<Student> rankList = service.getRankList();
        int rank = 1;
        for (Student s : rankList) {
            System.out.printf("Rank #%-2d | Roll: %-9s | CGPA: %-4.2f | Name: %s (%s)%n",
                rank++, s.getRollNo(), s.getCgpa(), s.getName(), s.getBranch());
        }
    }

    private static void viewAttendanceDefaulters() {
        System.out.println("\n⚠️ ============ ATTENDANCE DEFAULTERS LIST (<75%) ============ ⚠️");
        List<Student> defaulters = service.getAttendanceDefaulters();
        if (defaulters.isEmpty()) {
            System.out.println("🎉 Excellent! No students currently have an attendance shortage.");
        } else {
            for (Student s : defaulters) {
                System.out.printf("• Roll: %-9s | Attendance: %-5.1f%% | Name: %s (%s, Sem %d)%n",
                    s.getRollNo(), s.getAttendancePercentage(), s.getName(), s.getBranch(), s.getSemester());
            }
        }
    }

    private static void calculateCollegeStatistics() {
        System.out.println("\n📊 ============ COLLEGE ACADEMIC STATISTICS ============ 📊");
        System.out.println("Total Students Registered: " + service.getAllStudents().size());
        System.out.printf("Average College CGPA     : %.2f / 10.00%n", service.calculateAverageCGPA());
        System.out.println("Attendance Defaulters    : " + service.getAttendanceDefaulters().size());
    }

    private static void deleteStudentRecord() {
        System.out.print("\n🗑️ Enter Roll Number of Student to Delete: ");
        String roll = scanner.nextLine().trim();
        if (service.removeStudent(roll)) {
            System.out.println("✅ Student with Roll No '" + roll + "' has been successfully removed.");
        } else {
            System.out.println("❌ Student not found.");
        }
    }

    private static void seedSampleData() {
        service.registerStudent(new Student("STU01", "22CS101", "Aarav Deshmukh", "aarav@clg.edu", "9823145678", "CSE", 4, 'A', 9.42, 92.5));
        service.registerStudent(new Student("STU02", "22CS102", "Diya Sharma", "diya@clg.edu", "9845278912", "CSE", 4, 'A', 8.85, 88.0));
        service.registerStudent(new Student("STU03", "22CS103", "Rohan Verma", "rohan@clg.edu", "9711234567", "CSE", 4, 'B', 7.65, 71.0));
        service.registerStudent(new Student("STU04", "22AI101", "Ananya Nair", "ananya@clg.edu", "9447123456", "AI & DS", 4, 'A', 9.60, 96.0));
        service.registerStudent(new Student("STU05", "22IT101", "Kabir Singhania", "kabir@clg.edu", "9830198765", "IT", 4, 'A', 8.20, 81.5));
    }
}
`
      },
      {
        name: 'CollegeSwingGUI.java',
        path: 'src/com/college/gui/CollegeSwingGUI.java',
        category: 'gui',
        description: 'Complete Java Swing Desktop GUI featuring JFrame, JTable, Forms, Event Listeners, and Status Bar.',
        content: `package com.college.gui;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Java Swing Desktop Graphical User Interface
 * Complete standalone GUI for College Management System.
 */
public class CollegeSwingGUI extends JFrame {
    private JTable studentTable;
    private DefaultTableModel tableModel;
    private JTextField txtRollNo, txtName, txtEmail, txtPhone, txtCGPA, txtAttendance;
    private JComboBox<String> comboBranch, comboSem;
    private JLabel lblStatus;

    public CollegeSwingGUI() {
        super("🎓 College & Student Information Management System - Java Swing");
        initializeComponents();
    }

    private void initializeComponents() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(950, 620);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(10, 10));

        // 1. Top Header Banner
        JPanel headerPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        headerPanel.setBackground(new Color(30, 41, 59));
        JLabel titleLabel = new JLabel("College ERP & Student Information Portal");
        titleLabel.setFont(new Font("SansSerif", Font.BOLD, 20));
        titleLabel.setForeground(Color.WHITE);
        headerPanel.add(titleLabel);
        add(headerPanel, BorderLayout.NORTH);

        // 2. Left Input Form Panel
        JPanel formPanel = new JPanel(new GridLayout(9, 2, 8, 8));
        formPanel.setBorder(BorderFactory.createTitledBorder("Student Details Entry"));
        formPanel.setPreferredSize(new Dimension(320, 400));

        txtRollNo = new JTextField();
        txtName = new JTextField();
        txtEmail = new JTextField();
        txtPhone = new JTextField();
        comboBranch = new JComboBox<>(new String[]{"CSE", "IT", "ECE", "ME", "Civil", "AI & DS"});
        comboSem = new JComboBox<>(new String[]{"1", "2", "3", "4", "5", "6", "7", "8"});
        comboSem.setSelectedIndex(3); // Default Sem 4
        txtCGPA = new JTextField();
        txtAttendance = new JTextField();

        formPanel.add(new JLabel("Roll Number:"));
        formPanel.add(txtRollNo);
        formPanel.add(new JLabel("Full Name:"));
        formPanel.add(txtName);
        formPanel.add(new JLabel("Email Address:"));
        formPanel.add(txtEmail);
        formPanel.add(new JLabel("Phone No:"));
        formPanel.add(txtPhone);
        formPanel.add(new JLabel("Department:"));
        formPanel.add(comboBranch);
        formPanel.add(new JLabel("Semester:"));
        formPanel.add(comboSem);
        formPanel.add(new JLabel("CGPA (0-10):"));
        formPanel.add(txtCGPA);
        formPanel.add(new JLabel("Attendance (%):"));
        formPanel.add(txtAttendance);

        JButton btnAdd = new JButton("➕ Add Student");
        JButton btnClear = new JButton("🧹 Clear Form");
        formPanel.add(btnAdd);
        formPanel.add(btnClear);

        add(formPanel, BorderLayout.WEST);

        // 3. Center Table View
        String[] columns = {"Roll No", "Full Name", "Branch", "Sem", "CGPA", "Attendance %", "Status"};
        tableModel = new DefaultTableModel(columns, 0);
        studentTable = new JTable(tableModel);
        studentTable.setRowHeight(24);
        studentTable.setFont(new Font("SansSerif", Font.PLAIN, 13));
        JScrollPane scrollPane = new JScrollPane(studentTable);
        add(scrollPane, BorderLayout.CENTER);

        // 4. Bottom Controls and Status Bar
        JPanel bottomPanel = new JPanel(new BorderLayout());
        JPanel buttonRow = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        JButton btnDelete = new JButton("🗑️ Delete Selected");
        JButton btnExport = new JButton("💾 Export Report");
        buttonRow.add(btnDelete);
        buttonRow.add(btnExport);

        lblStatus = new JLabel(" Ready. Loaded sample student records.");
        lblStatus.setBorder(BorderFactory.createEtchedBorder());

        bottomPanel.add(buttonRow, BorderLayout.NORTH);
        bottomPanel.add(lblStatus, BorderLayout.SOUTH);
        add(bottomPanel, BorderLayout.SOUTH);

        // Preload sample records
        preloadTableData();

        // Event Listeners
        btnAdd.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                handleAddStudent();
            }
        });

        btnClear.addActionListener(e -> clearForm());

        btnDelete.addActionListener(e -> {
            int selectedRow = studentTable.getSelectedRow();
            if (selectedRow >= 0) {
                String roll = (String) tableModel.getValueAt(selectedRow, 0);
                tableModel.removeRow(selectedRow);
                lblStatus.setText(" Student " + roll + " deleted successfully.");
            } else {
                JOptionPane.showMessageDialog(this, "Please select a student row to delete.", "Selection Required", JOptionPane.WARNING_MESSAGE);
            }
        });
    }

    private void handleAddStudent() {
        String roll = txtRollNo.getText().trim();
        String name = txtName.getText().trim();
        String branch = (String) comboBranch.getSelectedItem();
        String sem = (String) comboSem.getSelectedItem();
        String cgpa = txtCGPA.getText().trim();
        String att = txtAttendance.getText().trim();

        if (roll.isEmpty() || name.isEmpty() || cgpa.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please fill all mandatory fields (Roll, Name, CGPA).", "Validation Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        tableModel.addRow(new Object[]{roll, name, branch, sem, cgpa, att + "%", "Active"});
        lblStatus.setText(" Student " + name + " (" + roll + ") added successfully!");
        clearForm();
    }

    private void clearForm() {
        txtRollNo.setText("");
        txtName.setText("");
        txtEmail.setText("");
        txtPhone.setText("");
        txtCGPA.setText("");
        txtAttendance.setText("");
    }

    private void preloadTableData() {
        tableModel.addRow(new Object[]{"22CS101", "Aarav Deshmukh", "CSE", "4", "9.42", "92.5%", "Active"});
        tableModel.addRow(new Object[]{"22CS102", "Diya Sharma", "CSE", "4", "8.85", "88.0%", "Active"});
        tableModel.addRow(new Object[]{"22CS103", "Rohan Verma", "CSE", "4", "7.65", "71.0%", "Warning"});
        tableModel.addRow(new Object[]{"22AI101", "Ananya Nair", "AI & DS", "4", "9.60", "96.0%", "Active"});
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ignored) {}
            new CollegeSwingGUI().setVisible(true);
        });
    }
}
`
      }
    ]
  },
  {
    id: 'library-mgmt',
    title: 'Digital Library & Book Circulation System',
    shortTitle: 'Library System',
    description: 'An automated Java Library Management System supporting catalog search by ISBN/Author, student book issue/return tracking, and overdue fine calculation.',
    domain: 'Library & Records',
    difficulty: 'Beginner',
    techStack: ['Core Java', 'Collections (HashMap/HashSet)', 'File I/O Persistence', 'Date/Time API'],
    keyFeatures: [
      'Book Cataloging (ISBN, Author, Copies)',
      'Issue and Return Transaction Logs',
      'Automatic Overdue Fine Calculation ($5/day)',
      'Member Borrowing Limit Enforcement (Max 3 books)'
    ],
    oopConcepts: ['Polymorphism', 'Encapsulation', 'Association (Student - Book)'],
    databaseScript: `CREATE TABLE library_books (
    isbn VARCHAR(20) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1
);

CREATE TABLE book_issues (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20),
    roll_no VARCHAR(20),
    issue_date DATE,
    due_date DATE,
    return_date DATE,
    fine_amount DECIMAL(6,2) DEFAULT 0.00
);`,
    files: [
      {
        name: 'Book.java',
        path: 'src/com/library/model/Book.java',
        category: 'model',
        description: 'Book model with ISBN, stock counter, and issue status.',
        content: `package com.library.model;

public class Book {
    private String isbn;
    private String title;
    private String author;
    private int totalCopies;
    private int availableCopies;

    public Book(String isbn, String title, String author, int totalCopies) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.totalCopies = totalCopies;
        this.availableCopies = totalCopies;
    }

    public boolean issueCopy() {
        if (availableCopies > 0) {
            availableCopies--;
            return true;
        }
        return false;
    }

    public void returnCopy() {
        if (availableCopies < totalCopies) {
            availableCopies++;
        }
    }

    // Getters
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public int getAvailableCopies() { return availableCopies; }
}
`
      },
      {
        name: 'LibraryManager.java',
        path: 'src/com/library/service/LibraryManager.java',
        category: 'service',
        description: 'Library business service managing inventory and issues.',
        content: `package com.library.service;

import com.library.model.Book;
import java.util.*;

public class LibraryManager {
    private Map<String, Book> catalog = new HashMap<>();

    public void addBook(Book book) {
        catalog.put(book.getIsbn(), book);
    }

    public boolean issueBook(String isbn, String rollNo) {
        Book b = catalog.get(isbn);
        if (b != null && b.issueCopy()) {
            System.out.println("Book '" + b.getTitle() + "' issued to " + rollNo);
            return true;
        }
        System.out.println("Cannot issue book. Stock empty or invalid ISBN.");
        return false;
    }

    public void displayCatalog() {
        System.out.println("\n--- Library Catalog ---");
        for (Book b : catalog.values()) {
            System.out.printf("[%s] %s by %s (Available: %d)%n", 
                b.getIsbn(), b.getTitle(), b.getAuthor(), b.getAvailableCopies());
        }
    }
}
`
      }
    ]
  },
  {
    id: 'bank-atm',
    title: 'Bank Account & Secure ATM Simulator',
    shortTitle: 'Banking & ATM System',
    description: 'Banking management system with account types (Savings/Current), concurrent multi-threaded ATM transactions, PIN verification, and interest calculator.',
    domain: 'FinTech / Core Banking',
    difficulty: 'Intermediate',
    techStack: ['Core Java', 'Multi-threading (Thread Synchronization)', 'Custom Exception Handling', 'Design Patterns (Factory)'],
    keyFeatures: [
      'Account Creation (Savings & Current)',
      'Thread-Safe Deposits & Withdrawals',
      'PIN Authentication & Balance Inquiry',
      'Mini Statement & Transaction History'
    ],
    oopConcepts: ['Polymorphism', 'Encapsulation', 'Multi-threading Synchronization'],
    databaseScript: `CREATE TABLE bank_accounts (
    account_no VARCHAR(20) PRIMARY KEY,
    holder_name VARCHAR(100) NOT NULL,
    pin_hash VARCHAR(64) NOT NULL,
    account_type ENUM('SAVINGS', 'CURRENT') DEFAULT 'SAVINGS',
    balance DECIMAL(12,2) DEFAULT 1000.00
);`,
    files: [
      {
        name: 'Account.java',
        path: 'src/com/bank/model/Account.java',
        category: 'model',
        description: 'Abstract Account class with synchronized transaction methods.',
        content: `package com.bank.model;

public abstract class Account {
    private String accountNo;
    private String holderName;
    protected double balance;
    private int pin;

    public Account(String accountNo, String holderName, double balance, int pin) {
        this.accountNo = accountNo;
        this.holderName = holderName;
        this.balance = balance;
        this.pin = pin;
    }

    public synchronized void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("Deposited $%.2f. New Balance: $%.2f%n", amount, balance);
        }
    }

    public abstract boolean withdraw(double amount);

    public boolean verifyPin(int enteredPin) {
        return this.pin == enteredPin;
    }

    public double getBalance() { return balance; }
    public String getAccountNo() { return accountNo; }
    public String getHolderName() { return holderName; }
}
`
      },
      {
        name: 'SavingsAccount.java',
        path: 'src/com/bank/model/SavingsAccount.java',
        category: 'model',
        description: 'Savings account maintaining minimum balance constraints.',
        content: `package com.bank.model;

public class SavingsAccount extends Account {
    private static final double MIN_BALANCE = 500.0;
    private double interestRate = 4.5; // 4.5% p.a.

    public SavingsAccount(String accountNo, String holderName, double balance, int pin) {
        super(accountNo, holderName, balance, pin);
    }

    @Override
    public synchronized boolean withdraw(double amount) {
        if (balance - amount >= MIN_BALANCE) {
            balance -= amount;
            System.out.printf("Withdrawal of $%.2f successful. Current Balance: $%.2f%n", amount, balance);
            return true;
        } else {
            System.out.println("❌ Insufficient funds. Minimum balance of $500 required.");
            return false;
        }
    }

    public void applyInterest() {
        double interest = (balance * interestRate) / 100.0;
        balance += interest;
        System.out.printf("Interest of $%.2f applied. Updated Balance: $%.2f%n", interest, balance);
    }
}
`
      }
    ]
  }
];

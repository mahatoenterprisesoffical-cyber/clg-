export interface ColumnSchema {
  name: string;
  type: string;
  constraint: string;
  desc: string;
}

export interface TableSchema {
  name: string;
  desc: string;
  columns: ColumnSchema[];
}

export interface TestCase {
  id: string;
  feature: string;
  input: string;
  expected: string;
  status: 'Passed' | 'Failed';
}

export interface ProjectReportData {
  title: string;
  degree: string;
  department: string;
  collegeName: string;
  academicYear: string;
  abstract: string;
  problemStatement: string;
  objectives: string[];
  srs: {
    hardware: string[];
    software: string[];
    functional: string[];
  };
  modules: { name: string; description: string; keyMethods: string[] }[];
  tables: TableSchema[];
  testCases: TestCase[];
  conclusion: string;
  references: string[];
}

export const projectReportData: ProjectReportData = {
  title: 'Design & Implementation of Integrated College Management System in Java',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  department: 'Department of Computer Science & Engineering',
  collegeName: 'National Institute of Engineering & Technology',
  academicYear: '2024 - 2025',
  abstract: `Educational institutions generate and process massive volumes of academic and administrative data on a daily basis, including student admission records, course enrollments, faculty allocations, attendance logs, semester examination grades, and fee transactions. Traditional paper-based or disjointed spreadsheet records suffer from data redundancy, human error, lack of access control, and inefficient reporting.

This project presents a robust, modular, and scalable College Information & Student Management System developed in Java. The system leverages fundamental Object-Oriented Programming (OOP) paradigms (Encapsulation, Inheritance, Polymorphism, Abstraction) coupled with the Java Collections Framework, Streams API, and JDBC for relational database persistence. The application provides an intuitive desktop Graphical User Interface (GUI) built with Java Swing alongside an interactive Command Line Interface (CLI). Comprehensive analytics, such as automatic GPA/CGPA computation, attendance defaulter warning triggers (<75%), and instant fee receipts, streamline administrative operations while ensuring strict data integrity.`,
  problemStatement: 'Manual student record handling across multiple academic departments leads to communication bottlenecks, inconsistent grading calculations, delayed fee reconciliations, and time-consuming report generation during academic audits.',
  objectives: [
    'Automate student registration, course enrollment, and faculty profile management.',
    'Implement automated formula-based CGPA/GPA calculation based on weighted credits and internal assessments.',
    'Provide real-time attendance tracking with automatic low-attendance threshold warnings (<75%).',
    'Enable robust database CRUD persistence using JDBC and PreparedStatement to prevent SQL injection.',
    'Deliver both high-speed interactive CLI and modern Java Swing desktop GUI interfaces.'
  ],
  srs: {
    hardware: [
      'Processor: Intel Core i3/i5/i7 or AMD Ryzen 3/5/7',
      'RAM: 4 GB Minimum (8 GB Recommended)',
      'Hard Disk Space: 500 MB free storage for JVM, source code, and database records',
      'Display: Standard 1080p resolution monitor'
    ],
    software: [
      'Operating System: Windows 10/11, macOS, or Linux (Ubuntu 20.04+)',
      'Programming Language: Java SE Development Kit (JDK 17 or JDK 21 LTS)',
      'GUI Framework: Java Swing (javax.swing & java.awt)',
      'Database: MySQL Server 8.0+ / PostgreSQL 15+',
      'Database Driver: MySQL Connector/J 8.x JDBC Driver',
      'IDE / Build Tool: Eclipse IDE, IntelliJ IDEA, or NetBeans'
    ],
    functional: [
      'FR-1: Unique Roll Number Generation & Validation',
      'FR-2: Department Course Enrollment & Credit Tracking',
      'FR-3: Real-Time Attendance Ledger with <75% Defaulter Flagging',
      'FR-4: Continuous Internal Evaluation & End-Sem Grade Computation',
      'FR-5: Invoicing, Tuition Fee Tracking & Receipt Generation',
      'FR-6: Digital Library ISBN Cataloging & Overdue Fine Calculation',
      'FR-7: Interactive JVM Console Runner with Scanner Input',
      'FR-8: Standalone Swing Desktop GUI with JTable & Action Listeners'
    ]
  },
  modules: [
    {
      name: '1. Student Profile & Admission Module',
      description: 'Handles new student onboarding, generation of unique roll numbers, profile editing, and natural ordering via Comparable interface.',
      keyMethods: ['registerStudent()', 'findByRollNo()', 'updateProfile()', 'deleteStudent()']
    },
    {
      name: '2. Course & Curriculum Management Module',
      description: 'Maintains catalog of branch-wise subjects, credit weightage, faculty allocations, and student enrollment caps.',
      keyMethods: ['addCourse()', 'enrollStudent()', 'getSyllabusTopics()', 'getCourseRoster()']
    },
    {
      name: '3. Attendance Tracking & Warning Engine',
      description: 'Logs subject-wise daily attendance records and flags students who fall below the university minimum threshold of 75%.',
      keyMethods: ['markAttendance()', 'calculateAttendancePct()', 'getAttendanceDefaulters()']
    },
    {
      name: '4. Examination & CGPA Calculator Module',
      description: 'Computes internal assessment marks, end-semester exam scores, letter grades (A+, A, B, etc.), and cumulative grade point average (CGPA).',
      keyMethods: ['addMarks()', 'calculateCGPA()', 'generateMarksheet()', 'getRankList()']
    },
    {
      name: '5. Fee Accounting & Invoicing Module',
      description: 'Tracks semester tuition fees, laboratory fees, exam fees, and generates itemized printable payment receipts.',
      keyMethods: ['generateInvoice()', 'recordPayment()', 'getOverdueInvoices()']
    },
    {
      name: '6. Library Circulation Module',
      description: 'Catalogs books by ISBN and author, checks available stock, handles issues, and calculates late return fines.',
      keyMethods: ['issueBook()', 'returnBook()', 'calculateFine()']
    }
  ],
  tables: [
    {
      name: 'students',
      desc: 'Stores core student identity and academic status',
      columns: [
        { name: 'student_id', type: 'VARCHAR(20)', constraint: 'PRIMARY KEY', desc: 'Internal unique identifier' },
        { name: 'roll_no', type: 'VARCHAR(20)', constraint: 'UNIQUE, NOT NULL', desc: 'University assigned roll number' },
        { name: 'full_name', type: 'VARCHAR(100)', constraint: 'NOT NULL', desc: 'Student legal full name' },
        { name: 'branch', type: 'VARCHAR(30)', constraint: 'NOT NULL', desc: 'Academic engineering department' },
        { name: 'semester', type: 'INT', constraint: 'CHECK (1..8)', desc: 'Current enrolled semester' },
        { name: 'cgpa', type: 'DECIMAL(3,2)', constraint: 'DEFAULT 0.00', desc: 'Cumulative grade point average' },
        { name: 'attendance_pct', type: 'DECIMAL(4,1)', constraint: 'DEFAULT 100.0', desc: 'Aggregate attendance percentage' }
      ]
    },
    {
      name: 'courses',
      desc: 'Maintains catalog of academic subjects and credits',
      columns: [
        { name: 'course_code', type: 'VARCHAR(15)', constraint: 'PRIMARY KEY', desc: 'Unique course code (e.g. CS401)' },
        { name: 'course_title', type: 'VARCHAR(120)', constraint: 'NOT NULL', desc: 'Descriptive subject title' },
        { name: 'department', type: 'VARCHAR(30)', constraint: 'NOT NULL', desc: 'Offering department' },
        { name: 'credits', type: 'INT', constraint: 'NOT NULL', desc: 'Course credit weightage' },
        { name: 'semester', type: 'INT', constraint: 'NOT NULL', desc: 'Target curriculum semester' },
        { name: 'faculty_id', type: 'VARCHAR(20)', constraint: 'FOREIGN KEY', desc: 'Assigned professor identifier' }
      ]
    },
    {
      name: 'fee_invoices',
      desc: 'Tracks fee billing and payments',
      columns: [
        { name: 'invoice_id', type: 'VARCHAR(20)', constraint: 'PRIMARY KEY', desc: 'Unique fee invoice identifier' },
        { name: 'roll_no', type: 'VARCHAR(20)', constraint: 'FOREIGN KEY', desc: 'Associated student roll number' },
        { name: 'total_amount', type: 'DECIMAL(10,2)', constraint: 'NOT NULL', desc: 'Total semester fee billed' },
        { name: 'paid_amount', type: 'DECIMAL(10,2)', constraint: 'DEFAULT 0.00', desc: 'Amount paid by student' },
        { name: 'status', type: 'VARCHAR(20)', constraint: 'CHECK', desc: 'Paid, Partial, Pending, Overdue' }
      ]
    }
  ],
  testCases: [
    { id: 'TC-01', feature: 'Student Registration', input: 'Roll: 22CS109, Name: Aryan Sen, Dept: CSE, CGPA: 8.5', expected: 'Student registered in memory & JDBC DB without error', status: 'Passed' },
    { id: 'TC-02', feature: 'Duplicate Roll Check', input: 'Register existing roll 22CS101', expected: 'Validation rejects duplicate with error alert', status: 'Passed' },
    { id: 'TC-03', feature: 'Attendance Defaulter Warning', input: 'Attendance set to 68.5%', expected: 'Shortage flag raised (<75% threshold)', status: 'Passed' },
    { id: 'TC-04', feature: 'CGPA Grade Point Calc', input: 'Internal: 45/50, EndSem: 85/100', expected: 'Calculated Grade A+, Grade Point 10', status: 'Passed' },
    { id: 'TC-05', feature: 'Fee Receipt Balance Calc', input: 'Total: ₹85,000, Paid: ₹50,000', expected: 'Outstanding shows ₹35,000 with Partial status', status: 'Passed' },
    { id: 'TC-06', feature: 'Library Issue Stock Check', input: 'Issue book with Available Copies = 0', expected: 'Issue blocked with Out of Stock prompt', status: 'Passed' }
  ],
  conclusion: `The Integrated College Management System successfully fulfills all proposed objectives by streamlining administrative workflows, automating academic grading, and enforcing strict attendance compliance. By adhering to clean 3-tier architectural standards and core Object-Oriented design principles (Inheritance, Polymorphism, Encapsulation, Abstraction), the system provides high code reusability, testability, and maintainability.

The dual availability of a Swing Desktop GUI and an interactive JVM Console Runner ensures operational versatility across diverse campus computing environments. Future enhancements can seamlessly integrate Spring Boot RESTful microservices and biometric attendance readers without breaking the underlying domain logic.`,
  references: [
    'E. Balagurusamy, "Programming with Java: A Primer", 6th Edition, McGraw-Hill Education, 2019.',
    'Herbert Schildt, "Java: The Complete Reference", 12th Edition, Oracle Press / McGraw-Hill, 2021.',
    'Joshua Bloch, "Effective Java", 3rd Edition, Addison-Wesley Professional, 2018.',
    'James Gosling et al., "The Java Language Specification - Java SE 17 Edition", Oracle Documentation.',
    'Erich Gamma et al., "Design Patterns: Elements of Reusable Object-Oriented Software", Addison-Wesley.'
  ]
};

export const COLLEGE_PROJECT_REPORT = projectReportData;

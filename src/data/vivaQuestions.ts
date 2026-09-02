import { VivaQuestion } from '../types';

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 'viva-01',
    category: 'OOP Concepts',
    question: 'How did you implement Object-Oriented Programming (OOP) concepts in your College Project?',
    answer: 'In this project, OOP concepts are implemented systematically: 1) Abstraction: Created an abstract Person class with abstract method displayDetails(); 2) Inheritance: Student and Faculty inherit from Person; 3) Encapsulation: All fields (rollNo, cgpa, balance) are private with getter/setter validations; 4) Polymorphism: Method overriding of displayDetails() and toString(), plus method overloading for search operations.',
    keyPoints: [
      'Person is the abstract superclass',
      'Student and Faculty are subclasses (is-a relationship)',
      'Encapsulation prevents direct mutation of state',
      'Polymorphism dynamically resolves runtime types'
    ],
    difficulty: 'Basic',
    frequency: 'Very Common'
  },
  {
    id: 'viva-02',
    category: 'Core Java & JVM',
    question: 'Explain the JVM Architecture and how your Java code is executed.',
    answer: 'When we compile Java files using javac, it generates bytecode (.class files). The Java Virtual Machine (JVM) loads this bytecode via the ClassLoader Subsystem into Memory Areas (Method Area, Heap, Stack, PC Registers, Native Method Stack). The Execution Engine contains the Interpreter and JIT (Just-In-Time) compiler which converts bytecode into native machine code.',
    keyPoints: [
      'Bytecode is platform-independent (Write Once, Run Anywhere)',
      'Heap stores objects (e.g. Student instances)',
      'Stack stores method frames and local primitive variables',
      'JIT Compiler optimizes hot code segments at runtime'
    ],
    difficulty: 'Intermediate',
    frequency: 'Very Common'
  },
  {
    id: 'viva-03',
    category: 'Collections Framework',
    question: 'Why did you use HashMap vs ArrayList in your StudentService class?',
    answer: 'We used HashMap<String, Student> for the primary registry because roll numbers are unique keys, allowing O(1) constant time average complexity for lookups, insertions, and deletions. For ranked merit lists or branch-wise filtering, we convert values to an ArrayList or Java Stream to leverage Comparator and sorting algorithms (O(N log N)).',
    keyPoints: [
      'HashMap gives O(1) search by Roll Number',
      'ArrayList provides ordered traversal for reporting',
      'Streams API facilitates functional filtering and mapping'
    ],
    difficulty: 'Intermediate',
    frequency: 'Very Common'
  },
  {
    id: 'viva-04',
    category: 'JDBC & Database',
    question: 'What is the difference between Statement and PreparedStatement in JDBC? Which one did you use?',
    answer: 'PreparedStatement was used in DatabaseHelper.java. PreparedStatement is pre-compiled by the database engine, offering faster repeated query execution. More importantly, it prevents SQL Injection attacks by safely parameterizing user inputs (using ? placeholders) compared to Statement which constructs concatenated SQL strings.',
    keyPoints: [
      'PreparedStatement prevents SQL Injection vulnerability',
      'Pre-compiled for improved execution performance',
      'Uses setter methods (e.g. pstmt.setString(1, rollNo))'
    ],
    difficulty: 'Basic',
    frequency: 'Very Common'
  },
  {
    id: 'viva-05',
    category: 'Exception Handling',
    question: 'How do you handle runtime errors and exceptions in your application?',
    answer: 'We use Java structured try-catch-finally and try-with-resources blocks. For example, JDBC connections and Statements are opened in try-with-resources to guarantee automatic resource cleanup (closing DB connection) even if an SQL error occurs. We also validate inputs like invalid email formats or negative numbers and throw standard IllegalArgumentException.',
    keyPoints: [
      'Try-with-resources implements AutoCloseable to prevent memory leaks',
      'Checked exceptions (SQLException) vs Unchecked exceptions (IllegalArgumentException)',
      'Graceful error prompts in GUI / CLI rather than application crashes'
    ],
    difficulty: 'Basic',
    frequency: 'Common'
  },
  {
    id: 'viva-06',
    category: 'GUI (Swing/JavaFX)',
    question: 'What is the Event Dispatch Thread (EDT) in Java Swing?',
    answer: 'Swing components are not thread-safe. All GUI event handling, rendering, and component updates must happen on a single dedicated thread called the Event Dispatch Thread (EDT). We use SwingUtilities.invokeLater() to ensure our GUI initialization and updates are safely scheduled on the EDT.',
    keyPoints: [
      'Swing is single-threaded for UI manipulation',
      'SwingUtilities.invokeLater() queues tasks on the EDT',
      'Heavy background tasks should run on SwingWorker to avoid freezing the UI'
    ],
    difficulty: 'Advanced',
    frequency: 'Tricky'
  },
  {
    id: 'viva-07',
    category: 'Core Java & JVM',
    question: 'What is the difference between abstract class and interface in Java?',
    answer: 'An abstract class can have state (instance variables), constructors, and both concrete and abstract methods, used when classes share a strong is-a relationship (like Person -> Student). An interface primarily defines a contract (can-do relationship), supports multiple inheritance, and in modern Java (Java 8+) can have default and static methods.',
    keyPoints: [
      'A class can extend only one abstract class but implement multiple interfaces',
      'Abstract classes can define non-static and non-final fields',
      'Interfaces facilitate loose coupling and dependency injection'
    ],
    difficulty: 'Basic',
    frequency: 'Very Common'
  },
  {
    id: 'viva-08',
    category: 'Multi-threading',
    question: 'What is synchronization in Java and why is it needed in a Banking/Management application?',
    answer: 'Synchronization in Java controls the access of multiple threads to shared resources (like an Account balance). The synchronized keyword acquires an intrinsic object lock (monitor), preventing race conditions and ensuring that simultaneous deposit/withdraw operations remain thread-safe and consistent.',
    keyPoints: [
      'Prevents race conditions in multi-user concurrent environments',
      'Locks the critical section using synchronized method or block',
      'Guarantees ACID consistency for balance updates'
    ],
    difficulty: 'Intermediate',
    frequency: 'Common'
  }
];

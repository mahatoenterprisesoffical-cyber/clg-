import JSZip from 'jszip';
import { ProjectBlueprint } from '../types';
import { projectReportData } from '../data/projectReport';

export const downloadProjectZip = async (blueprint: ProjectBlueprint) => {
  const zip = new JSZip();

  // Root README.md
  const readmeContent = `# ${blueprint.title}
An Enterprise Academic College Management System developed in Java 17+ and Object-Oriented Programming (OOP).

## Project Overview
${blueprint.description}

## Technology Stack
- Java Development Kit (JDK 21 / OpenJDK)
- Swing & AWT for GUI
- Java Database Connectivity (JDBC)
- MySQL / PostgreSQL Relational Database
- Java Collections Framework & Streams API

## Folder Structure
\`\`\`
src/
 └── com/
      └── college/
           ├── model/
           │    ├── Person.java
           │    ├── Student.java
           │    ├── Faculty.java
           │    └── Course.java
           ├── dao/
           │    └── DatabaseHelper.java
           ├── service/
           │    └── StudentService.java
           ├── gui/
           │    └── CollegeSwingGUI.java
           └── main/
                └── StudentManagementSystem.java
database/
 └── schema.sql
\`\`\`

## How to Compile & Run

### 1. Database Setup
Create database in MySQL:
\`\`\`sql
CREATE DATABASE college_erp;
USE college_erp;
-- Run script in database/schema.sql
\`\`\`

### 2. Compile via CLI
\`\`\`bash
javac -d bin src/com/college/model/*.java src/com/college/dao/*.java src/com/college/service/*.java src/com/college/main/*.java src/com/college/gui/*.java
\`\`\`

### 3. Run Swing Desktop Application
\`\`\`bash
java -cp bin com.college.gui.CollegeSwingGUI
\`\`\`

### 4. Run CLI Console Application
\`\`\`bash
java -cp bin com.college.main.StudentManagementSystem
\`\`\`

## Object-Oriented Principles Implemented
${blueprint.oopConcepts.map((c) => `- ${c}`).join('\n')}
`;

  zip.file('README.md', readmeContent);

  // Maven pom.xml for easy import into IntelliJ / Eclipse / NetBeans / VS Code
  const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.college</groupId>
    <artifactId>college-management-system</artifactId>
    <version>1.0.0</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- MySQL JDBC Connector -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
    </dependencies>
</project>
`;
  zip.file('pom.xml', pomXml);

  // Add all Java files in src/ directory
  blueprint.files.forEach((file) => {
    zip.file(`src/${file.path}`, file.content);
  });

  // Add database schema
  if (blueprint.databaseScript) {
    zip.file('database/schema.sql', blueprint.databaseScript);
  }

  // Add Complete Academic Project Synopsis
  const reportText = `===============================================================
PROJECT SYNOPSIS & ACADEMIC REPORT
${projectReportData.title}
===============================================================

1. ABSTRACT:
${projectReportData.abstract}

2. OBJECTIVES:
${projectReportData.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

3. HARDWARE & SOFTWARE REQUIREMENTS:
Hardware:
${projectReportData.srs.hardware.map((h) => `- ${h}`).join('\n')}

Software:
${projectReportData.srs.software.map((s) => `- ${s}`).join('\n')}

4. FUNCTIONAL REQUIREMENTS:
${projectReportData.srs.functional.map((f, i) => `[FR-${i + 1}] ${f}`).join('\n')}

5. CONCLUSION:
${projectReportData.conclusion}
`;
  zip.file('docs/PROJECT_SYNOPSIS.txt', reportText);

  // Generate and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${blueprint.id}-java-project.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

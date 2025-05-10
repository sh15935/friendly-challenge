# SQL & NoSQL Injection Lab - README

## Overview
This lab environment is designed to help you understand and practice identifying, exploiting, and preventing both SQL and NoSQL injection vulnerabilities in web applications.

## Lab Setup

### Prerequisites
- Docker installed on your system
- Docker Compose (v2.0+ recommended)
- Web browser (Chrome/Firefox recommended)
- Optional: Postman for API testing

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/sh15935/friendly-challenge/
   cd friendly-challenge
   ```

2. Start the lab environment:
   ```bash
   docker-compose up -d
   ```

3. Access the lab interface at:
   ```
   http://localhost:8080
   ```

## Lab Components

### 1. SQL Injection Modules
- **Basic SQLi**: Simple login bypass exercises
- **Union-based**: Data extraction techniques
- **Blind SQLi**: Time-based and boolean-based scenarios
- **Error-based**: Exploiting error messages
- **Second-order**: Stored procedure injections

### 2. NoSQL Injection Modules
- **MongoDB Injection**: BSON and operator injection
- **Login Bypass**: Bypassing authentication
- **JSON Injection**: Manipulating JSON queries
- **Array-based**: Exploiting array operators

## Usage Instructions

### Starting an Exercise
1. Select a module from the web interface
2. Read the scenario description
3. Use the provided input fields to test your injections
4. Submit your payload to see the results

### Sample Payloads
#### SQL Injection Examples:
```sql
' OR '1'='1
admin'--
' UNION SELECT username, password FROM users--
```

#### NoSQL Injection Examples:
```javascript
{"$ne": "invalid"}
{"$gt": ""}
username[$regex]=^admin&password[$ne]=wrongpass
```

## Safety Considerations

⚠️ **This lab is for educational purposes only**  
- Do not use these techniques on systems you don't own or have permission to test
- All exercises are contained within the Docker environment
- No real data is used in these exercises

## Troubleshooting

If you encounter issues:
1. Check Docker is running: `docker ps`
2. Restart containers: `docker-compose restart`
3. View logs: `docker-compose logs`
4. Reset the lab: `docker-compose down && docker-compose up -d`


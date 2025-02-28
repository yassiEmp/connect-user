```markdown
# MAC Address Authentication and Management System

This repository contains a Node.js script that automates the process of logging into a router, managing connected devices, and logging user details such as MAC addresses, connection duration, and associated metadata. The system interacts with a router's web interface, performs security-related actions, and saves relevant data into a database using Prisma.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/repository-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd repository-name
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables (e.g., Prisma database connection, etc.). You may need to create a `.env` file in the project root and specify the necessary configurations.

## Usage

1. Run the script to automate router login and MAC address management:

   ```bash
   npm run start
   ```

2. The script uses Puppeteer to control the browser, log into the router, and manipulate the router interface (e.g., managing MAC filters).

3. When a new MAC address needs to be added, a POST request is sent to the system with the MAC address, connection duration, user details, etc.

4. The script updates the router configuration and stores the user data in the database using Prisma.

### Example POST Request:

Send a `POST` request to the server with the following JSON body:

```json
{
  "mac": "00:14:22:01:23:45",
  "time": 30,
  "name": "John Doe",
  "numero": "123456789"
}
```

The response will include the MAC address that was processed.

## Project Structure

- `index.js`: Main entry point for handling the logic.
- `prisma/`: Contains Prisma schema files and database models.
- `package.json`: Project configuration and dependencies.
- `.env`: Environment variables for sensitive configurations (e.g., database connection strings).

## Dependencies

- `puppeteer`: A headless browser automation library for controlling the router's web interface.
- `prisma`: Database ORM for managing user data.
- `express`: Web framework for handling HTTP requests.
- `node`: JavaScript runtime.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify this template according to your specific setup and requirements.
```

Let me know if you want to adjust any sections!

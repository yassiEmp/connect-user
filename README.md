---

# Router User Disconnection Automation

Automates the process of disconnecting users from a router's web interface based on their MAC addresses and disconnection time stored in a database. It uses **Puppeteer** for browser automation and **Prisma** for database management.

## Features
- Log into the router's web interface.
- Retrieve connected MAC addresses.
- Disconnect users based on their MAC addresses.
- Remove users from the database after disconnection.
- Handle pop-up dialogs automatically.

## Requirements
- Node.js
- Puppeteer
- Prisma
- A router with a web interface (default IP: `192.168.1.1`)
- A database with a `user` table containing `mac` and `heureDeconnection` fields.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Prisma:
   - Update `prisma/schema.prisma` with your database credentials.
   - Run `npx prisma generate` to generate the Prisma client.

4. Install Puppeteer:
   ```bash
   npm install puppeteer
   ```

## Usage

1. **Run the script**:
   - The script checks for users whose `heureDeconnection` has passed and disconnects them from the router based on their MAC addresses. 
   - It then deletes the users from the database.

   To run the script:
   ```bash
   node <your_script_file.js>
   ```

2. **Output**:
   - The script logs the current time, fetched users, and the MAC addresses being disconnected.

3. **Example Output**:
   ```bash
   Current Time: 1679422516893
   Fetched Users: [
     { mac: "00:11:22:33:44:55", heureDeconnection: "1679422516893" }
   ]
   connectedMac: [ "00:11:22:33:44:55" ]
   Users deleted
   ```

## Configuration

- **Router Login**:
  - **Username**: `useradmin`
  - **Password**: `6fJ6Q`
- **Router IP**: `http://192.168.1.1/`

Modify the login credentials and router IP as needed in the script.

## Troubleshooting

- **MAC Address Not Found**: Ensure the MAC address is correctly entered and the router interface is accessible.
- **Database Errors**: Verify Prisma is configured correctly and that the `user` table includes `mac` and `heureDeconnection`.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Let me know if you'd like any further changes!

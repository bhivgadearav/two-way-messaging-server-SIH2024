
# Two-Way Messaging System Backend

This is the backend server for the Two-Way Messaging System, a project developed as part of the Smart India Hackathon 2024. The server handles real-time messaging and user management, providing the foundation for a dynamic chat application.

## Features

- **Real-Time Messaging:** Uses Socket.IO to enable instant communication between users.
- **User Management:** Supports user authentication and session management.
- **Message Storage:** Handles message routing and storage efficiently.

## Tech Stack

- **Node.js:** JavaScript runtime for building the server-side application.
- **Express.js:** Web framework for Node.js to handle HTTP requests and routing.
- **Socket.IO:** Library for real-time, bidirectional communication between clients and the server.

## Setup

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/your-backend-repo.git

2. **Navigate to the Project Directory::**
   ```bash
   cd your-backend-repo

3. **Install Dependencies:**
   ```bash
   npm install

4. **Adjust Server URL & MongoDB URL:**
Create your own MongoDB cluster and AWS EC2 instance and configure the respective urls accordingly

5. **Start the Server::**
   ```bash
   npm run start
The server will be running on http://localhost:3000 by default.

## API Endpoints
- **POST /message:** Send a new message.
- **GET /messages:** Retrieve messages between users.
- **GET /loadChat:** Load previous messages between a sender and receiver.

## Deployment
The backend is deployed on AWS EC2. Ensure that the security groups and instance settings allow for communication on the specified port (default is 3000).

### Accessing the Deployed Server
The server is accessible at http://12.345.678.90:3000 (replace with your EC2 public IP address).
#### Notes
Make sure to replace placeholder values with actual values relevant to your setup.
Ensure that the server's port is open in your EC2 security group settings.


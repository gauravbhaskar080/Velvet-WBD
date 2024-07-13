# MERN E-commerce Website

This project is a E-commerce Site: Explore a wide range of home interior items including tiles, furniture and artifacts for all your decorating needs.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Setup](#setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Built with the MERN stack, featuring Admin, Company, and Customer dashboards for comprehensive management and shopping experience, including Stripe payment integration.
- GitHub for version control, GitHub Actions for CI/CD, Docker for containerization, Vercel for frontend & Render for backend deployment, database indexing, Redis caching, and RESTful API implementation for B2B/B2C interactions.

## Demo

[Velvet Homes](https://velvet-wbd.vercel.app/)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gauravbhaskar080/Velvet-WBD
   ```

2. **Install dependencies:**

   Navigate to the project directory and run:

   ```bash
   cd Velvet-WBD

   cd frontend
   npm install
   cd backend
   npm install
   ```

3. **Set up .env:**

   - Create a `.env` file in the root directory and add your MongoDB URL:

     ```
     MONGO_URI = 'your_mongo_db_url'
     CLOUDINARY_CLOUD_NAME = dx2suxgxm
     CLOUDINARY_API_KEY = your cloudinary_api_key
     CLOUDINARY_API_SECRET = your cloudinary_api_secret
     STRIPE_KEY = your_stripe_key
     CLIENT_URL = http://localhost:3000
     ```

## Usage

1. **Start the server:**
   
   In a new terminal window, navigate to the `backend` directory and run:

   ```bash
   cd backend
   npm start
   ```

   The server will start at `http://localhost:5000`.

2. **Start the client:**

   In a new terminal window, navigate to the `frontend` directory and run:

   ```bash
   cd frontend
   npm start
   ```

   The client will start at `http://localhost:3000`.

3. **Access the website:**

   Open a web browser and go to `http://localhost:3000`.

## File Structure

- `frontend/`: Contains the React frontend.
  - `public/`: Holds static files like CSS, images, and JavaScript.
  - `src/`: Contains the main source code.
    - `Components/`: React components used in the application.
    - `features\login`: Redux ToolKit for Login & Logout. 
    - `Pictures/`: All the images that use in website.
    - `redux/`: Import Login from features and configureStore , to create centralized store.
    - `Screens/`: Website pages used in the application.
    - `stylesheets/`: All the style pages used in website.
    - `api.js`: In this file your deployed backend link, that deployed on render. 
    - `App.js`: The main application component.
    - `index.js`: Entry point of the React application.
    - `dockerfile` : All commands for frontend deployment on docker
   
- `backend/`: Contains the Node.js backend.
  - `controllers/`: Controllers for handling routes and data.
  - `data/`: Sample data for initial setup.
  - `middleware/`: Custom middleware functions.
  - `models/`: Mongoose models for MongoDB.
  - `public/`: Static files.
  - `routes/`: Express.js route handlers.
  - `.env`: Configuration file for environment variables.
  - `dockerfile` : All commands for backend deployment on docker
  - `index.js`: Entry point of the Node.js application.

- `docker-compose.yml`: Run commands for frontend dockerfile & backend dockerfile
  
## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the original repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your own purposes.

---

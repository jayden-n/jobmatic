# JobMatic 💼

> A job tracking personalized application that keeps things real simple - create, update/delete, and handlidy manage all your job-hunting activities

## Installation & Setup

1. **Clone Repository:**

    ```sh
    git clone https://github.com/jayden-n/jobmatic.git
    ```
    
1. **Install Depenencies for Client and Server:**
    
    ```sh
    cd jobmatic
    npm run setup-project
    ```

2. **Create a **`.env`** file in the ***root*** of this project:**
    
    ```sh
    touch .env
    ```

3. **Configure Environment Variables (**`.env`**) with following variables & examples:**
    
    ```makefile
    # server
    NODE_ENV=development
    PORT=5100
    
    # database
    MONGO_URL=YOUR_MONGO_DB_URI

    # cloudinary
    CLOUD_NAME=YOUR_CLOUDINARY_NAME
    CLOUD_API_KEY=YOUR_CLOUDINARY_API_KEY
    CLOUD_API_SECRET=YOUR_CLOUDINARY_API_SECRET

    # JWT
    JWT_SECRET=YOUR_JWT_SECRET
    JWT_EXPIRES_IN=YOUR_DESIRED_JWT_EXPIRED_TIME
    ```

4. **Launch JobMatic:**
    
    ```sh
    npm run dev
    ```


## Tech Stack

- **Front-end:**
  
    - [React.js](https://react.dev/) for handily building UI out of components
    - [React Context API](https://react.dev/reference/react/useContext) for handling app state management
    - [TanStack Query (F.K.A React Query)](https://tanstack.com/query/latest) for data feching, caching, synchronizing and updating server state
    - [Recharts.js](https://recharts.org/en-US/) for displaying accurate job-hunting application statistics
    - [Axios-http](https://axios-http.com/docs/intro) for sending HTTPS requests to Server (CRUD operations)
    - [React-router-dom](https://reactrouter.com/en/main) for client-side routing strategies
    - [styled-components](https://styled-components.com/) for responsive web design
 
- **Back-end:**
  
    - [Express.js](https://expressjs.com/) & [Node.js](https://nodejs.org/en) for developing RESTful API requests/responses using HTTP methods (CRUD operations) with layered validations system
    - [MongoDB](https://www.mongodb.com/) for Cloud Database
    - [Cloudinary](https://cloudinary.com/) for uploading & storing images
    - [JSON Web Token (JWT)](https://jwt.io/) for securely authenticating & authorizing user login/register

## Optimization:

Future improvements will aim for optimizations in:

- [x] (front-end) adding global loading for better UX/UI to users with not good Internet connection

- [x] (front-end) efficiently data caching & synchronizing with server state with [TanStack Query (F.K.A React Query)](https://tanstack.com/query/latest). Instead of requesting data every time user navigating to each page 
      
- [ ] (front-end) displaying shorter Pagination indicator for better UI. Instead of whole total pages which might cause bugs if user creates too many job applications

- [ ] migrating to TypeScript for better self-documenting codebase and improves code readability

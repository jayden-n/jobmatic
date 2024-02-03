# JobMatic 💼

> [!NOTE]
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


<br/>


## Tech Stack

- **Front-end:**
  
    - [React.js](https://react.dev/) for building UI out of components
    - [TypeScript](https://www.typescriptlang.org/) for ensuring a self-documenting & type-safe codebase
    - [React Context API](https://react.dev/reference/react/useContext) for handling app state management
    - [TanStack Query (F.K.A React Query)](https://tanstack.com/query/latest) for data feching, caching, synchronizing and updating server state
    - [Recharts.js](https://recharts.org/en-US/) for displaying accurate job-hunting application statistics
    - [Axios-http](https://axios-http.com/docs/intro) for sending HTTPS requests to Server (CRUD operations)
    - [React-router-dom](https://reactrouter.com/en/main) for managing client-side routing strategies
    - [styled-components](https://styled-components.com/) for responsive web design


 
- **Back-end:**
  
    - [Express.js](https://expressjs.com/) & [Node.js](https://nodejs.org/en) for developing RESTful API endpoints, handling HTTP methods (CRUD operations) with layered validations
    - [MongoDB](https://www.mongodb.com/) for Cloud Database (data storage)
    - [Cloudinary](https://cloudinary.com/) for uploading & storing images
    - [bcrypt.js](https://www.npmjs.com/package/bcrypt) for secure hashing of user passwords
    - [JSON Web Token (JWT)](https://jwt.io/) for securely authenticating & authorizing user login/register through Cookies



<br/>


## What problems can this application solve?

1. **Job Tracking 📆**
   
    - ``Create, Read, Update, Delete (CRUD):``
      
        - Users can easily manage their job-hunting activities through intuitive CRUD operations
        - Add new job applications, edit existing ones, mark applications as pending, declined, or under interview, and also delete unnecessary entries

    - ``Job Types:``

        - Users can categorize job applications into three types: Full-time, Part-time, and Internship, providing clarity in their job search

    - ``Status Tracking:``
   
        - Keep track of the application status with three options: Pending, Declined, and Interview
        - Easily filter and view applications based on their current status


2. **Secure Authentication & Authorization 🌐**

    - ``JWT Authentication:``
      
        - Utilize JSON Web Token (JWT) for secure authentication and authorization through cookies, ensuring user login and registration processes are protected

  
3. **Sorting & Filtering 🕵️**

    - ``Sorting Options:``
   
        - Sort job applications by newest, oldest, A-Z, or Z-A, making it convenient for users to prioritize and organize their job list.

    - ``Filtering by Job Type and Status:``

        - Efficiently filter job applications based on job type (Full-time, Part-time, Internship) or status (Pending, Declined, Interview)


  
4. **User Profile Management 🖼️**

    - ``Profile Editing:``
   
        - Users can update their profile information, ensuring that their details are always current and accurate

    - ``Avatar Profile Picture:``
   
        - Upload and manage a personalized avatar profile picture, adding a personal touch to the user's profile



5. **Dark/Light Mode 🌚🌞**

    - ``Dark/Light Mode Switch:``

        - Implement a user-friendly interface with the option to switch between Dark and Light modes, enhancing the overall user experience.




6. **Data Visualization 📊**

    - ``Job Application Statistics:``

        - Utilize Recharts.js to display insightful statistics progress related to job-hunting activities based on their applied time




7. **Seamless User Experience 🚀**

    - ``React.js and Context API:``

        - Leverage React.js and React Context API to build a seamless and responsive user interface, ensuring a smooth and enjoyable user experience
  
    - ``TanStack Query (F.K.A React Query):``

        - Utilize TanStack Query for efficient data fetching, caching, synchronization, and updating server state, making sure users get the latest data
     


      
## Optimizations:

Future improvements will aim for optimizations in:

- [ ] (back-end) controlling & limiting the rate of incoming requests from a set of IP addresses in order to protect the Server from potential brute-force attacks

- [x] (front-end) proficiently data caching & synchronizing with server state with [TanStack Query (F.K.A React Query)](https://tanstack.com/query/latest). Instead of requesting data every time user navigating to each page 
      
- [ ] (front-end) displaying shorter Pagination indicator for better UI. Instead of whole total pages which might cause bugs if user creates too many job applications

- [x] migrating to TypeScript for better self-documenting codebase and improves code readability

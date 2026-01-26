📋 My Todo Project

Welcome to my Todo 2.0 project! Why is it called 2.0 you may ask? Well that's because I beefed it up a bit! This Todo app comes with login authentication/authorization
and JSON Web Tokens.
It is built with a React/TypeScript frontend and an ASP.Net Core Web Api/Entity Framework/SQLite backend.

🌟 Features

🔒 Register: Register as a user to add your todos.

🔑 Password Hashing: All stored passwords are hashed for safety.

✅ Add Todos: Quickly add new todos with a simple input.

✏️ Edit Todos: Modify existing todos with ease.

🗑️ Delete Todos: Remove todos that are no longer needed.

📋 Todo Priority: Set a priority on each todo between 1 and 3.

☁️ Deployment & Cloud Setup (AWS)

This project was deployed to AWS as part of a cloud development course to get practical experience with deploying a real application.

Setup overview:

* Frontend: Hosted as a static website in an Amazon S3 bucket.

* Backend API: Containerized and deployed using AWS Elastic Beanstalk, pulling the image from Docker Hub.

* Permissions: Basic access permissions configured using AWS IAM.

* Frontend ↔ Backend communication: JWT-based authentication.

The focus was on understanding the deployment flow, container-based deployment, and how cloud services integrate in practice.

🖼️ Screenshots

![Home](https://github.com/MattiasL2001/Todo/assets/45106868/c0f9d699-01b9-413c-bddd-19b3c1875bed)

![Register](https://github.com/MattiasL2001/Todo-2.0/assets/45106868/f7c911be-468c-47c4-81f6-0853e14d5ba4)

![Login](https://github.com/MattiasL2001/Todo/assets/45106868/ae6411c3-0257-4ed3-bdd4-d0916d94c52c)

![Todos](https://github.com/MattiasL2001/Todo/assets/45106868/c7c684d0-413d-4997-b377-44b67dddcfd8)

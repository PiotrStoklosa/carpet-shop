# Carpet Shop

Hi! Welcome to the basic carpet shop. This application was written for Script Language Laboratory.

## How to set up and run this app locally

1. Create database: ```docker run --name mongodb -d -p 27017:27017 mongo```
2. Open database ```docker exec -it mongodb mongosh```
3. Create database for the project ```use carpet-shop```
4. Add some carpets and categories to test the application (to match pictures on frontend you can run scripts located
   under ```scripts``` directory). Load carpets: ```load(<path-to-the-project-root-directory>/scripts/carpets.js)```, <br> load categories: ```load(<path-to-the-project-root-directory>/scripts/categories.js)```
5. Exit the database console.
6. Download the application using ```git clone https://github.com/PiotrStoklosa/carpet-shop```
7. Go to the project source code: ```cd carpet-shop```
8. Run the backend part using ```ts-node src/server.ts```
9. Go to the frontend part ```cd frontend```
10. Run the frontend part ```npm start```
11. Application should run and be available under ```http://localhost:3000```


## Technologies

- TypeScript
- React.ts
- Express
- Docker
- Hooks

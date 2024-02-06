# Job Application Tracker
![Application Demo Gif](https://github.com/abematt/job-tracker-v2/blob/main/media/demogif.gif)
##[Check Out Demo Here!](https://job-tracker-v2.netlify.app/)

## Description

The Job Application Tracker is a web application designed to help users keep track of their job applications. This project came out of a simple need to replace the Google sheets based job application tracking I was doing. I realized that the more applications I sent, the harder it became to keep track of it in one table, let alone getting meaningful insights from it. So I decided to create a  web application with better accessibility to do the same. 

## Development Journey

Throughout the development of this project, I focused on trying out different technologies I was excited to work with. Here are some highlights:

- **Technologies Explored**: I experimented with various technologies including:
  - Frontend: React.js developed using Vite, Styling using a combination of shdcn/ui and TailwindCSS. 
  - Backend: Node.js, Express.js, MongoDB, JSON Web Tokens
  - Deployment: Netlify
- **Challenges Overcome**: I encountered several hurdles along the way. This application was a overhaul of a previous job application tracker I made. This was an attempt to amend the mistakes from it
  - Integrating authentication and authorization features securely
  - Managing state effectively in React components: I was able to work with react's Context API, Hooks to manage state effectively. 
  - Leveraging shdcn/ui's Tanstack table implementation to create a light weight table render that can easily be filtered and sorted. 
- **Learning Opportunities**:
  - The initial application significantly slowed down as the number of job applications increased, I was able to address this using the Tanstack table. 
  - While developing the first version of this, Multiple friends of mine expressed an interest in using the system. I was able to address this by implementing a login and sign up feature to track job applications by individual user.
  - I learned good coding practices for Express server route creation, mongoose model creation as well as using middleware.
  - Designing an application with other people in mind made me more mindful of my choices and because of this, I developed this application with a sense of responsibility
  - Starting to work with Typescript

## Future Implementations

While the current version of the Job Application Tracker provides essential functionality, there are several areas for future improvement and expansion:

- **User Authentication**: Enhance authentication mechanisms with features like OAuth integration for third-party logins.
- **Data Visualization**: Implement data visualization tools to provide users with insights into their job search progress and trends.
- **Email Notifications**: Introduce email notification functionality to remind users of upcoming deadlines or follow-ups.
- **Mobile Optimization**: Optimize the application for mobile devices to ensure a seamless user experience across all platforms.
- **Job Application Notes**: Create a notes feature that functions as a diary to reflect back on
- **Job Posting Details**: Automatically pull in job application details based on information user provides, or ask user for link of the job posting. 

## Demo

You can try out the Job Application Tracker [https://job-tracker-v2.netlify.app/](#) 

![Application Screenshot](https://github.com/abematt/job-tracker-v2/blob/main/media/Job%20Tracker%20Screenshot%201.png)


## Contributing

Contributions are welcome! If you have any suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

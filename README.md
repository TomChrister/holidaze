# Holidaze – Accommodation Booking Front-End

Holidaze is a modern front-end application for a newly launched accommodation booking site. The platform allows users to browse and book venues for holidays, as well as register as venue managers to manage listings and bookings.

## 📦 Project Overview

This application is built based on the official Holidaze API. The project includes:

- A **customer-facing** interface for users to search, view, and book venues.
- An **admin-facing** interface for venue managers to create and manage their venues and bookings.

## 🧑‍💻 User Types

- **Visitor** – not logged in
- **Customer** – registered and logged in as a customer
- **Venue Manager** – registered and logged in as a venue manager

## 🧭 Features & User Stories

### All Users
- View a list of venues
- Search for specific venues
- View a specific venue page by ID
- Register with a `stud.noroff.no` email (as customer or venue manager)
- View a calendar with available and booked dates

### Customers
- Login/logout
- Create bookings
- View upcoming bookings
- Update avatar/profile picture

### Venue Managers
- Login/logout
- Create venues
- Edit/update their own venues
- Delete their own venues
- View bookings for their venues
- Update avatar/profile picture

## 🛠️ Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🎨 Design
- [Design systems here](https://www.figma.com/design/vXABTe0KFQ0psM8XOwvCxA/Holidaze?node-id=85-2024&t=szppvexWKe0GqdN3-1)

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/holidaze.git
   cd holidaze
   
2. Install dependencies
    ````bash
   npm install

3. Start the development server
    ````bash
   npm run dev

4. Open localhost
    ````bash
   Usually http://localhost:5173
   
## 📱 Deployment

- [Deployed live site here](https://holidaze-eta.vercel.app/)

## 🔗 Resources

- API Documentation: [API Docs](#https://docs.noroff.dev/docs/v2/holidaze/venues)

---

> Built as part of a front-end development course using modern tools and best practices.


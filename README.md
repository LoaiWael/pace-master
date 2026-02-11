# PaceMaster

> **Master your time. Separate the fleeting from the foundational.**

![Project Banner](https://github.com/LoaiWael/pace-master/blob/main/public/imgs/banner.webp)
## 📖 About The Project

PaceMaster is not just another to-do list; it is a comprehensive time management and productivity tool designed to help you understand *how* you work. 

Unlike standard task managers, PaceMaster recognizes the difference between **Temporary Tasks** (one-off to-dos) and **Daily Work** (permanent routines/habits). It combines rigorous activity logging with visual analytics to help you monitor your performance and optimize your schedule.

### 🌟 Key Features

* **Task Separation:**
    * **Temporary Tasks:** Manage one-time to-dos with deadlines and priorities.
    * **Permanent Daily Work:** distinct section for recurring routines and daily operational tasks.
* **Smart Categorization:** Organize all workflow items into custom categories (e.g., Work, Study, Health) for better filtering.
* **Time Monitoring:** Built-in timer/tracker to record exactly how long each task takes.
* **Productivity Analytics:** A data dashboard that visualizes your work history, completion rates, and time distribution across categories.
* **Activity Log:** A chronological record of your daily achievements.

## 🛠️ Tech Stack

This project is built entirely as a generic client-side application, requiring no backend server setup.

* **Core:** React + Vite + TypeScript
* **Styling:** CSS Modules / Tailwind CSS / Shadcn / Motion
* **State Management:** Context API
* **Data Persistence:** LocalStorage / IndexedDB (Browser-based storage)
* **Icons & Charts:** Lucide React

## 🔒 Data & Privacy

This application follows a **"Local-First"** architecture.
* **No Cloud Sync:** All your tasks, logs, and analytics are stored directly in your browser's local storage.
* **Privacy Focused:** Your data never leaves your device and is not sent to any external server.
* **Offline Capable:** The app works fully without an internet connection once loaded.

## 🚀 Getting Started

### Prerequisites

* Node.js & npm installed

### Local Development

1.  Clone the repository
    ```sh
    git clone https://github.com/LoaiWael/pace-master
    ```
2.  Install dependencies
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

## 📱 Usage

1.  **Dashboard:** View your current "Daily Work" items and pending "To-Dos" side-by-side.
2.  **Tracking:** Click the "Start" button on any task to begin the timer.
3.  **Analysis:** Navigate to the "Reports" tab to see a pie chart of where your time went this week.

## 🛣️ Roadmap

- [x] Basic Task & Routine CRUD
- [x] Time Tracking Implementation
- [x] Dark Mode Support
- [ ] Mobile App Synchronization
- [ ] Export Analytics to PDF/CSV

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## 📧 Contact

Loai Wael - [@LinkedIn](https://www.linkedin.com/in/loai-wael-cs/) - loaiwael.dev@gmail.com

Project Link: [https://github.com/LoaiWael/pace-master](https://github.com/LoaiWael/pace-master)

# NotionX ✨  
**A modern Notion clone with real-time collaboration**  
[Live Demo](https://notionx.vercel.app) | [Report Issue](https://github.com/M0HAMEDHANY/NotionX/issues)

<img src="https://github.com/user-attachments/assets/cf46e68d-92f3-4d2e-80b3-68929eea5aa1" alt="WhatsApp Image" width="300" height="300" />
 
---

## 🚀 Features

- **Real-time Collaboration**  
  Multi-user editing powered by [Liveblocks](https://liveblocks.io)

- **Rich Document Editor**  
  Enjoy markdown-style formatting and support for nested components

- **Secure Authentication**  
  Seamless Google/GitHub sign-in via [Clerk](https://clerk.dev)

- **Dark Mode**  
  User-friendly theme switching for low-light environments

- **Document Management**  
  Create, update, and delete notes with instant syncing

- **Team Collaboration**  
  Invite collaborators via email with granular permission controls

- **Version History**  
  Automatic document backups using Firebase Firestore

---

## 🛠 Tech Stack

**Frontend**  
- ![Next.js](https://img.shields.io/badge/Next.js-14.1.0-000000?logo=next.js)  
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwind-css)  
- ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.5.0-000000)

**Backend & Services**  
- ![Liveblocks](https://img.shields.io/badge/Liveblocks-1.5-000000)  
- ![Clerk](https://img.shields.io/badge/Clerk-4.28-000000)  
- ![Firebase](https://img.shields.io/badge/Firebase-10.5-FFCA28?logo=firebase)

**Animation**  
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-0055FF?logo=framer)

---

## 📦 Installation

Follow these steps to set up NotionX locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/M0HAMEDHANY/NotionX.git
   cd NotionX
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the project root and add your credentials:

   ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY
    NEXT_PUBLIC_FIREBASE_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
    NEXT_PUBLIC_LIVEBLOCKS_PRIVATE_KEY
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Configuration Guide

### Clerk Authentication

1. Visit the [Clerk Dashboard](https://dashboard.clerk.dev) and create a new project.
2. Enable Google and GitHub authentication methods.
3. Add `localhost:3000` to your list of allowed origins.
4. Update your environment variables with the provided keys.

### Liveblocks Setup

1. Sign up at [Liveblocks](https://liveblocks.io) and create a new project.
2. Generate your secret key for room authorization.
3. Configure presence and storage settings in your `liveblocks.config.ts` file.

### Firebase Integration

1. Create a new Firestore database via the [Firebase Console](https://console.firebase.google.com).
2. Structure your database as follows:

   ```json
   {
     "documents": {
       "docId": {
         "title": "Document Title",
         "content": "Markdown Content",
         "ownerId": "user_id",
         "collaborators": ["user@example.com"]
       }
     }
   }
   ```

3. Update your `.env.local` with your Firebase configuration values.

---

## 🖼️ Screenshots

| Feature               | Preview                      |
|-----------------------|------------------------------|
| **Document Editor**   | ![Screenshot 2025-02-02 031254](https://github.com/user-attachments/assets/ab777d00-9b73-4105-ab79-0a1ebab46318)|
| **Real-time Collab**  | ![Screenshot 2025-02-02 031016](https://github.com/user-attachments/assets/eebd04b0-0ba9-423e-82fc-fc893061e3b9)|
| **Dark Mode**         | ![Screenshot 2025-02-02 022906](https://github.com/user-attachments/assets/67a63da8-7325-476b-ab47-128add175ab3)|
| **User Management**   | ![Screenshot 2025-02-02 031107](https://github.com/user-attachments/assets/e77b5bbe-d2e8-4a01-872f-b65e74dfc002)|


---

## 🤝 Contributing

Contributions are welcome! Follow these steps to submit a pull request:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/awesome-feature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add awesome feature"
   ```

4. **Push to Your Branch**

   ```bash
   git push origin feature/awesome-feature
   ```

5. **Open a Pull Request**

For major changes, please open an issue first to discuss what you would like to change.



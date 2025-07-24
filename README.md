# 📸 Zubale Test Instagram-like Feed App with Expo and Clean Architecture

This project is an example mobile application developed with **Expo and React Native**, simulating an Instagram-style post feed. It has been designed following **Clean Architecture** principles to keep the code modular, scalable, and easy to maintain.

---

## ✨ Features

* **Post Feed:** Displays an infinite scroll list of posts fetched from an API.
* **Intuitive User Interface:** Instagram-like design with avatars, usernames, images, and an interaction section.
* **Enhanced Interaction Section:** "Like," "Comments," and "Save" icons, with numerical counters next to the relevant icons for better visibility.
* **Post Details:** Shows the author's name, description, and formatted creation date.
* **Pagination and Infinite Loading:** Automatically loads more posts when scrolling down.
* **Pull-to-Refresh:** Allows updating the feed by pulling down.
* **State Management with Zustand:** Efficient and centralized application state management.
* **Date Formatting with Moment.js:** User-friendly presentation of post timestamps.
* **Clean Architecture:** Modular project structure with well-defined Domain, Data, and Presentation layers.

---

## 🚀 Technologies Used

* **Expo:** Framework for building React Native applications.
* **React Native:** For native user interface development.
* **Zustand:** Lightweight and flexible state management library.
* **Moment.js:** For date parsing and formatting.
* **`@expo/vector-icons` (Ionicons):** For UI icons.
* **TypeScript:** For more robust development with static typing.
* **Fetch API:** For making HTTP requests to the API.

---

## 🏗️ Clean Architecture Structure

The project is organized into the following main layers:

Markdown

# 📸 Instagram-like Feed App with Expo and Clean Architecture

This project is an example mobile application developed with **Expo and React Native**, simulating an Instagram-style post feed. It has been designed following **Clean Architecture** principles to keep the code modular, scalable, and easy to maintain.

---

## ✨ Features

* **Post Feed:** Displays an infinite scroll list of posts fetched from an API.
* **Intuitive User Interface:** Instagram-like design with avatars, usernames, images, and an interaction section.
* **Enhanced Interaction Section:** "Like," "Comments," and "Save" icons, with numerical counters next to the relevant icons for better visibility.
* **Post Details:** Shows the author's name, description, and formatted creation date.
* **Pagination and Infinite Loading:** Automatically loads more posts when scrolling down.
* **Pull-to-Refresh:** Allows updating the feed by pulling down.
* **State Management with Zustand:** Efficient and centralized application state management.
* **Date Formatting with Moment.js:** User-friendly presentation of post timestamps.
* **Clean Architecture:** Modular project structure with well-defined Domain, Data, and Presentation layers.

---

## 🚀 Technologies Used

* **Expo:** Framework for building React Native applications.
* **React Native:** For native user interface development.
* **Zustand:** Lightweight and flexible state management library.
* **Moment.js:** For date parsing and formatting.
* **`@expo/vector-icons` (Ionicons):** For UI icons.
* **TypeScript:** For more robust development with static typing.
* **Fetch API:** For making HTTP requests to the API.

---

## 🏗️ Clean Architecture Structure

The project is organized into the following main layers:
```
src/
├── core/             # General utilities and abstractions (Failures, Either)
│   ├── failures/
│   └── utils/
├── data/             # Repository implementations and data sources
│   ├── datasources/  # Logic for interacting with external APIs (remote)
│   └── repositories/ # Concrete implementations of repository interfaces
├── domain/           # The core of the application (technology-agnostic)
│   ├── entities/     # Definition of data structures (PostEntity)
│   ├── repositories/ # Abstract interfaces for data interaction
│   └── use_cases/    # Specific business logic (e.g., GetPostsUseCase)
└── presentation/     # UI layer and state management
    ├── components/   # Reusable UI components (e.g., PostCard)
    ├── screens/      # Main screen components (e.g., FeedScreen)
    └── stores/       # Zustand stores for UI state management
```
## 🛠️ Installation and Usage

Follow these steps to set up the project on your local machine:

### Prerequisites

* Node.js (v14 or higher) and npm or yarn installed.
* Expo CLI installed globally: `npm install -g expo-cli`

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone git clone git@github.com:javiergb85/zubaleTest.git
    cd instagram-feed-app
    ```
 

2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

### Run the Application

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    # expo start
    ```
2.  This will open the Expo Developer Tools in your browser. You can then:
    * Scan the QR code with the **Expo Go** app on your mobile device (iOS or Android).
    * Select the option to open it in an iOS or Android **emulator/simulator**.
    * Press `w` to open it in a **web browser** (though the experience won't be native).

---

## ⚙️ API Used

This project consumes a simulated post API to fetch feed data.

* **Base URL:** `https://662029f13bf790e070af2cd8.mockapi.io/api/v1`
* **Posts Endpoint:** `/posts`
* **Example Request (with pagination):** `https://662029f13bf790e070af2cd8.mockapi.io/api/v1/posts?page=1&limit=10`
* **`Post` Object Structure:**
    ```json
    {
      "createdAt": "2024-04-17T02:20:22.340Z",
      "name": "Jackie Schinner",
      "avatar": "[https://cloudflare-ipfs.com/ipfs/.../avatar/920.jpg](https://cloudflare-ipfs.com/ipfs/.../avatar/920.jpg)",
      "description": "fault-tolerant",
      "likes": 99016,
      "image": "[https://loremflickr.com/640/480](https://loremflickr.com/640/480)",
      "comments": 39609,
      "liked": false,
      "saved": true,
      "location": "Bogota",
      "id": "1"
    }
    ```

---

## 🤝 Contributions

Contributions are welcome! If you find a bug or have an improvement, feel free to open an *issue* or submit a *pull request*.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

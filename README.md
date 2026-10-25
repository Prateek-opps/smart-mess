# 🍽️ Smart Mess
### Smart Meal Management & NGO Food Rescue System

Smart Mess is a web-based project designed to improve meal management, manage food inventory, and reduce food wastage by connecting surplus food with NGOs.

The project uses Firebase Authentication and Cloud Firestore for user authentication and data storage. It provides separate pages for the main website, admin dashboard, and NGO food rescue requests.

## ✨ Features

- 🍱 **Meal Management:** Collect and manage meal responses.
- 📦 **Food Inventory Management:** Save food inventory details and view records.
- 📊 **Food Demand Prediction:** Help estimate meal requirements through the admin dashboard.
- 🤝 **NGO Food Rescue:** Allow NGOs to submit requests for surplus food.
- 🔐 **Firebase Authentication:** Provide user authentication.
- ☁️ **Cloud Firestore:** Store meal responses, inventory, and food rescue requests.
- 🖥️ **Admin Dashboard:** Manage inventory and review student responses.
- 🌐 **Web Deployment:** Host the website using GitHub Pages.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase Authentication
- Cloud Firestore
- GitHub
- GitHub Pages

## 📁 Project Structure

```text
smart-mess/
├── index.html
├── admin.html
├── ngo.html
├── style.css
├── app.js
└── README.md
```

*Note: The filenames above are an example structure. Keep only the files that actually exist in your repository and preserve any additional folders used by your project.*

## 🚀 Live Website

**Main Website:**  
https://Prateek-opps.github.io/smart-mess/

**Admin Dashboard:**  
https://Prateek-opps.github.io/smart-mess/admin.html

**NGO Food Rescue Page:**  
https://Prateek-opps.github.io/smart-mess/ngo.html

## ⚙️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Prateek-opps/smart-mess.git
```

### 2. Open the Project

```bash
cd smart-mess
```

Open the project folder in Visual Studio Code.

### 3. Run the Website

Open `index.html` in your browser or use the Live Server extension in Visual Studio Code.

### 4. Configure Firebase

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your Smart Mess Firebase project.
3. Configure Firebase Authentication with the sign-in method used by the application.
4. Add `Prateek-opps.github.io` under Authentication → Settings → Authorized domains.
5. Verify that the Firebase configuration in your JavaScript matches your project.
6. Configure appropriate Firestore security rules.

### 5. Deploy Using GitHub Pages

1. Open the GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the `main` branch.
5. Select the `/(root)` folder.
6. Click **Save**.
7. Wait for deployment and open the live website link.

## 🗃️ Firebase Database Collections

The project uses the following Firestore collections:

- **mealResponses:** Stores meal response information.
- **foodInventory:** Stores food inventory records.
- **foodRescueRequests:** Stores NGO food rescue request information.

The fields and permissions in Firestore must match the application's code and security rules.

## 🧪 Testing Checklist

- [ ] Main website opens successfully.
- [ ] CSS and page layout display correctly.
- [ ] Admin authentication works.
- [ ] Authorized admin accounts can access admin features.
- [ ] Food inventory records can be saved and retrieved.
- [ ] NGO food rescue requests can be submitted.
- [ ] Submitted data appears in the correct Firestore collection.
- [ ] Unauthorized users cannot perform admin-only operations.
- [ ] Website works on desktop and mobile screens.

## 🔐 Security

- Keep Firestore security rules properly configured.
- Do not allow unrestricted database access in production.
- Never upload passwords, private keys, or Firebase service-account credentials to GitHub.
- Enforce admin permissions through Firestore security rules, not only through frontend JavaScript.
- Use dummy data while testing the application.

## 🌱 Future Enhancements

- Improve food demand prediction using historical meal data.
- Add food rescue request status tracking.
- Add notifications for NGOs and administrators.
- Generate food inventory and waste reduction reports.
- Improve mobile responsiveness and accessibility.
- Add more detailed analytics and reporting features.

## 🤝 Contributing

Contributions and suggestions for improving Smart Mess are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Make and test your changes.
4. Submit a pull request with a description of your improvements.

## 📄 License

No license has been specified for this project yet. Add a suitable license if you want to explicitly permit reuse or redistribution.

---

**Smart Mess — Smarter Meal Management, Less Food Waste, Better Food Rescue.**

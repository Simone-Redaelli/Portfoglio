// 1. IMPORTIAMO TUTTO IL NECESSARIO
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    setPersistence, 
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. LA TUA CONFIGURAZIONE (INCOLLA QUI I TUOI CODICI VERI!!!)
export const firebaseConfig = {
    apiKey: "AIzaSyD1LnDnFa6Yr0y2ZA1BrnGhjxGW4TrNjm0",
    authDomain: "db--medici.firebaseapp.com",
    projectId: "db--medici",
    storageBucket: "db--medici.firebasestorage.app",
    messagingSenderId: "1036578434966",
    appId: "1:1036578434966:web:f7efe660bd2a744a99b7b7",
    measurementId: "G-SXQDDFW294"
};

// 3. CREIAMO L'APP E L'AUTH (Ecco cosa mancava!)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 4. GESTIONE DEL CLICK SUL BOTTONE
const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        // Impostiamo la memoria "LOCALE" (così ricorda chi sei)
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithPopup(auth, provider);
            })
            .then((result) => {
                console.log("Login riuscito:", result.user.displayName);
                // Vai al portale
                window.location.href = "portale.html";
            })
            .catch((error) => {
                console.error("Errore:", error);
                alert("Errore Login: " + error.message);
            });
    });
} else {
    console.log("Nessun bottone login trovato in questa pagina (normale se sei già nel portale)");
}

// Esportiamo auth per usarlo altrove se serve
export { auth };
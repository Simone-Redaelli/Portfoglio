/* --- logger.js: IL CERVELLO DEI LOG --- */

// Funzione principale per salvare un evento
function registraLog(azione, stato = "Successo") {
    // 1. Cerchiamo di capire chi è l'utente (se hai salvato il nome al login)
    // Se non c'è un utente salvato, usiamo "Ospite"
    const utenteCorrente = localStorage.getItem('utenteLoggato') || "Ospite";

    // 2. Recuperiamo i log esistenti
    let logs = JSON.parse(localStorage.getItem('systemLogs')) || [];

    // 3. Creiamo il nuovo evento
    const nuovoLog = {
        data: new Date().toISOString(), // Data precisa computer
        timestamp: Date.now(),          // Numero per ordinare
        utente: utenteCorrente,         // Chi ha fatto l'azione
        azione: azione,                 // Cosa ha fatto (es. "Login")
        stato: stato                    // Es. "Successo" o "Errore"
    };

    // 4. Aggiungiamo e salviamo
    logs.push(nuovoLog);
    
    // Teniamo pulito l'archivio: se ci sono più di 1000 log, cancelliamo i più vecchi
    if(logs.length > 1000) logs.shift();

    localStorage.setItem('systemLogs', JSON.stringify(logs));
    
    console.log("Log registrato:", azione); // Per controllo in console
}

// --- AUTO-LOG VISITE PAGINE ---
// Appena questo file viene caricato, registra che pagina stiamo guardando
document.addEventListener("DOMContentLoaded", () => {
    const paginaAttuale = document.title;
    // Evitiamo di loggare troppe volte la dashboard stessa
    if(!paginaAttuale.includes("Dashboard")) {
        registraLog("Visita: " + paginaAttuale, "Info");
    }
});
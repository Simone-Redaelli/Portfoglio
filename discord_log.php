<?php
// discord_log.php

// 1. INSERISCI QUI IL TUO WEBHOOK DI DISCORD
$webhookurl = "https://discord.com/api/webhooks/1468347990992359425/Yc_e4aW-v2bFAsaieTPtb2GkG0cLgTEhnTP-3k2mH-oairxSkj3nIW1AoFryB5amf7FM";

// Riceve i dati dal JavaScript (JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Controlla se i dati esistono
if(isset($data['action']) && isset($data['user'])) {
    $action = $data['action']; // "entra" o "esce"
    $username = $data['user'];
    $orario = date("H:i:s d/m/Y");

    // Impostazioni Grafiche dell'Embed
    if ($action == "entra") {
        $color = hexdec("00dbde"); // Ciano/Verde (Entrata)
        $title = "🟢 Entrata in Servizio";
        $desc = "**$username** ha timbrato il cartellino ed è ora operativo.";
    } else {
        $color = hexdec("ff4444"); // Rosso (Uscita)
        $title = "🔴 Uscita dal Servizio";
        $desc = "**$username** ha terminato il turno.";
    }

    // Struttura del messaggio per Discord (JSON)
    $discordData = [
        "username" => "Sistema Gestione Ore", // Nome del Bot
        "avatar_url" => "https://i.imgur.com/TuoiLinkIcona.png", // (Opzionale) Icona del bot
        "embeds" => [
            [
                "title" => $title,
                "type" => "rich",
                "description" => $desc,
                "color" => $color,
                "footer" => [
                    "text" => "Log Sistema • " . $orario,
                ],
                "thumbnail" => [
                    "url" => "https://i.imgur.com/EsempioBadge.png" // (Opzionale) Immagine piccola a destra
                ]
            ]
        ]
    ];

    // Invio tramite cURL
    $json_data = json_encode($discordData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $ch = curl_init($webhookurl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    curl_close($ch);
}
?>
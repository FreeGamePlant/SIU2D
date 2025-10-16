<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "elaifigueroa@gmail.com";
    $subject = "Novo contato de $name";
    $body = "Nome: $name\nE-mail: $email\n\nMensagem:\n$message";
    $headers = "From: elaifigueroa@gmail.com";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: /SITESPROJETOS.FGP/FreeGamePlant/public/html/contato.html?status=sucesso");
        exit;
    } else {
        header("Location: /SITESPROJETOS.FGP/FreeGamePlant/public/html/contato.html?status=erro");
        exit;
    }
} else {
    echo "Arquivo encontrado! (Acesse via formulário)";
}
?>
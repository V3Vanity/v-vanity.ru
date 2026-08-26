<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST['email'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Неверный формат email.";
        exit;
    }

    $to = "jun30010kmtn.ruu@gmail.com"; 
    $subject = "Новая заявка с сайта";
    $message = "Пользователь указал email: $email";
    $headers = "From: no-reply@v-vanity.ru\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Ваш Email отправлен.";
    } else {
        echo "Ошибка при отправке.";
    }
} else {
    echo "Введите email.";
}
?>

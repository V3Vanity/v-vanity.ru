<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['first_name']);
    $lastName = htmlspecialchars($_POST['last_name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);

    // Почта получателя
    $to = "jun30010kmtn.ruu@gmail.com";  //

    $subject = "Новое сообщение с формы";
    $message = "Имя: $firstName\nФамилия: $lastName\nТелефон: $phone\nEmail: $email";

    // Заголовки письма
    $headers = "From: no-reply@" . $_SERVER['SERVER_NAME'] . "\r\n" .
               "Reply-To: $email\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    // Попробуем отправить письмо
    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        // 🔥 Показываем диагностическую информацию
        echo "error: mail() failed. Check if mail() is enabled on server.";
    }
} else {
    echo "error: wrong method (not POST)";
}
?>

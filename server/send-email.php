<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    // Připojení k databázi
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bukacekleseni_database";
    $tablename = "contactform";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Připojení k databázi selhalo: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $jmeno = $_POST['jmeno'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $sql = "INSERT INTO $tablename (jmeno, email, message) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("sss", $jmeno, $email, $message);
            $stmt->execute();
        } else {
            echo "Chyba: " . $sql . "<br>" . $conn->error;
        }

        // Odeslání emailu pomocí PHPMailer
        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Username = 'e134dd56038dfe';
            $mail->Password = 'f49d430150447d';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587; // nebo 25, 465, 2525 podle vašeho výběru

            $mail->setFrom('from@example.com', 'Mailer');
            $mail->addAddress('lukasmrk46@gmail.com', 'Joe User');
            $mail->addReplyTo('luky.mrkvicka@seznam.cz', 'Information');

            $mail->isHTML(true);
            $mail->Subject = 'LESENI-BUKACEK ZPRÁVA';
            $mail->Body = '
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 5px; border: 1px solid #ccc;">
        <div> Nová zpráva z kontaktního formuláře <h2 style="color: #14a83c;"> LESENIBUKACEK</h2>  </div>
        <p><strong>Jméno:</strong> <br> ' . htmlspecialchars($jmeno, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Email:</strong> <br> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Zpráva:</strong><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>
    </div>';


            $mail->CharSet = 'UTF-8'; // Nově přidaný řádek
            $mail->send();

            header('Location: success.html');

        } catch (Exception $e) {
            echo "Zprávu se nepodařilo odeslat. Chyba při odesílání: {$mail->ErrorInfo}";
        }

        $conn->close();
    }
?>

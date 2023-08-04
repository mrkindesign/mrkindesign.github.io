<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "zalaba_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Připojení k databázi selhalo: " . $conn->connect_error);
}

if (isset($_GET['email'])) {
    $email = urldecode($_GET['email']);

    // ověření platnosti e-mailové adresy
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Neplatná emailová adresa');
    }

    $sql = "UPDATE subscribers SET confirmed = 1 WHERE email = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            echo "Děkujeme za potvrzení odběru novinek.";
        } else {
            echo "Nepodařilo se najít vaši e-mailovou adresu, nebo jste již potvrdil(a) odběr novinek.";
        }
    } else {
        echo "Omlouváme se, ale něco se pokazilo. Zkuste to prosím později.";
    }
} else {
    echo "Chybí parametr e-mailu.";
}

$conn->close();

?>
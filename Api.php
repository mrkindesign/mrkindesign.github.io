<?php
$clientId='44038' ; $clientSecret='iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU' ; $code=htmlspecialchars($_GET['code']); //
    Exchange code for Token $ch=curl_init(); curl_setopt($ch,
    CURLOPT_URL, 'https://www.bungie.net/Platform/App/OAuth/token/' ); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:
    application/x-www-form-urlencoded')); curl_setopt($ch, CURLOPT_USERPWD, $clientId . ':' . $clientSecret);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array( 'grant_type'=> 'authorization_code',
    'code' => $code
    )));

    $response = curl_exec($ch);
    $response = json_decode($response);
    curl_close($ch);

    // Using access token to get user's bungie account
    $accessToken = $response->access_token;
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://www.bungie.net/Platform/User/GetCurrentBungieAccount/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $accessToken
    ));

    $userInfo = curl_exec($ch);
    $userInfo = json_decode($userInfo);

    curl_close($ch);

    // Konvertuje výstup do formátu JSON
$jsonOutput = json_encode($userInfo);

// Vypíše výstup na obrazovce
echo $jsonOutput;

    ?>
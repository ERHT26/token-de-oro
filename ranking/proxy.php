<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$api_url = $_GET["url"];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $api_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "x-apisports-key: 6308d4db454108bc9e980a1784362264"
    ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>

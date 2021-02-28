<?php

$data = json_decode(file_get_contents('php://input'), true);

$sURL = 'https://tariff.pochta.ru/v2/calculate/tariff?json&object=3020&from=' . $data['from'] . '&to=' . $data['to'] . '&weight=' . $data['weight'] . '&isavia=0&closed=1&sumoc=' . $data['sumoc'] . '&date=' . date('Ymd'); // URL-адрес POST

$aHTTP = array(
    'https' => // Обертка, которая будет использоваться
        array(
            'method' => 'POST',
        )
);
$context = stream_context_create($aHTTP);
$contents = file_get_contents($sURL, false, $context);

$sURL2 = 'https://api.edu.cdek.ru/v2/calculator/tariff/?weight=' . $data['weight'] . '&width=100&length=50&height=20&from=337&to=' . $data['to_cdek'] . '&contract=2&pay_to=1&tariffs=136,137&insurance=' . $data['sumoc'] . '&cost=0';
$aHTTP2 = array(
    'https' => // Обертка, которая будет использоваться
        array(
            'method' => 'GET', // Метод запроса
        )
);
$context2 = stream_context_create($aHTTP2);
$contents2 = file_get_contents($sURL2, false, $context2);

$result = array(
    'russianPost' => json_decode($contents),
    'cdek' => json_decode($contents2)
);

echo json_encode($result);


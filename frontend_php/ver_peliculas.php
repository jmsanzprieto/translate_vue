<?php

include 'config.php';

// URL de autenticación
$auth_url = $auth_url_dest; 

// Datos para la solicitud de autenticación
$auth_data = array(
    'username' => $api_username,
    'password' => $api_password
);

// Llamamos a la API de autenticación
$options = array(
    'http' => array(
        'method'  => 'POST',
        'header'  => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($auth_data)
    )
);

$context  = stream_context_create($options);
$response = file_get_contents($auth_url, false, $context);

if ($response === FALSE) {
    die('Error al realizar la solicitud de autenticación');
}

// La variable $response ahora contiene el token de acceso.
$auth_response = json_decode($response, true);

if (isset($auth_response['access'])) {
    $access_token = $auth_response['access'];
    $refresh_token = $auth_response['refresh'];

    // URL de la API de peliculas, si está la autenticación OK
    $api_url =  $api_url_dest; 

    // Token de acceso y el refresh token en el contenido
    $options = array(
        'http' => array(
            'header' => "Authorization: Bearer $access_token",
        )
    );

    $context  = stream_context_create($options);
    $response = file_get_contents($api_url, false, $context);

    if ($response === FALSE) {
        die('Error al realizar la solicitud a la API de peliculas');
    }

    // Respuesta de la API de peliculas en formato JSON.
    echo $response;
} else {
    die('No se pudo obtener el token de acceso.');
}

?>

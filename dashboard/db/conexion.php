<?php
$host = "localhost";
$usuario = "root";
$password = "";
$bd = "simulacros";

// Crear conexión
$conexion = new mysqli($host, $usuario, $password, $bd);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

echo "Conexión exitosa a la base de datos";
?>

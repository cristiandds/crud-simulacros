<?php
// /dashboard/db/auth.php

// Incluir la conexión a la base de datos
include 'db_connection.php';

// Verificar si los datos fueron enviados
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario
    $name = $_POST['username'];  // Aquí usamos 'username' como 'name'
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validar que las contraseñas coincidan
    if ($password != $confirm_password) {
        echo "Las contraseñas no coinciden.";
        exit();
    }

    // Verificar si el nombre de usuario o el correo ya existen
    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "El correo electrónico ya está registrado.";
        exit();
    }

    // Encriptar la contraseña
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (name, email, password) VALUES (:name, :email, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashed_password);

    if ($stmt->execute()) {
        echo "Registro exitoso";
        // Redirigir a la página de login o al dashboard
        header("Location: /dashboard/login.php"); 
    } else {
        echo "Error al registrar usuario.";
    }
}
?>

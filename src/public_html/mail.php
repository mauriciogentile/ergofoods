<?php
  require("class.phpmailer.php");
  require("class.smtp.php");

  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $msg = $_POST["message"];

  $mail = new PHPMailer(true);

  $body = '<html><body>
  <h1>HAUZEN CORP</h1>
  <h3>Consulta Web:</h3>
  <table rules="all" style="border-color: #666;" cellpadding="10">
  <tr style=background: #eee;><td><strong>Nombre y Apellido:</strong> </td><td> '. $name .' </td></tr>
  <tr><td><strong>Email:</strong> </td><td> '. $email .' </td></tr>
  <tr><td><strong>Telefono:</strong> </td><td> '. $phone .' </td></tr>
  <tr><td><strong>Mensaje:</strong> </td><td> '. $msg .' </td></tr>
  </table>
  </body></html>';
  
  $mail->IsSMTP(); 
  $mail->Host = "smtp.gmail.com";
  $mail->Port = 587;
  $mail->SMTPSecure = 'tls';
  $mail->SMTPDebug = 1; 
  $mail->setFrom($email, $name);
  $mail->Subject = $email;
  $mail->AddAddress('r.boffi@hauzencorp.com', "HAUZEN CORP");
  $mail->MsgHTML($body);  
  $mail->SMTPAuth = true; 
  $mail->Username = "automatic.noreplay@gmail.com";
  $mail->Password = ""; 
  
  if($mail->Send()) {
    echo "Message sent!";
  } else {
    echo "Mailer Error: " . $mail->ErrorInfo;
  }
?>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Set the recipient email address (your email)
    $to = "janmajay@iitdalumni.com"; // Replace with your email address

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings for sending email to you
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'your-email@gmail.com';                 // SMTP username
        $mail->Password   = 'your-email-password';                  // SMTP password (use an app-specific password if required)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption
        $mail->Port       = 587;                                    // TCP port to connect to

        // Email to you (recipient)
        $mail->setFrom($email, $name);
        $mail->addAddress($to);                                     // Add your email address

        // Content of the email to you
        $mail->isHTML(true);                                        // Set email format to HTML
        $mail->Subject = "Contact Form: $subject";
        $mail->Body    = "You have received a new message from your website contact form.<br><br>".
                         "<strong>Name:</strong> $name<br>".
                         "<strong>Email:</strong> $email<br>".
                         "<strong>Message:</strong><br>$message";

        // Send the email to you
        $mail->send();

        // Now send an automated "Thank You" email to the sender
        $mail->clearAddresses(); // Clear previous recipient email address
        $mail->addAddress($email);  // Add the sender's email address

        // Content of the thank you email
        $mail->Subject = "Thank You for Contacting Us";
        $mail->Body    = "Dear $name,<br><br>Thank you for getting in touch with us! ".
                         "We have received your message and will get back to you as soon as possible.<br><br>".
                         "Best regards,<br>Janmajay Kumar";
        
        // Send the thank you email
        $mail->send();

        // Success message
        echo "Message and thank you email have been sent successfully!";
        
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Your email address (recipient)
    $to = "contact";  // Replace with your email address

    // Email subject and body for you
    $subjectForYou = "Contact Form: $subject";
    $bodyForYou = "You have received a new message from your website contact form.\n\n".
                 "Here are the details:\n".
                 "Name: $name\n".
                 "Email: $email\n\n".
                 "Message:\n$message\n";

    // Headers for the email to you
    $headersForYou = "From: $email\r\n" .
                     "Reply-To: $email\r\n" .
                     "X-Mailer: PHP/" . phpversion();

    // Send email to you
    $mailSentToYou = mail($to, $subjectForYou, $bodyForYou, $headersForYou);

    // Email subject and body for the sender
    $subjectForSender = "Thank You for Contacting Us";
    $bodyForSender = "Dear $name,\n\nThank you for getting in touch with us! ".
                     "We have received your message and will get back to you as soon as possible.\n\n".
                     "Best regards,\nJanmajay Kumar";

    // Headers for the thank you email
    $headersForSender = "From: $to\r\n" .
                        "Reply-To: $to\r\n" .
                        "X-Mailer: PHP/" . phpversion();

    // Send thank you email to the sender
    $mailSentToSender = mail($email, $subjectForSender, $bodyForSender, $headersForSender);

    // Check if both emails were sent successfully
    if ($mailSentToYou && $mailSentToSender) {
        echo "Message and thank you email have been sent successfully!";
    } else {
        echo "Failed to send the message or thank you email.";
    }
}
?>

console.log("User: <%= @subscribed_email.email %> is not valid.");
$('#subscribe_message').text("That email address is invalid or is already on the email list<br />");
$('#subscribe_message').show();
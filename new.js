function viewAdminPage() {
var href = $(this).attr("href");
if (!isPermissionPasswordSet()) {
var passwordPrompt = await PageProtectionPrompt.prompt("Enter the admin password to access to this area");
if (passwordPrompt) localStorage.setItem("adminpass", passwordPrompt);
else {
alert("Password is required");
return;
}
}
var checkPermissionResponse = checkPermission(href);
if (!checkPermissionResponse) {
alert("Wrong password");
return;
}
window.location = href;
});
}
function checkPermission(href) {
href = (href === undefined) ? '' : href;
var storedPassword = localStorage.getItem("adminpass");
var result = false;
jq.ajax({
url: "https://www.vulnerabletarget.com/checkpermission",
success: function(data) {
result = data.result;
},
async: false,
data: {
"pass": storedPassword,
"href": href
},
type: 'POST'
});
return result;
}
$(document).on('click', '.logout', function() {
localStorage.removeItem("adminpass");
alert("You are now logged out");
window.location = loginpage;
});

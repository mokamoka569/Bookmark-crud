var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var sitesEmail = [];
if (localStorage.emails != null) {
  sitesEmail = JSON.parse(localStorage.emails);
} else {
  sitesEmail = [];
}
function addEmail() {
 if(validation("siteName")&&validation("siteUrl")){
  var newEmail = {
    bookmark: siteName.value,
    website: siteUrl.value,
  };

  sitesEmail.push(newEmail);
  localStorage.setItem("emails", JSON.stringify(sitesEmail));
  clearInput();
  display();
 }
 else{
  Swal.fire({
    icon: "error",
    title: "data is invalid",
    text: "please enter the valid data",
  });
 }
}
function validation(id) {
  var myElement = document.getElementById(id);
  var regexs = {
    siteName: /^[a-zA-Z]\w{3,15}$/,
    siteUrl: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  };
  var testString = myElement.value;
  if (regexs[id].test(testString)) {
    myElement.classList.add("is-valid");
    myElement.classList.remove("is-invalid");
    document.getElementById("alertName").classList.add("d-none")

    return true;
  } else {
    myElement.classList.add("is-invalid");
    myElement.classList.remove("is-valid");
    document.getElementById("alertName").classList.remove("d-none")
    return false;
  }
}

function clearInput() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid")
  siteUrl.classList.remove("is-valid")

}
function display() {
  var cartona = ``;
  for (var i = 0; i < sitesEmail.length; i++) {
    cartona += `
                <tr>
                    <td>${i}</td>
                    <td>${sitesEmail[i].bookmark}</td>
                    <td><a href="${sitesEmail[i].website}" class="btn btn-success" target="_blank"><i class="fas fa-eye"></i> visit</a></td>
                    <td><button onclick=" deleteEmail(${i})" class="btn btn-danger"><i class="fas fa-trash-can"></i> delete</button></td>
                </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = cartona;
}
display();
function deleteEmail(i) {
  sitesEmail.splice(i, 1);
  localStorage.emails = JSON.stringify(sitesEmail);
  display();
}

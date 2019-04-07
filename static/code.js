
var codearea = document.getElementById("code_submit");
var submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function(){
      console.log(codearea.value);
      var code = codearea.value;
      console.log(JSON.stringify({"code":code, "lang":"javascript", "stdin":""}));
      fetch("http://talos.feralhosting.com:3000/code/", {
  body: JSON.stringify({"code":code, "lang":"javascript", "stdin":""}),
  mode: 'cors',
  headers: {
      'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  method: "POST"
}).then(response => response.json())
  .then(data => {
    console.log(JSON.parse(data));
    document.getElementsByClassName('output')[0].innerHTML = JSON.parse(data).output;
  });


    })

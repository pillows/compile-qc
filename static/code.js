
var codearea = document.getElementById("code_submit");
var submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function(){
      console.log(codearea.value);
      var code = codearea.value;
      fetch("http://qc.mwong.io:8000/compile/", {
  body: JSON.stringify({"code":code, "lang":"javascript", "stdin":""}),
  mode: 'cors',
  headers: {
      'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  method: "POST"
}).then(response => response.json())
  .then(data => {
    console.log(data.output)
    document.getElementsByClassName('output')[0].innerHTML = data.output;
  });


    })

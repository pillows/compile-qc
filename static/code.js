
var codearea = document.getElementById("code_submit");
var submitBtn = document.getElementById("submit");

let sendScores = (successes, cases) => {
    let payload = {
        cases: cases,
        successes: successes
    }
    fetch("http://talos.feralhosting.com:3000/dashboard", {
      body: JSON.stringify({
          "code": code,
          "lang": "javascript",
          "stdin": ""
      }),
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "POST"
  })
}
submitBtn.addEventListener("click", function(){
      console.log(codearea.value);
      var code = codearea.value;
      console.log(JSON.stringify({"code":code, "lang":"javascript", "stdin":""}));
      fetch("http://talos.feralhosting.com:3000/code/", {
        body: JSON.stringify({
            "code": code,
            "lang": "javascript",
            "stdin": ""
        }),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementsByClassName('output')[0].innerHTML = JSON.parse(data.stdout).output.replace(/\n/g, "<br/>");
        let cases = JSON.parse(data.cases)
        let successes = JSON.parse(data.successes);
        console.log(cases, successes);

        sendScores(cases, successes)

    });


})

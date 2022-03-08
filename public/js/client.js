console.log("Client script loaded.");

// a function declaration inside of a callback ... which takes a callback function :O
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log('responseText:' + xhr.responseText);
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

ajaxGET("/data/data.html", function (data) {
  document.getElementById("tablePlaceholder").innerHTML = data;
});

ajaxGET("/data/data.js", function (data) {
  console.log("Before parsing", data);
  // this call is JSON so we have to parse it:
  let parsedData = JSON.parse(data);
  console.log("Before parsing", parsedData);
  let str = "<ol>"
  for (let i = 0; i < parsedData.length; i++) {
      str += "<li>" + parsedData[i]["name"] + "</li>";
      str += "<li>" + parsedData[i]["current price"] + "</li>";
      str += "<li>" + parsedData[i]["msrp"] + "</li>";
      str += "<li>" + parsedData[i]["stock"] + "</li>";
      str += "<li>" + parsedData[i]["memory"] + "</li>";
  }
  str += "</ol>";
  document.getElementById("jsonPlaceholder").innerHTML = str;
});
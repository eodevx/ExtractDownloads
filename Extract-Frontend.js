// Function to make the API call
function makeAPICall() {
    // Get the text from the input field
    var inputText = document.getElementById("textInput").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse JSON response
            var jsonResponse = JSON.parse(this.responseText);
            // Get the content of the response
            var responseContent = jsonResponse.urlliststring;
            // Split the string at each space character
            var urls = responseContent.split(' ');
            // Create an HTML string with each URL in a separate paragraph
            var formattedResponse = urls.map(url => "<p>" + url + "</p>").join('');
            // Get the <div> element by its id
            var responseContentDiv = document.getElementById("responseContent");
            // Set the inner HTML of the <div> to the formatted response content
            responseContentDiv.innerHTML = formattedResponse;
        }
    };
    // Replace the parameter content part with the text from the input field
    xhttp.open("GET", "http://127.0.0.1:9001/?input=" + encodeURIComponent(inputText), true);
    xhttp.send();
}

// Add event listener to button
document.getElementById("apiButton").addEventListener("click", function() {
    makeAPICall();
    this.style.backgroundColor = "#0056b3";
    setTimeout(() => {
        this.style.backgroundColor = "#007bff";
    }, 200);
});

// Function to copy the result
function copyResult() {
    var responseContent = document.getElementById("responseContent");
    var range = document.createRange();
    range.selectNode(responseContent);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    // Provide feedback
    var copyButton = document.getElementById("copyButton");
    copyButton.textContent = "Result Copied!";
    setTimeout(function() {
        copyButton.textContent = "Copy Result";
    }, 2000); // Reset text after 2 seconds
}

// Add event listener to copy button
document.getElementById("copyButton").addEventListener("click", function() {
    copyResult();
    this.style.backgroundColor = "#0056b3";
    setTimeout(() => {
        this.style.backgroundColor = "#007bff";
    }, 200);
});

// Function to open all URLs without delay
function openAllURLs() {
    var responseContent = document.getElementById("responseContent");
    var urls = responseContent.getElementsByTagName("p");
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i].textContent.trim();
        if (url.startsWith("http") || url.startsWith("https")) {
            window.open(url);
        }
    }
}



// Add event listener to open all URLs button
document.getElementById("openAllButton").addEventListener("click", openAllURLs);

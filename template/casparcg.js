// exposes leftTab method to the casparCG server
// leftTab(action: String ['on','off'], message: String ['BBC NEWS HH:MM']): void
function leftTab(action, message) { 
    switch (action) {
        case "on":
            document.getElementById('left-strap').style.right = "0px";
            document.getElementById('left-strap-text').innerHTML = message;
            break;
        case "off":
            document.getElementById('left-strap').style.right = "356px";
            break;
        default:
            console.log("LeftTab called with invalid option.")
    }
}

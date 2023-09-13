var numeroInput = document.getElementById("numero");

numeroInput.addEventListener("input", function() {
  var valor = numeroInput.value;
  numeroInput.value = valor.replace(/[^0-9]/g, "");
});
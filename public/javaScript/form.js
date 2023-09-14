var numeroInput = document.getElementById("numero");

numeroInput.addEventListener("input", function() {
  var valor = numeroInput.value;
  numeroInput.value = valor.replace(/[^0-9]/g, "");
});

var numeroInput = document.getElementById("numero2");

numeroInput.addEventListener("input", function() {
  var valor = numeroInput.value;
  numeroInput.value = valor.replace(/[^0-9]/g, "");
});


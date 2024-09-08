import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function() {
  // Initial update to display current balance
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const button = event.target.querySelector("#submit-btn");

  // Parse the amounts from the input fields
  const inputAmount = parseFloat(document.getElementById("input-amount").value) || 0;
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value) || 0;

  button.setAttribute("disabled", true); // Disable the submit button

  // Call the appropriate functions if amounts are provided
  if (inputAmount > 0) {
    await dbank.topUp(inputAmount);
  }

  if (outputAmount > 0) {
    await dbank.withdraw(outputAmount);
  }

  await dbank.compound(); // Apply compound interest

  update(); // Update the displayed balance

  // Clear the input fields
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled"); // Re-enable the submit button
});

async function update() {
  try {
    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = (Math.round(currentAmount * 100) / 100).toFixed(2);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

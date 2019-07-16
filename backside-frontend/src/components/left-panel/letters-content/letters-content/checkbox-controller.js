export function uncheckTogleInput() {
  const toggleInputCheckbox = document.getElementById("toggle-input");
  if(toggleInputCheckbox.checked)
    toggleInputCheckbox.checked = false;
}
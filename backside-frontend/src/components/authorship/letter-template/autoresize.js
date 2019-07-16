export function autoresize(elementId) {
    
  let textarea = document.getElementById(elementId);
  
  textarea.style.height = "1px";
  textarea.style.height = (-8 + textarea.scrollHeight) + "px";
}
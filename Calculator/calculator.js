"use strict"

  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button');
    var input = document.getElementById('input');

    //I selected all buttons on the page, then looped through each button  
   
    buttons.forEach(function(button) {
      
      button.addEventListener('click', function(event) {
        if(button.textContent === 'AC') { // This clears the input field 
          input.value = '';
        } 
        else if(button.textContent === 'DE') { // The DE button deletes only one number infront
          input.value = input.value.slice(0, -1);
        } 
        else if (button.textContent === '√') { // Whenever you press the square root sign it takes what's i the input field and squre roots it 
          var inputValue = parseFloat(input.value);
            input.value = Math.sqrt(inputValue);
          }

          else if (button.textContent === '(') {  // Check if there is already a bracket before adding another one
             if (input.value.length === 0 || input.value.slice(-1) !== '(') {
              input.value += button.textContent;
            }}

            else if (button.textContent === ')') { // Check if there is already a bracket before adding another one
              if (input.value.length === 0 || input.value.slice(-1) !== ')') {
                input.value += button.textContent;
              }}

              else if (button.textContent === '.') { // Check if there is already a dot/comma before adding another one
                if (input.value.length === 0 || input.value.slice(-1) !== '.') {
                  input.value += button.textContent;
                }}

        else if(button.textContent === '=') { // When i press the equal sign it takes whats in the input and calculates it
            input.value = eval(input.value); 
        } 
        else {
          input.value += button.textContent;
        }

        event.preventDefault(); 
            
      });
    });
});

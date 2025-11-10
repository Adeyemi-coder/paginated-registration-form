const display = document.querySelector('.display');

const buttons = document.querySelectorAll('.second-div button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    let operator=['+','-','*','/'];
    let lastChar = display.textContent.slice(-1);
    if (operator.includes(button.textContent) && operator.includes(lastChar) ) { return;}
      
    if (button.textContent === 'C') {
      display.textContent ='';
      return;
    }
    if (button.textContent === 
      '←') {
        display.textContent = display.textContent.slice(0, -1);
        return;
      }
    if (button.textContent === '=') {
      try {
      display.textContent = eval(display.textContent);
      } catch {
        display.textContent = 'Error'
      };
      return;
    }

  console.log('clicked:' , button.textContent);
    display.textContent = display.textContent + button.textContent; }); });
    document.addEventListener('keydown', (event) => {
    let key = event.key;
      if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
        display.textContent += key;
      }
      if (key === 'Enter') {
        try {
          display.textContent = eval(display.textContent);
        }
        catch {
          display.textContent = 'Error'
        }
        if (key === 'Backspace') {
          display.textContent = display.textContent.slice(0, -1);
        }
        if (key === 'Escape') {
          display.textContent = '';
        }
      };
    });
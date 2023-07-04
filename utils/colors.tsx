export const getContrastColor = (color:string) => {
    // Convert color to hexadecimal format if it's in RGB format
    if (color.charAt(0) === '#') {
      color = color.slice(1);
    }
    if (color.length === 3) {
      color = color.replace(/(.)/g, '$1$1');
    }
  
    // Calculate relative luminance
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;
  
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    console.log(luminance)  
  
    // Determine contrast color based on luminance
    return luminance > 0.5 ? 'black' : 'white';
  }
 
  

  export const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

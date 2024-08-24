function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
  }
  
  function convertImage() {
    const fileInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');
  
    if (fileInput.files.length === 0) {
      alert('Please choose an image file.');
      return;
    }
  
    const file = fileInput.files[0];
    const format = formatSelect.value;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const convertedImage = canvas.toDataURL(`image/${format}`);
        downloadLink.href = convertedImage;
        downloadLink.download = `converted_image.${format}`;
        downloadLink.innerText = 'Download Converted Image';
        downloadLink.style.display = 'block';
      };
    };
    reader.readAsDataURL(file);
  }
  
  function convertImageByURL() {
    const imageUrl = document.getElementById('imageUrl').value;
    const formatSelect = document.getElementById('formatSelect');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');
  
    if (imageUrl.trim() === '') {
      alert('Please paste an image URL.');
      return;
    }
  
    const format = formatSelect.value;
  
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = function () {
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const convertedImage = canvas.toDataURL(`image/${format}`);
      downloadLink.href = convertedImage;
      downloadLink.download = `converted_image.${format}`;
      downloadLink.innerText = 'Download Converted Image';
      downloadLink.style.display = 'block';
    };
    img.onerror = function () {
      alert('Failed to load image from URL.');
    };
  }
  
  function convertPPTToPDF() {
    const pptInput = document.getElementById('pptInput');
    const pptDownloadLink = document.getElementById('pptDownloadLink');
  
    if (pptInput.files.length === 0) {
      alert('Please choose a PPT file.');
      return;
    }
  
    const file = pptInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function (e) {
      const ppt = e.target.result;
      // Assuming pptx2html can handle the conversion here
      pptx2pdf(ppt).then(function (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        pptDownloadLink.href = url;
        pptDownloadLink.download = 'converted_presentation.pdf';
        pptDownloadLink.innerText = 'Download Converted PDF';
        pptDownloadLink.style.display = 'block';
      }).catch(function (error) {
        alert('Conversion failed.');
      });
    };
    reader.readAsArrayBuffer(file);
  }
  
  // Mock function for pptx2pdf conversion
  function pptx2pdf(ppt) {
    return new Promise((resolve, reject) => {
      // Implement the actual conversion logic or use an external library
      // For now, resolve with a dummy PDF Blob
      const dummyPDFBlob = new Blob(['Dummy PDF content'], { type: 'application/pdf' });
      resolve(dummyPDFBlob);
    });
  }
  
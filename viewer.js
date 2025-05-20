document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const modelPath = 'models/walworth-nov-2024.splat'; // Changed extension to .splat
    const viewerElement = document.getElementById('viewer');
    
    // Initialize GSplat viewer
    const viewer = new GSplat.Viewer({
        canvas: viewerElement,
        background: [0.1, 0.1, 0.1, 1.0],
        cameraTarget: [0, 0, 0],
        cameraDistance: 2.0,
        useProgressiveRendering: true, // Enable progressive rendering for better performance
        splatSize: 1.0 // Can be adjusted based on your specific model
    });
    
    // Loading indicator (optional but recommended)
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    loadingElement.innerHTML = 'Loading 3D Model...';
    document.getElementById('container').appendChild(loadingElement);
    
    // Load the Gaussian Splat model
    viewer.loadFile(modelPath, {
        // You can specify a progress callback
        onProgress: (progress) => {
            const percent = Math.round(progress * 100);
            loadingElement.innerHTML = `Loading 3D Model... ${percent}%`;
        }
    }).then(() => {
        console.log('Model loaded successfully');
        loadingElement.style.display = 'none';
    }).catch(error => {
        console.error('Error loading model:', error);
        loadingElement.innerHTML = 'Error loading model. Please try again.';
    });
    
    // Rest of the script remains the same
    // ...
});

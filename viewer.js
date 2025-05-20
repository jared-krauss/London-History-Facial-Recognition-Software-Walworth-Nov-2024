document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const modelPath = 'models/walworth-nov-2024.ply'; // Path to your Gaussian Splat model
    const viewerElement = document.getElementById('viewer');
    
    // Initialize GSplat viewer
    const viewer = new GSplat.Viewer({
        canvas: viewerElement,
        background: [0.1, 0.1, 0.1, 1.0],
        cameraTarget: [0, 0, 0], // Adjust based on your model
        cameraDistance: 2.0      // Adjust based on your model
    });
    
    // Load the Gaussian Splat model
    viewer.loadFile(modelPath).then(() => {
        console.log('Model loaded successfully');
    }).catch(error => {
        console.error('Error loading model:', error);
    });
    
    // Handle controls
    document.getElementById('reset-camera').addEventListener('click', function() {
        viewer.resetCamera();
    });
    
    document.getElementById('fullscreen').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        viewer.resize(window.innerWidth, window.innerHeight);
    });
    
    // Start the render loop
    function animate() {
        requestAnimationFrame(animate);
        viewer.render();
    }
    animate();
});

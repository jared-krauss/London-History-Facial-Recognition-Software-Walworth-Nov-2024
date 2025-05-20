document.addEventListener('DOMContentLoaded', function() {
    // Create loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    loadingElement.innerHTML = 'Loading 3D Model... 0%';
    document.getElementById('container').appendChild(loadingElement);
    
    // Get the container element
    const viewerElement = document.getElementById('viewer');
    
    // Path to your .splat file
    const modelPath = 'models/walworth-nov-2024.splat';
    
    // Initialize the Antimatter Splat Viewer
    const viewer = new SplatViewer({
        // Container to render into
        canvas: viewerElement,
        
        // Camera settings
        camera: {
            // Initial position (adjust these coordinates based on your scene)
            position: [0, 0, 3],
            // Where the camera is looking (usually center of your scene)
            target: [0, 0, 0]
        },
        
        // Rendering quality settings
        renderOptions: {
            // Higher = better quality but slower performance
            pointSize: 1.0,
            // Progressive rendering for smoother interaction
            progressive: true
        },
        
        // Background color (RGBA format, values from 0-1)
        backgroundColor: [0.1, 0.1, 0.1, 1.0]
    });
    
    // Track loading progress
    let lastPercent = 0;
    
    // Load the .splat file
    viewer.loadFile(modelPath, {
        onProgress: (progress) => {
            const percent = Math.round(progress * 100);
            // Only update if percentage changed to avoid excessive DOM updates
            if (percent !== lastPercent) {
                loadingElement.innerHTML = `Loading 3D Model... ${percent}%`;
                lastPercent = percent;
            }
        }
    }).then(() => {
        console.log('Model loaded successfully');
        loadingElement.style.display = 'none';
    }).catch(error => {
        console.error('Error loading model:', error);
        loadingElement.innerHTML = 'Error loading model. Please try again.';
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
        viewer.resize();
    });
});

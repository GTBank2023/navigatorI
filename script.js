// Function to launch the system
function launchSystem() {
    // Add actions you want to perform when the system is launched
    setupCamera(); // For setting up the camera
    loadModel();   // For loading the COCO SSD model
    // Add more actions if needed
}

// Event listener to start the system when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const getStartedButton = document.querySelector('.get-started-button');

    getStartedButton.addEventListener('click', () => {
        console.log('Button clicked. System launching...');
        launchSystem(); // Call the launchSystem function when the button is clicked
    });
});

// Function to detect objects using COCO-SSD
async function detectObjects(tensor) {
    if (!cocoSsdModel) {
        console.error('Model not loaded yet.');
        return [];
    }

    const predictions = await cocoSsdModel.detect(tensor);
    return predictions;
}

async function detectObjects(canvas, ctx) {
    if (!cocoSsdModel) {
        console.error('Model not loaded yet.');
        return;
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tensor = tf.browser.fromPixels(imgData).expandDims();

    const predictions = await detectObjects(tensor); // Call the new detectObjects function
    console.log('Predictions:', predictions);

    // Call your area detection function here
    detectAreas(predictions);

    requestAnimationFrame(() => detectObjects(canvas, ctx));
}

// Function to process predictions from COCO-SSD
async function processPredictions(predictions) {
    const predictionsArray = predictions.map(prediction => prediction.score);

    // Call your area detection function here
    detectAreas(predictions);

    // Handle the detected areas
    handleDetectedAreas(predictionsArray);

    // Continue video frame processing or rendering as needed...
}

// Function to detect objects using COCO-SSD
async function detectObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(videoElement, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tensor = tf.browser.fromPixels(imgData).expandDims();

    const predictions = await cocoSsdModel.detect(tensor);

    // Call your area detection function here
    const detectedAreas = detectAreas(predictions);

    // Process the predictions
    processPredictions(predictions);

    if (detectedAreas.length > 0) {
        const detectedArea = detectedAreas[0]; // Assuming you want to use the first detected area

        const areaInfoDiv = document.getElementById("area-info");

        areaInfoDiv.querySelector("h1").textContent = detectedArea.area;

        areaInfoDiv.querySelector("p").textContent = detectedArea.description;

        // Call the text-to-speech function here if needed
    }
}

// Function to load images
function loadImages(imageUrls) {
    for (const url of imageUrls) {
        const img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img); // You can append it to a different HTML element if needed
    }
}

// Define image URLs for each area
const StaircaseImages = [
    'https://drive.google.com/uc?id=1Du6Gs_XaEBdvP7rli4b7CVoY2LMEby-t',
    'https://drive.google.com/uc?id=1ZZDhKY5p23KFPj8JWxOjjfap6qDZy66I',
    'https://drive.google.com/uc?id=1WW34VQT-Ut9D1p167svHueh9cizFtLPU',
];

const RelationshipDeskImages = [
    'https://drive.google.com/uc?id=1b6Vqo8EoYP-9LI9jOpTzOXo7CeQ5AWGp',
    'https://drive.google.com/uc?id=1gonsFAcyV4ZkzRIlr0fkJNgIlM8PR6eT',
    'https://drive.google.com/uc?id=18MrypKyw0tfQEn8eqFykKURC-zuBJoix',
    'https://drive.google.com/uc?id=15JvCkO0Epys2_U7x0qKDyUIoGCg7E2qM',
    'https://drive.google.com/uc?id=1KYaDu89UydsuSFYw4gax_ggsKexSVG4M',
    'https://drive.google.com/uc?id=18VT4fMLoBl2pQDc3uzBsOnNWoOTyzHi0',
    'https://drive.google.com/uc?id=1trhvDqt-4JmxRqFCaTGso_gYjIZp4FZZ',
    'https://drive.google.com/uc?id=10573EvXYRv5GLKXBVdp0dZI_7DbMPE5R',
    'https://drive.google.com/uc?id=1UU1U-tDGkQFTVjB7Pj-NwhUIj95BJAWd',
    'https://drive.google.com/uc?id=1rbidElv-IxYOA923pPHBd5vHW7ng_F6q',
    'https://drive.google.com/uc?id=154pmVI-65ORTpB0Xf9qAYYMt2duqVtd7',
    'https://drive.google.com/uc?id=1ySBFjBUjx6MN5N9Q_DR3sACryLtJyJpc',
    'https://drive.google.com/uc?id=1X2g7UmBReLRS7TuY_HpBcp7FL0DCmNfh',
    'https://drive.google.com/uc?id=14AaweTWzvbx8-QeQqBjzowfGBRFruGis',
    'https://drive.google.com/uc?id=1BlZj5a3H1XasgATLKHunHLUIzC9zfdwP',
    'https://drive.google.com/uc?id=1JPmd9wquHo5qt4_iY1H1nEmo3o2NCEkQ',
    
];

const loadOperationsAreaImages = [
    'https://drive.google.com/uc?id=1Kw-RTbqRFJlvjwpi8DwBWjIwImbW3P1E',
    'https://drive.google.com/uc?id=1zUhR1xbN29J5ni9W9oVDng52fBAE6akc',
    'https://drive.google.com/uc?id=1GyR98xAhZksa6alQ3GT-HAMCQVxUAwJd',
    'https://drive.google.com/uc?id=1O8H70Hkr3FsKJ12Cfoas1ZnWij-s0qDm',
    'https://drive.google.com/uc?id=1XcnPf94DTCaZfwdDMgpZf6MM9FNY8day',
    'https://drive.google.com/uc?id=1XcnPf94DTCaZfwdDMgpZf6MM9FNY8day',
    'https://drive.google.com/uc?id=1D1BklcrkBBSeeoioCclCbnw_wh_Cdlqg',
    'https://drive.google.com/uc?id=1ICKnK5WLnZI2Lo5Jxcp5RAAm6HshwWC_',
    'https://drive.google.com/uc?id=15Vpfks3fWBKKI4HwC1AMR1QxO1n3U8N3',
    'https://drive.google.com/uc?id=1LZlXSPmYo3cfOdV-s3pCTNSXLLL2pZag',
    'https://drive.google.com/uc?id=11n_KpMsHjOFihSBldCtH_CjVNaSPIkl0',
    'https://drive.google.com/uc?id=1FYoZUY47dozZtlik8rBVFNwPZ5TRbIbw',
    'https://drive.google.com/uc?id=1hPPxMP74RWfg_H71U6Nw8X5TWeli-mUD',
    'https://drive.google.com/uc?id=1NgUyMRo72t10B7rLkLtscDG0rfxWnJ-C',
    
];


  const LobbyAreaImagesURLs = [
    'https://drive.google.com/uc?id=1-FGQUzoNmUy3aNiUBVZDB2rQlETG2Mbe',
    'https://drive.google.com/uc?id=1icGYQJ8d4AAdjV2KrGL9NGN28vNZtKuR',
    'https://drive.google.com/uc?id=1DyPopWgjXxUYDuhYB03ze2KkOeAc6xQu',
    'https://drive.google.com/uc?id=19yxd_IUG7v1a2jNj3_5yD3A9de23J0kv',
    'https://drive.google.com/uc?id=1L1sRQz_fQbuCnGQKe0HXOk_6ah68Zsbl',
    'https://drive.google.com/uc?id=1FL2td2bt_X3CoTBLBFN9COVSJn-WUQp2',
    'https://drive.google.com/uc?id=1nlcDKnJjbKFVFxTLEEdnj_y5BFo__vN8',
    'https://drive.google.com/uc?id=1siPhzdMpwvMAm4fFWVOVUi6g3rpu8SHX',
    'https://drive.google.com/uc?id=1Mr_UO4ZrmI-UiuMFhIY1lg5SK-B38ClO',
    'https://drive.google.com/uc?id=1JTnKcprY23TwFdL-C5_7PDIUPqLqUCmg',

];


  const HNIareaImagesURLs = [
    'https://drive.google.com/uc?id=1t7zXWKeufIUa7QxqkTLgyNUoko29L0TV',
    'https://drive.google.com/uc?id=1_U0QODFIlpYabmxuztfHvNq9M8BYxOtb',
    'https://drive.google.com/uc?id=14a3tpeW3UNZRCKB3-nt3Mcg5LVot-aU9',
    'https://drive.google.com/uc?id=1Xvi4ta8SGeKCyDVg-Xr-NE7PGLLdXk9c',
    'https://drive.google.com/uc?id=1K7ej9k28trotwZfsTwMdpUIFHUUJJEAz',
    'https://drive.google.com/uc?id=1xE5US1EuaA0QkreIOyYs9oyU8VbtwiTE',
    'https://drive.google.com/uc?id=1ONqmE-t070wfGZfJsyjF58aEBxbQ_xuO',
    'https://drive.google.com/uc?id=17ef9bRhVSXQZaYIwi4ugxwb-EnhoCIL_',
    'https://drive.google.com/uc?id=1r4w0MM-4cnYW06HUgbcmJKVXiGO9xfPP',
    'https://drive.google.com/uc?id=1-lnKCxNrbFnB0tRoCfgdvE4L0twZuoVf',
];

  const EntranceAreaImagesURLs = [
    'https://drive.google.com/uc?id=1XaWExfQXAj9SuClCXlWre7wgExVmsqNT',
    'https://drive.google.com/uc?id=10kbp2rCQS9fpCtLRtD6-vCHCrIQeRCaJ',
    'https://drive.google.com/uc?id=1ssisPQvN3AOY6Ff7xIa2d9rlUrBXsoii',
    'https://drive.google.com/uc?id=1oJZkkNUCbtTDzpRxdqqhxt5vGQDuMt5c',
    'https://drive.google.com/uc?id=1pSz-c9TsJjY-YA0oHTKKdn8rgF1Cm5Qj',
];

  const CustomerInformationServiceImagesURLs = [
    'https://drive.google.com/uc?id=1bgiaCRDbiP3ZogDFLqpbw78iS8pXb9rI',
    'https://drive.google.com/uc?id=1vn5Lep2toJO5nOe8Uii66_cA5cEzUGK7',
    'https://drive.google.com/uc?id=1oaIdtbvrRdT4JDHVNPJKAaGEfaRfPWde',
    'https://drive.google.com/uc?id=1RM2e_1MH5oUEq6KuwOvIXwlApDHjChh4',
    'https://drive.google.com/uc?id=10Su9jqmMVF7W2F0JyOjbz5izdwZufNTB',
    'https://drive.google.com/uc?id=1fITPa_YpWJJ3paetk5fcDEz7nmdIXS6c',
    'https://drive.google.com/uc?id=1GcOXu6608mUs1USrfGt6Q6CwWy6jFNNL',
    'https://drive.google.com/uc?id=1h6d7zRNGDdoc4-0_6lPNoQ4LSthgs_E7',
    'https://drive.google.com/uc?id=1atJvi7I6-jIU6uHiZioAVaY0c1UFTL7-',
    'https://drive.google.com/uc?id=1e6nn1j6PV6tQSYrELDUgLNEExQwR9Yx4',
    'https://drive.google.com/uc?id=11ZMVSRBD4RFbMbmET7QTsw8C136pyu0L',
    'https://drive.google.com/uc?id=1TNwaewif8r9ImCbiI-R7tRXW0UiTI9Qr',
    'https://drive.google.com/uc?id=1Et2QFelNahctNme9oI363rYlYEXtpB9S',
    'https://drive.google.com/uc?id=1KOWnc9kEr0LjOycPLVcbJAQryoiI5bW7',
    'https://drive.google.com/uc?id=1Acx3vnTlB1MALcDIfQ937UNYaTZApfqM',
    'https://drive.google.com/uc?id=1RwlE8rrpoJMlPVcwQ1_dPkaRM8Dx_AyO',
    'https://drive.google.com/uc?id=1lmc8-fshfwkMtDfIZDZevqsLSyBfZzG6',
];
// Call the function to load images for each area
loadImages(StaircaseImages);
loadImages(RelationshipDeskImages);
loadImages(OperationsAreaImages);
loadImages(LobbyAreaImages);
loadImages(HNIareaImages);
loadImages(EntranceAreaImages);
loadImages(CustomerInformationServiceImages);

// Call the async function to load the model
loadModel();

// Call launchSystem after loading the model
launchSystem();

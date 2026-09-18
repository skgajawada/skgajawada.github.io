// ============================================================
// RESUME PAGE
// PPT-STYLE A4 PDF VIEWER
// One complete portrait page displayed at a time
// ============================================================

class ResumePage extends Component {

    constructor() {

        super();

        this.pdf = null;

        this.currentPage = 1;

        this.rendering = false;

        this.pendingPage = null;

        this.resizeTimer = null;

        this.keyboardHandler = null;

        this.resizeHandler = null;

        this.fullscreenHandler = null;

    }


    // =========================================================
    // PAGE HTML
    // =========================================================

    async render() {

        return `

            <div class="resume-viewer-page">

                <div class="resume-presentation">

                    <!-- ======================================
                         TOP BAR
                    ======================================= -->

                    <div class="resume-topbar">

                        <div class="resume-topbar-left">

                            Curriculum Vitae

                        </div>


                        <div class="resume-topbar-center">

                            Gajavada Sanjeevkumar

                        </div>


                        <div class="resume-topbar-right">

                            <span id="resume-total-pages">
                                --
                            </span>

                        </div>

                    </div>


                    <!-- ======================================
                         PDF PAGE DISPLAY AREA
                    ======================================= -->

                    <div
                        id="resume-stage"
                        class="resume-stage"
                    >

                        <!-- Loading -->

                        <div
                            id="resume-loading"
                            class="resume-loading"
                        >

                            <i class="fas fa-spinner fa-spin"></i>

                            <span>
                                Loading Curriculum Vitae...
                            </span>

                        </div>


                        <!-- PDF Canvas -->

                        <canvas
                            id="resume-canvas"
                            class="resume-canvas"
                        ></canvas>

                    </div>


                    <!-- ======================================
                         BOTTOM PPT-STYLE CONTROL BAR
                    ======================================= -->

                    <div class="resume-controls">


                        <!-- First Page -->

                        <button
                            id="resume-first"
                            class="resume-control-btn"
                            title="First Page"
                            aria-label="First Page"
                        >

                            <i class="fas fa-angle-double-left"></i>

                        </button>


                        <!-- Previous Page -->

                        <button
                            id="resume-prev"
                            class="resume-control-btn"
                            title="Previous Page"
                            aria-label="Previous Page"
                        >

                            <i class="fas fa-angle-left"></i>

                        </button>


                        <!-- Page Number -->

                        <div
                            id="resume-page-number"
                            class="resume-page-number"
                        >

                            1 / --

                        </div>


                        <!-- Next Page -->

                        <button
                            id="resume-next"
                            class="resume-control-btn"
                            title="Next Page"
                            aria-label="Next Page"
                        >

                            <i class="fas fa-angle-right"></i>

                        </button>


                        <!-- Last Page -->

                        <button
                            id="resume-last"
                            class="resume-control-btn"
                            title="Last Page"
                            aria-label="Last Page"
                        >

                            <i class="fas fa-angle-double-right"></i>

                        </button>


                        <!-- Fullscreen -->

                        <button
                            id="resume-fullscreen"
                            class="resume-control-btn"
                            title="Fullscreen"
                            aria-label="Fullscreen"
                        >

                            <i class="fas fa-expand"></i>

                        </button>


                    </div>

                </div>

            </div>

        `;

    }


    // =========================================================
    // AFTER RENDER
    // =========================================================

    async afterRender() {

        try {

            await this.loadPDFJS();

            this.cacheElements();

            await this.loadDocument();

            this.setupControls();

            this.setupKeyboard();

            this.setupWheel();

            this.setupFullscreen();

            this.setupResize();

            this.disableContextMenu();

        }

        catch (error) {

            console.error(
                "Resume initialization error:",
                error
            );

            if (this.loading) {

                this.loading.innerHTML = `

                    <i class="fas fa-exclamation-circle"></i>

                    <span>
                        Unable to initialize Curriculum Vitae viewer.
                    </span>

                `;

            }

        }

    }


    // =========================================================
    // CACHE DOM ELEMENTS
    // =========================================================

    cacheElements() {

        this.stage =
            document.getElementById(
                "resume-stage"
            );


        this.canvas =
            document.getElementById(
                "resume-canvas"
            );


        this.loading =
            document.getElementById(
                "resume-loading"
            );


        if (!this.stage || !this.canvas) {

            throw new Error(
                "Resume viewer elements not found."
            );

        }


        this.context =
            this.canvas.getContext(
                "2d",
                {
                    alpha: false
                }
            );

    }


    // =========================================================
    // LOAD PDF.JS
    // =========================================================

    async loadPDFJS() {

        // Already loaded

        if (window.pdfjsLib) {

            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

            return;

        }


        await new Promise(
            (resolve, reject) => {

                const existingScript =
                    document.querySelector(
                        'script[data-resume-pdfjs="true"]'
                    );


                // If another ResumePage instance is
                // already loading PDF.js

                if (existingScript) {

                    existingScript.addEventListener(
                        "load",
                        resolve,
                        {
                            once: true
                        }
                    );

                    existingScript.addEventListener(
                        "error",
                        reject,
                        {
                            once: true
                        }
                    );

                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";


                script.dataset.resumePdfjs =
                    "true";


                script.onload =
                    resolve;


                script.onerror =
                    reject;


                document.head.appendChild(
                    script
                );

            }
        );


        if (!window.pdfjsLib) {

            throw new Error(
                "PDF.js could not be loaded."
            );

        }


        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    }


    // =========================================================
    // LOAD RESUME PDF
    // =========================================================

    async loadDocument() {

        const pdfPath =
            "assets/documents/SANJEEVKUMAR_RESUME.pdf";


        try {

            this.pdf =
                await pdfjsLib.getDocument({
                    url: pdfPath
                }).promise;


            // --------------------------------------------------
            // Total Pages
            // --------------------------------------------------

            const totalPages =
                document.getElementById(
                    "resume-total-pages"
                );


            if (totalPages) {

                totalPages.textContent =
                    `${this.pdf.numPages} Pages`;

            }


            // --------------------------------------------------
            // Hide Loading
            // --------------------------------------------------

            if (this.loading) {

                this.loading.style.display =
                    "none";

            }


            // --------------------------------------------------
            // Show First Page
            // --------------------------------------------------

            await this.showPage(
                this.currentPage
            );

        }

        catch (error) {

            console.error(
                "PDF loading error:",
                error
            );


            if (this.loading) {

                this.loading.innerHTML = `

                    <i class="fas fa-exclamation-circle"></i>

                    <span>
                        Unable to load Curriculum Vitae.
                    </span>

                `;

            }

        }

    }


    // =========================================================
    // SHOW ONE COMPLETE PDF PAGE
    // =========================================================

    async showPage(pageNumber) {

        if (!this.pdf) {

            return;

        }


        // ------------------------------------------------------
        // Keep page number inside valid range
        // ------------------------------------------------------

        pageNumber =
            Math.max(
                1,
                Math.min(
                    pageNumber,
                    this.pdf.numPages
                )
            );


        // ------------------------------------------------------
        // If a page is currently rendering,
        // remember the newest requested page.
        // ------------------------------------------------------

        if (this.rendering) {

            this.pendingPage =
                pageNumber;

            return;

        }


        this.rendering = true;

        this.currentPage =
            pageNumber;


        try {

            // --------------------------------------------------
            // Get requested PDF page
            // --------------------------------------------------

            const page =
                await this.pdf.getPage(
                    pageNumber
                );


            // --------------------------------------------------
            // ORIGINAL PDF PAGE SIZE
            //
            // For an A4 portrait PDF this will normally
            // correspond to approximately:
            //
            // 595 × 842 points
            //
            // We DO NOT force the canvas to a different ratio.
            // This preserves the original A4 page.
            // --------------------------------------------------

            const baseViewport =
                page.getViewport({
                    scale: 1
                });


            // --------------------------------------------------
            // Viewer dimensions
            // --------------------------------------------------

            const stageWidth =
                this.stage.clientWidth;


            const stageHeight =
                this.stage.clientHeight;


            // --------------------------------------------------
            // Safe space around the complete A4 sheet
            // --------------------------------------------------

            const isMobile =
                window.innerWidth <= 700;


            const horizontalPadding =
                isMobile
                    ? 20
                    : 50;


            const verticalPadding =
                isMobile
                    ? 20
                    : 30;


            const availableWidth =
                Math.max(
                    50,
                    stageWidth -
                    horizontalPadding
                );


            const availableHeight =
                Math.max(
                    50,
                    stageHeight -
                    verticalPadding
                );


            // --------------------------------------------------
            // FIT THE COMPLETE PAGE
            //
            // The smaller scale is selected so that:
            //
            // width  <= available width
            // height <= available height
            //
            // Therefore the COMPLETE A4 sheet is always visible.
            // --------------------------------------------------

            const widthScale =
                availableWidth /
                baseViewport.width;


            const heightScale =
                availableHeight /
                baseViewport.height;


            let scale =
                Math.min(
                    widthScale,
                    heightScale
                );


            // --------------------------------------------------
            // Safety limit
            // --------------------------------------------------

            if (!Number.isFinite(scale) || scale <= 0) {

                scale = 0.5;

            }


            // --------------------------------------------------
            // Prevent extremely tiny rendering
            // --------------------------------------------------

            scale =
                Math.max(
                    scale,
                    0.1
                );


            // --------------------------------------------------
            // Create viewport
            // --------------------------------------------------

            const viewport =
                page.getViewport({
                    scale: scale
                });


            // --------------------------------------------------
            // High DPI
            //
            // Gives sharper PDF text while keeping the
            // visible page size unchanged.
            // --------------------------------------------------

            const devicePixelRatio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            // --------------------------------------------------
            // Canvas INTERNAL resolution
            // --------------------------------------------------

            this.canvas.width =
                Math.floor(
                    viewport.width *
                    devicePixelRatio
                );


            this.canvas.height =
                Math.floor(
                    viewport.height *
                    devicePixelRatio
                );


            // --------------------------------------------------
            // Canvas DISPLAY resolution
            //
            // IMPORTANT:
            // This preserves the PDF's original aspect ratio.
            // --------------------------------------------------

            this.canvas.style.width =
                `${Math.floor(viewport.width)}px`;


            this.canvas.style.height =
                `${Math.floor(viewport.height)}px`;


            // --------------------------------------------------
            // Clear previous page
            // --------------------------------------------------

            this.context.setTransform(
                1,
                0,
                0,
                1,
                0,
                0
            );


            this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );


            // --------------------------------------------------
            // Render complete PDF page
            // --------------------------------------------------

            const renderContext = {

                canvasContext:
                    this.context,

                viewport:
                    viewport

            };


            if (devicePixelRatio !== 1) {

                renderContext.transform = [

                    devicePixelRatio,
                    0,
                    0,
                    devicePixelRatio,
                    0,
                    0

                ];

            }


            await page.render(
                renderContext
            ).promise;


            // --------------------------------------------------
            // Update bottom page counter
            // --------------------------------------------------

            const pageNumberElement =
                document.getElementById(
                    "resume-page-number"
                );


            if (pageNumberElement) {

                pageNumberElement.textContent =
                    `${pageNumber} / ${this.pdf.numPages}`;

            }


            // --------------------------------------------------
            // Update buttons
            // --------------------------------------------------

            this.updateButtons();

        }

        catch (error) {

            console.error(
                "Page rendering error:",
                error
            );

        }


        // ------------------------------------------------------
        // Rendering finished
        // ------------------------------------------------------

        this.rendering = false;


        // ------------------------------------------------------
        // If user clicked several times while rendering,
        // display the latest requested page.
        // ------------------------------------------------------

        if (
            this.pendingPage !== null
        ) {

            const nextPage =
                this.pendingPage;


            this.pendingPage =
                null;


            await this.showPage(
                nextPage
            );

        }

    }


    // =========================================================
    // BUTTON CONTROLS
    // =========================================================

    setupControls() {

        const first =
            document.getElementById(
                "resume-first"
            );


        const prev =
            document.getElementById(
                "resume-prev"
            );


        const next =
            document.getElementById(
                "resume-next"
            );


        const last =
            document.getElementById(
                "resume-last"
            );


        if (first) {

            first.addEventListener(
                "click",
                () => {

                    this.showPage(1);

                }
            );

        }


        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    this.showPage(
                        this.currentPage - 1
                    );

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    this.showPage(
                        this.currentPage + 1
                    );

                }
            );

        }


        if (last) {

            last.addEventListener(
                "click",
                () => {

                    if (this.pdf) {

                        this.showPage(
                            this.pdf.numPages
                        );

                    }

                }
            );

        }


        this.updateButtons();

    }


    // =========================================================
    // BUTTON STATES
    // =========================================================

    updateButtons() {

        if (!this.pdf) {

            return;

        }


        const first =
            document.getElementById(
                "resume-first"
            );


        const prev =
            document.getElementById(
                "resume-prev"
            );


        const next =
            document.getElementById(
                "resume-next"
            );


        const last =
            document.getElementById(
                "resume-last"
            );


        const atFirst =
            this.currentPage === 1;


        const atLast =
            this.currentPage ===
            this.pdf.numPages;


        if (first) {

            first.disabled =
                atFirst;

        }


        if (prev) {

            prev.disabled =
                atFirst;

        }


        if (next) {

            next.disabled =
                atLast;

        }


        if (last) {

            last.disabled =
                atLast;

        }

    }


    // =========================================================
    // KEYBOARD NAVIGATION
    // =========================================================

    setupKeyboard() {

        this.keyboardHandler =
            (event) => {

                // Only operate when Resume viewer exists

                if (
                    !document.querySelector(
                        ".resume-presentation"
                    )
                ) {

                    return;

                }


                switch (event.key) {


                    // ------------------------------------------
                    // PREVIOUS
                    // ------------------------------------------

                    case "ArrowLeft":

                    case "ArrowUp":

                    case "PageUp":

                        event.preventDefault();

                        this.showPage(
                            this.currentPage - 1
                        );

                        break;


                    // ------------------------------------------
                    // NEXT
                    // ------------------------------------------

                    case "ArrowRight":

                    case "ArrowDown":

                    case "PageDown":

                        event.preventDefault();

                        this.showPage(
                            this.currentPage + 1
                        );

                        break;


                    // ------------------------------------------
                    // FIRST
                    // ------------------------------------------

                    case "Home":

                        event.preventDefault();

                        this.showPage(1);

                        break;


                    // ------------------------------------------
                    // LAST
                    // ------------------------------------------

                    case "End":

                        event.preventDefault();

                        if (this.pdf) {

                            this.showPage(
                                this.pdf.numPages
                            );

                        }

                        break;

                }

            };


        document.addEventListener(
            "keydown",
            this.keyboardHandler
        );

    }


    // =========================================================
    // MOUSE WHEEL PAGE NAVIGATION
    // =========================================================

    setupWheel() {

        if (!this.stage) {

            return;

        }


        this.stage.addEventListener(
            "wheel",
            (event) => {

                event.preventDefault();


                // Down = next page

                if (
                    event.deltaY > 0
                ) {

                    this.showPage(
                        this.currentPage + 1
                    );

                }


                // Up = previous page

                else if (
                    event.deltaY < 0
                ) {

                    this.showPage(
                        this.currentPage - 1
                    );

                }

            },
            {
                passive: false
            }
        );

    }


    // =========================================================
    // FULLSCREEN
    // =========================================================

    setupFullscreen() {

        const button =
            document.getElementById(
                "resume-fullscreen"
            );


        const viewer =
            document.querySelector(
                ".resume-presentation"
            );


        if (!button || !viewer) {

            return;

        }


        // ------------------------------------------------------
        // Fullscreen button
        // ------------------------------------------------------

        button.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await viewer.requestFullscreen();

                    }

                    else {

                        await document.exitFullscreen();

                    }

                }

                catch (error) {

                    console.error(
                        "Fullscreen error:",
                        error
                    );

                }

            }
        );


        // ------------------------------------------------------
        // Fullscreen state
        // ------------------------------------------------------

        this.fullscreenHandler =
            () => {

                const icon =
                    button.querySelector(
                        "i"
                    );


                if (!icon) {

                    return;

                }


                if (
                    document.fullscreenElement
                ) {

                    icon.className =
                        "fas fa-compress";

                }

                else {

                    icon.className =
                        "fas fa-expand";

                }


                // Recalculate A4 page size

                setTimeout(
                    () => {

                        if (this.pdf) {

                            this.showPage(
                                this.currentPage
                            );

                        }

                    },
                    200
                );

            };


        document.addEventListener(
            "fullscreenchange",
            this.fullscreenHandler
        );

    }


    // =========================================================
    // RESIZE
    // =========================================================

    setupResize() {

        this.resizeHandler =
            () => {

                clearTimeout(
                    this.resizeTimer
                );


                this.resizeTimer =
                    setTimeout(
                        () => {

                            if (
                                this.pdf &&
                                this.stage
                            ) {

                                this.showPage(
                                    this.currentPage
                                );

                            }

                        },
                        150
                    );

            };


        window.addEventListener(
            "resize",
            this.resizeHandler
        );

    }


    // =========================================================
    // DISABLE CONTEXT MENU / DRAGGING
    // =========================================================

    disableContextMenu() {

        if (!this.stage) {

            return;

        }


        // Right click

        this.stage.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

            }
        );


        // Dragging canvas

        if (this.canvas) {

            this.canvas.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        }

    }

}

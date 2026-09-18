// ============================================================
// RESUME PAGE
// PPT-STYLE A4 PDF VIEWER
// ONE COMPLETE A4 PORTRAIT PAGE AT A TIME
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


                <!-- =================================================
                     TOP BAR
                ================================================== -->

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


                <!-- =================================================
                     PDF STAGE
                ================================================== -->

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


                    <!-- PDF -->

                    <canvas
                        id="resume-canvas"
                        class="resume-canvas"
                    ></canvas>

                </div>


                <!-- =================================================
                     CONTROL BAR
                ================================================== -->

                <div class="resume-controls">


                    <!-- FIRST -->

                    <button
                        id="resume-first"
                        class="resume-control-btn"
                        title="First Page"
                        aria-label="First Page"
                    >

                        <i class="fas fa-angle-double-left"></i>

                    </button>


                    <!-- PREVIOUS -->

                    <button
                        id="resume-prev"
                        class="resume-control-btn"
                        title="Previous Page"
                        aria-label="Previous Page"
                    >

                        <i class="fas fa-angle-left"></i>

                    </button>


                    <!-- PAGE NUMBER -->

                    <div
                        id="resume-page-number"
                        class="resume-page-number"
                    >
                        1 / --
                    </div>


                    <!-- NEXT -->

                    <button
                        id="resume-next"
                        class="resume-control-btn"
                        title="Next Page"
                        aria-label="Next Page"
                    >

                        <i class="fas fa-angle-right"></i>

                    </button>


                    <!-- LAST -->

                    <button
                        id="resume-last"
                        class="resume-control-btn"
                        title="Last Page"
                        aria-label="Last Page"
                    >

                        <i class="fas fa-angle-double-right"></i>

                    </button>


                    <!-- FULLSCREEN -->

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

        }

    }


    // =========================================================
    // CACHE ELEMENTS
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

        if (window.pdfjsLib) {

            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

            return;

        }


        await new Promise(
            (resolve, reject) => {

                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";


                script.onload =
                    resolve;


                script.onerror =
                    reject;


                document.head.appendChild(
                    script
                );

            }
        );


        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    }


    // =========================================================
    // LOAD PDF
    // =========================================================

    async loadDocument() {

        const pdfPath =
            "assets/documents/SANJEEVKUMAR_RESUME.pdf";


        try {

            this.pdf =
                await pdfjsLib.getDocument({
                    url: pdfPath
                }).promise;


            // Total pages

            const total =
                document.getElementById(
                    "resume-total-pages"
                );


            if (total) {

                total.textContent =
                    `${this.pdf.numPages} Pages`;

            }


            // Hide loading

            if (this.loading) {

                this.loading.style.display =
                    "none";

            }


            // First page

            await this.showPage(1);

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
    // SHOW COMPLETE PAGE
    // =========================================================

    async showPage(pageNumber) {

        if (!this.pdf) {

            return;

        }


        // Keep page in range

        pageNumber =
            Math.max(
                1,
                Math.min(
                    pageNumber,
                    this.pdf.numPages
                )
            );


        // If rendering is active,
        // render only the latest requested page

        if (this.rendering) {

            this.pendingPage =
                pageNumber;

            return;

        }


        this.rendering = true;

        this.currentPage =
            pageNumber;


        try {

            const page =
                await this.pdf.getPage(
                    pageNumber
                );


            // =================================================
            // ORIGINAL PDF SIZE
            // =================================================

            const baseViewport =
                page.getViewport({
                    scale: 1
                });


            // =================================================
            // AVAILABLE STAGE SIZE
            // =================================================

            const stageWidth =
                this.stage.clientWidth;


            const stageHeight =
                this.stage.clientHeight;


            // Small safe margin

            const margin =
                window.innerWidth <= 700
                    ? 8
                    : 16;


            const availableWidth =
                Math.max(
                    1,
                    stageWidth -
                    margin * 2
                );


            const availableHeight =
                Math.max(
                    1,
                    stageHeight -
                    margin * 2
                );


            // =================================================
            // FIT COMPLETE PAGE
            // =================================================

            const widthScale =
                availableWidth /
                baseViewport.width;


            const heightScale =
                availableHeight /
                baseViewport.height;


            // IMPORTANT:
            // The smaller value guarantees that the
            // COMPLETE PDF page is visible.

            const scale =
                Math.min(
                    widthScale,
                    heightScale
                );


            // =================================================
            // DISPLAY VIEWPORT
            // =================================================

            const viewport =
                page.getViewport({
                    scale: scale
                });


            // =================================================
            // HIGH DPI
            // =================================================

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            // Internal canvas resolution

            this.canvas.width =
                Math.round(
                    viewport.width * dpr
                );


            this.canvas.height =
                Math.round(
                    viewport.height * dpr
                );


            // Visible CSS size

            this.canvas.style.width =
                `${viewport.width}px`;


            this.canvas.style.height =
                `${viewport.height}px`;


            // =================================================
            // RESET CONTEXT
            // =================================================

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


            // =================================================
            // PDF RENDER
            // =================================================

            const renderContext = {

                canvasContext:
                    this.context,

                viewport:
                    viewport

            };


            if (dpr !== 1) {

                renderContext.transform = [

                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0

                ];

            }


            await page.render(
                renderContext
            ).promise;


            // =================================================
            // PAGE NUMBER
            // =================================================

            const pageNumberElement =
                document.getElementById(
                    "resume-page-number"
                );


            if (pageNumberElement) {

                pageNumberElement.textContent =
                    `${pageNumber} / ${this.pdf.numPages}`;

            }


            // =================================================
            // BUTTON STATE
            // =================================================

            this.updateButtons();

        }

        catch (error) {

            console.error(
                "Page rendering error:",
                error
            );

        }


        this.rendering = false;


        // Render latest requested page

        if (
            this.pendingPage !== null
        ) {

            const next =
                this.pendingPage;


            this.pendingPage =
                null;


            await this.showPage(
                next
            );

        }

    }


    // =========================================================
    // CONTROLS
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

            first.onclick =
                () => {

                    this.showPage(1);

                };

        }


        if (prev) {

            prev.onclick =
                () => {

                    this.showPage(
                        this.currentPage - 1
                    );

                };

        }


        if (next) {

            next.onclick =
                () => {

                    this.showPage(
                        this.currentPage + 1
                    );

                };

        }


        if (last) {

            last.onclick =
                () => {

                    if (this.pdf) {

                        this.showPage(
                            this.pdf.numPages
                        );

                    }

                };

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
    // KEYBOARD
    // =========================================================

    setupKeyboard() {

        this.keyboardHandler =
            event => {

                if (
                    !document.querySelector(
                        ".resume-presentation"
                    )
                ) {

                    return;

                }


                switch (event.key) {

                    case "ArrowLeft":

                    case "ArrowUp":

                    case "PageUp":

                        event.preventDefault();

                        this.showPage(
                            this.currentPage - 1
                        );

                        break;


                    case "ArrowRight":

                    case "ArrowDown":

                    case "PageDown":

                        event.preventDefault();

                        this.showPage(
                            this.currentPage + 1
                        );

                        break;


                    case "Home":

                        event.preventDefault();

                        this.showPage(1);

                        break;


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
    // MOUSE WHEEL
    // =========================================================

    setupWheel() {

        if (!this.stage) {

            return;

        }


        this.stage.addEventListener(
            "wheel",
            event => {

                event.preventDefault();


                if (
                    event.deltaY > 0
                ) {

                    this.showPage(
                        this.currentPage + 1
                    );

                }


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


        button.onclick =
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

            };


        this.fullscreenHandler =
            () => {

                const icon =
                    button.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        document.fullscreenElement
                            ? "fas fa-compress"
                            : "fas fa-expand";

                }


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
                                this.pdf
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
    // DISABLE CONTEXT MENU / DRAG
    // =========================================================

    disableContextMenu() {

        if (!this.stage) {

            return;

        }


        this.stage.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

            }
        );


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

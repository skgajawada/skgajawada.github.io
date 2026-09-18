// ============================================================
// RESUME PAGE
// PPT-STYLE VIEWER
// Portrait PDF page displayed one page at a time
// ============================================================

class ResumePage extends Component {

    constructor() {
        super();

        this.pdf = null;
        this.currentPage = 1;
        this.rendering = false;
        this.pendingPage = null;
        this.resizeTimer = null;
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
                         PAGE DISPLAY AREA
                    ======================================= -->

                    <div
                        id="resume-stage"
                        class="resume-stage"
                    >

                        <div
                            id="resume-loading"
                            class="resume-loading"
                        >

                            <i class="fas fa-spinner fa-spin"></i>

                            <span>
                                Loading Curriculum Vitae...
                            </span>

                        </div>


                        <canvas
                            id="resume-canvas"
                            class="resume-canvas"
                        ></canvas>

                    </div>


                    <!-- ======================================
                         BOTTOM BAR
                    ======================================= -->

                    <div class="resume-controls">

                        <button
                            id="resume-first"
                            class="resume-control-btn"
                            title="First Page"
                        >
                            <i class="fas fa-angle-double-left"></i>
                        </button>


                        <button
                            id="resume-prev"
                            class="resume-control-btn"
                            title="Previous Page"
                        >
                            <i class="fas fa-angle-left"></i>
                        </button>


                        <div
                            id="resume-page-number"
                            class="resume-page-number"
                        >
                            1 / --
                        </div>


                        <button
                            id="resume-next"
                            class="resume-control-btn"
                            title="Next Page"
                        >
                            <i class="fas fa-angle-right"></i>
                        </button>


                        <button
                            id="resume-last"
                            class="resume-control-btn"
                            title="Last Page"
                        >
                            <i class="fas fa-angle-double-right"></i>
                        </button>


                        <button
                            id="resume-fullscreen"
                            class="resume-control-btn"
                            title="Fullscreen"
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
    // LOAD RESUME
    // =========================================================

    async loadDocument() {

        const pdfPath =
            "assets/documents/SANJEEVKUMAR_RESUME.pdf";


        try {

            this.pdf =
                await pdfjsLib.getDocument({
                    url: pdfPath
                }).promise;


            document.getElementById(
                "resume-total-pages"
            ).textContent =
                `${this.pdf.numPages} Pages`;


            this.loading.style.display =
                "none";


            await this.showPage(
                this.currentPage
            );

        }

        catch (error) {

            console.error(
                "PDF loading error:",
                error
            );


            this.loading.innerHTML = `

                <i class="fas fa-exclamation-circle"></i>

                <span>
                    Unable to load Curriculum Vitae.
                </span>

            `;

        }

    }


    // =========================================================
    // SHOW ONE PAGE
    // =========================================================

    async showPage(pageNumber) {

        if (!this.pdf) {
            return;
        }


        // Keep page inside valid range

        pageNumber =
            Math.max(
                1,
                Math.min(
                    pageNumber,
                    this.pdf.numPages
                )
            );


        // If another render is active,
        // remember requested page

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


            // ==============================================
            // ORIGINAL PDF DIMENSIONS
            // ==============================================

            const baseViewport =
                page.getViewport({
                    scale: 1
                });


            // ==============================================
            // VIEWER DIMENSIONS
            // ==============================================

            const stageWidth =
                this.stage.clientWidth;


            const stageHeight =
                this.stage.clientHeight;


            // ==============================================
            // PADDING AROUND PORTRAIT PAGE
            // ==============================================

            const horizontalPadding =
                window.innerWidth <= 700
                    ? 20
                    : 70;


            const verticalPadding =
                window.innerWidth <= 700
                    ? 20
                    : 45;


            const availableWidth =
                stageWidth -
                horizontalPadding;


            const availableHeight =
                stageHeight -
                verticalPadding;


            // ==============================================
            // FIT PAGE
            // ==============================================

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


            // Avoid tiny pages

            scale =
                Math.max(
                    scale,
                    0.1
                );


            const viewport =
                page.getViewport({
                    scale: scale
                });


            // ==============================================
            // HIGH DPI DISPLAY
            // ==============================================

            const devicePixelRatio =
                Math.min(
                    window.devicePixelRatio ||
                    1,
                    2
                );


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


            this.canvas.style.width =
                `${Math.floor(viewport.width)}px`;


            this.canvas.style.height =
                `${Math.floor(viewport.height)}px`;


            // ==============================================
            // RENDER
            // ==============================================

            await page.render({

                canvasContext:
                    this.context,

                viewport:
                    viewport,

                transform:
                    devicePixelRatio !== 1
                        ? [
                            devicePixelRatio,
                            0,
                            0,
                            devicePixelRatio,
                            0,
                            0
                        ]
                        : null

            }).promise;


            // ==============================================
            // PAGE NUMBER
            // ==============================================

            document.getElementById(
                "resume-page-number"
            ).textContent =
                `${pageNumber} / ${this.pdf.numPages}`;


            this.updateButtons();

        }

        catch (error) {

            console.error(
                "Page rendering error:",
                error
            );

        }


        this.rendering = false;


        // ==============================================
        // RENDER LATEST REQUEST
        // ==============================================

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
    // BUTTONS
    // =========================================================

    setupControls() {

        document.getElementById(
            "resume-first"
        ).addEventListener(
            "click",
            () => this.showPage(1)
        );


        document.getElementById(
            "resume-prev"
        ).addEventListener(
            "click",
            () =>
                this.showPage(
                    this.currentPage - 1
                )
        );


        document.getElementById(
            "resume-next"
        ).addEventListener(
            "click",
            () =>
                this.showPage(
                    this.currentPage + 1
                )
        );


        document.getElementById(
            "resume-last"
        ).addEventListener(
            "click",
            () =>
                this.showPage(
                    this.pdf.numPages
                )
        );

    }


    // =========================================================
    // BUTTON STATES
    // =========================================================

    updateButtons() {

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


        first.disabled =
            atFirst;


        prev.disabled =
            atFirst;


        next.disabled =
            atLast;


        last.disabled =
            atLast;

    }


    // =========================================================
    // KEYBOARD NAVIGATION
    // =========================================================

    setupKeyboard() {

        this.keyboardHandler =
            (event) => {

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

                        this.showPage(
                            this.pdf.numPages
                        );

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

        this.stage.addEventListener(
            "wheel",
            (event) => {

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


        document.addEventListener(
            "fullscreenchange",
            () => {

                const icon =
                    button.querySelector(
                        "i"
                    );


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

            }
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
    // DISABLE CONTEXT MENU
    // =========================================================

    disableContextMenu() {

        this.stage.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

            }
        );


        this.canvas.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }

}

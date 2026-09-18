// ============================================================
// RESUME PAGE
// PPT-STYLE DOCUMENT VIEWER
// One portrait PDF page at a time
// ============================================================

class ResumePage extends Component {

    async render() {

        return `
            <div class="resume-viewer-page">

                <div class="resume-presentation">

                    <!-- ========================================
                         TOP BAR
                    ========================================= -->

                    <div class="resume-topbar">

                        <div class="resume-topbar-left">
                            Curriculum Vitae
                        </div>

                        <div class="resume-topbar-center">
                            Gajavada Sanjeevkumar
                        </div>

                        <div class="resume-topbar-right">
                            <span id="resume-total-pages">
                                Loading...
                            </span>
                        </div>

                    </div>


                    <!-- ========================================
                         DOCUMENT DISPLAY
                    ========================================= -->

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


                    <!-- ========================================
                         BOTTOM CONTROL BAR
                    ========================================= -->

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

        await this.loadPDFJS();

        await this.initializeViewer();

    }


    // =========================================================
    // LOAD PDF.JS
    // =========================================================

    async loadPDFJS() {

        if (window.pdfjsLib) {
            return;
        }


        await new Promise((resolve, reject) => {

            const script =
                document.createElement("script");


            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";


            script.onload =
                resolve;


            script.onerror =
                reject;


            document.head.appendChild(script);

        });


        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    }


    // =========================================================
    // INITIALIZE
    // =========================================================

    async initializeViewer() {

        this.pdf = null;

        this.currentPage = 1;

        this.rendering = false;

        this.pendingPage = null;


        this.canvas =
            document.getElementById(
                "resume-canvas"
            );


        this.context =
            this.canvas.getContext(
                "2d",
                {
                    alpha: false
                }
            );


        this.stage =
            document.getElementById(
                "resume-stage"
            );


        this.loading =
            document.getElementById(
                "resume-loading"
            );


        await this.loadDocument();

        this.setupControls();

        this.setupKeyboard();

        this.setupWheel();

        this.setupFullscreen();

        this.disableContextMenu();

    }


    // =========================================================
    // LOAD DOCUMENT
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
                "Resume loading error:",
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
    // SHOW PAGE
    // =========================================================

    async showPage(pageNumber) {

        if (!this.pdf) {
            return;
        }


        if (
            pageNumber < 1 ||
            pageNumber > this.pdf.numPages
        ) {
            return;
        }


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
            // AVAILABLE VIEWER SIZE
            // ==============================================

            const stageWidth =
                this.stage.clientWidth;


            const stageHeight =
                this.stage.clientHeight;


            const baseViewport =
                page.getViewport({
                    scale: 1
                });


            // ==============================================
            // FIT PAGE INSIDE VIEWER
            // ==============================================

            const horizontalPadding = 60;

            const verticalPadding = 50;


            const widthScale =
                (
                    stageWidth -
                    horizontalPadding
                ) /
                baseViewport.width;


            const heightScale =
                (
                    stageHeight -
                    verticalPadding
                ) /
                baseViewport.height;


            const scale =
                Math.min(
                    widthScale,
                    heightScale
                );


            const viewport =
                page.getViewport({
                    scale: scale
                });


            // ==============================================
            // CANVAS
            // ==============================================

            this.canvas.width =
                Math.floor(
                    viewport.width
                );


            this.canvas.height =
                Math.floor(
                    viewport.height
                );


            // ==============================================
            // RENDER PAGE
            // ==============================================

            await page.render({

                canvasContext:
                    this.context,

                viewport:
                    viewport

            }).promise;


            // ==============================================
            // PAGE COUNTER
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
        // RENDER PENDING PAGE
        // ==============================================

        if (this.pendingPage !== null) {

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
    // ENABLE / DISABLE BUTTONS
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


        first.disabled =
            this.currentPage === 1;


        prev.disabled =
            this.currentPage === 1;


        next.disabled =
            this.currentPage ===
            this.pdf.numPages;


        last.disabled =
            this.currentPage ===
            this.pdf.numPages;

    }


    // =========================================================
    // KEYBOARD
    // =========================================================

    setupKeyboard() {

        this.keyboardHandler =
            (event) => {

                if (
                    !document.querySelector(
                        ".resume-viewer-page"
                    )
                ) {
                    return;
                }


                switch (event.key) {

                    case "ArrowLeft":
                    case "PageUp":

                        event.preventDefault();

                        this.showPage(
                            this.currentPage - 1
                        );

                        break;


                    case "ArrowRight":
                    case "PageDown":
                    case " ":

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

                if (
                    Math.abs(event.deltaY) <
                    20
                ) {
                    return;
                }


                event.preventDefault();


                if (
                    event.deltaY > 0
                ) {

                    this.showPage(
                        this.currentPage + 1
                    );

                }

                else {

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

                if (
                    !document.fullscreenElement
                ) {

                    await viewer.requestFullscreen();

                }

                else {

                    await document.exitFullscreen();

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


                // Recalculate page size

                setTimeout(
                    () => {

                        if (this.pdf) {

                            this.showPage(
                                this.currentPage
                            );

                        }

                    },
                    150
                );

            }
        );

    }


    // =========================================================
    // RESIZE
    // =========================================================

    setupResize() {

        window.addEventListener(
            "resize",
            () => {

                if (this.pdf) {

                    this.showPage(
                        this.currentPage
                    );

                }

            }
        );

    }


    // =========================================================
    // DISABLE RIGHT CLICK
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

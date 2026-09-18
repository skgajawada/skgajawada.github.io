// ============================================================
// RESUME PAGE
// PDF rendered page-by-page using PDF.js
// ============================================================

class ResumePage extends Component {

    async render() {

        return `

            <div class="resume-page fade-in">

                <!-- ==========================================
                     PAGE HEADER
                =========================================== -->

                <section class="resume-header">

                    <span class="academic-kicker">
                        CURRICULUM VITAE
                    </span>

                    <h1 class="section-title">
                        Resume
                    </h1>

                    <p class="lead">
                        Academic, research and professional profile
                    </p>

                </section>


                <!-- ==========================================
                     DOCUMENT VIEWER
                =========================================== -->

                <section class="resume-viewer-wrapper">

                    <div class="resume-viewer-toolbar">

                        <div class="resume-toolbar-title">

                            <i class="fas fa-file-alt"></i>

                            <span>
                                Gajavada Sanjeevkumar — Curriculum Vitae
                            </span>

                        </div>


                        <div class="resume-toolbar-info">

                            <span id="resume-page-count">
                                Loading...
                            </span>

                            <button
                                id="resume-fullscreen-btn"
                                class="resume-toolbar-btn"
                                title="Fullscreen"
                            >
                                <i class="fas fa-expand"></i>
                            </button>

                        </div>

                    </div>


                    <div
                        id="resume-document-viewer"
                        class="resume-document-viewer"
                    >

                        <div
                            id="resume-loading"
                            class="resume-loading"
                        >

                            <i class="fas fa-spinner fa-spin"></i>

                            <span>
                                Loading CV...
                            </span>

                        </div>


                        <div
                            id="resume-pages"
                            class="resume-pages"
                        >
                        </div>

                    </div>

                </section>

            </div>
        `;
    }


    // ========================================================
    // Called after page HTML is inserted
    // ========================================================

    async afterRender() {

        await this.loadPDFJS();

        this.renderResume();

        this.setupFullscreen();

        this.disableResumeContextMenu();
    }


    // ========================================================
    // LOAD PDF.JS
    // ========================================================

    async loadPDFJS() {

        if (window.pdfjsLib) {
            return;
        }


        await new Promise((resolve, reject) => {

            const script =
                document.createElement("script");


            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";


            script.onload = resolve;

            script.onerror = reject;


            document.head.appendChild(script);

        });


        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }


    // ========================================================
    // RENDER RESUME
    // ========================================================

    async renderResume() {

        const pdfPath =
            "assets/documents/SANJEEVKUMAR_RESUME.pdf";


        const pagesContainer =
            document.getElementById("resume-pages");


        const loading =
            document.getElementById("resume-loading");


        const pageCount =
            document.getElementById("resume-page-count");


        try {

            const pdf =
                await pdfjsLib.getDocument({
                    url: pdfPath
                }).promise;


            if (!pagesContainer) {
                return;
            }


            loading.style.display = "none";


            pageCount.textContent =
                `${pdf.numPages} Page${pdf.numPages > 1 ? "s" : ""}`;


            // ==================================================
            // RENDER ALL PAGES
            // ==================================================

            for (
                let pageNumber = 1;
                pageNumber <= pdf.numPages;
                pageNumber++
            ) {

                const page =
                    await pdf.getPage(pageNumber);


                const baseViewport =
                    page.getViewport({
                        scale: 1
                    });


                // High quality rendering
                const targetWidth = 1200;


                const scale =
                    targetWidth /
                    baseViewport.width;


                const viewport =
                    page.getViewport({
                        scale: scale
                    });


                // ==============================================
                // PAGE WRAPPER
                // ==============================================

                const pageWrapper =
                    document.createElement("div");


                pageWrapper.className =
                    "resume-page-sheet";


                pageWrapper.setAttribute(
                    "data-page-number",
                    pageNumber
                );


                // ==============================================
                // CANVAS
                // ==============================================

                const canvas =
                    document.createElement("canvas");


                canvas.className =
                    "resume-page-canvas";


                const context =
                    canvas.getContext(
                        "2d",
                        {
                            alpha: false
                        }
                    );


                canvas.width =
                    Math.floor(viewport.width);


                canvas.height =
                    Math.floor(viewport.height);


                // ==============================================
                // PAGE LABEL
                // ==============================================

                const pageLabel =
                    document.createElement("div");


                pageLabel.className =
                    "resume-page-label";


                pageLabel.innerHTML =
                    `Page ${pageNumber} of ${pdf.numPages}`;


                // ==============================================
                // APPEND ELEMENTS
                // ==============================================

                pageWrapper.appendChild(
                    canvas
                );


                pageWrapper.appendChild(
                    pageLabel
                );


                pagesContainer.appendChild(
                    pageWrapper
                );


                // ==============================================
                // RENDER PDF PAGE
                // ==============================================

                await page.render({

                    canvasContext:
                        context,

                    viewport:
                        viewport

                }).promise;
            }

        }

        catch (error) {

            console.error(
                "Unable to load resume:",
                error
            );


            if (loading) {

                loading.innerHTML = `

                    <div class="resume-error">

                        <i class="fas fa-exclamation-circle"></i>

                        <p>
                            Unable to display the CV.
                        </p>

                    </div>
                `;
            }
        }
    }


    // ========================================================
    // FULLSCREEN
    // ========================================================

    setupFullscreen() {

        const button =
            document.getElementById(
                "resume-fullscreen-btn"
            );


        const viewer =
            document.querySelector(
                ".resume-viewer-wrapper"
            );


        if (!button || !viewer) {
            return;
        }


        button.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await viewer.requestFullscreen();

                        button.innerHTML =
                            '<i class="fas fa-compress"></i>';

                    }

                    else {

                        await document.exitFullscreen();

                        button.innerHTML =
                            '<i class="fas fa-expand"></i>';

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

                if (!document.fullscreenElement) {

                    button.innerHTML =
                        '<i class="fas fa-expand"></i>';

                }

            }
        );
    }


    // ========================================================
    // PREVENT SIMPLE RIGHT CLICK
    // ========================================================

    disableResumeContextMenu() {

        const viewer =
            document.getElementById(
                "resume-document-viewer"
            );


        if (!viewer) {
            return;
        }


        viewer.addEventListener(
            "contextmenu",
            event => {
                event.preventDefault();
            }
        );


        viewer.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );
    }
}

class VisitorCounter {

    static namespace = "skgajawada";
    static key = "portfolio-visitors";

    static async updateCounter() {

        const counter = document.getElementById("visitor-count");
        if (!counter) return;

        try {
            const response = await fetch(
                `https://api.countapi.xyz/hit/${this.namespace}/${this.key}`
            );

            const data = await response.json();

            counter.textContent = data.value.toLocaleString();

        } catch (err) {

            console.error("Visitor Counter Error:", err);

            counter.textContent = "--";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    VisitorCounter.updateCounter();
});

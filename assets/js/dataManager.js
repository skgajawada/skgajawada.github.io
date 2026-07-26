// Portfolio Data Manager
class DataManager {

    static async loadData(file) {
        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error(file);
            }

            return await response.json();

        } catch (e) {
            console.error(file, e);
            return null;
        }
    }

    static async getPortfolioData() {
        return await this.loadData("assets/data/portfolio-data.json");
    }

    static async getEngagements() {
        return await this.loadData("assets/data/engagements.json");
    }
    static async getMOOCs() {
        return await this.loadData("assets/data/mooc-certifications.json");
    }

    static async getTeaching() {
        return await this.loadData("assets/data/teaching-data.json");
    }

    // NEW METHOD
    static async getSocialResponsibility() {
        return await this.loadData("assets/data/social-responsibility.json");
    }

    static getRoundedCount(count, threshold = 100) {
        return count >= threshold
            ? `${Math.floor(count / 10) * 10}+`
            : count.toString();
    }
}

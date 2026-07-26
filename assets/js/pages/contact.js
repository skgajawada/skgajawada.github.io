// CONTACT PAGE
class ContactPage extends Component {
    async render() {
        return `
            <section class="fade-in">
                <h1 class="section-title">Get in Touch</h1>

                <div style="max-width: 800px; margin: 0 auto;">

                    <div class="reveal">
                        <h3 style="color: var(--primary); margin-bottom: 1.5rem; font-size: 1.3rem;">
                            Send a Message
                        </h3>

                        <form id="contactForm" class="contact-form" onsubmit="handleContactForm(event)">

                            <input type="hidden" name="access_key" value="b1cad834-0a09-44a4-bbbb-8c031c2e24e0">
                            <input type="hidden" name="subject" value="New message from Portfolio Website">
                            <input type="hidden" name="from_name" value="Gajavada Sanjeevkumar Portfolio">
                            <input type="checkbox" name="botcheck" style="display:none;">

                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required>
                            </div>

                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" rows="6" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width:100%;">
                                <i class="fas fa-paper-plane"></i>
                                Send Message
                            </button>

                        </form>
                    </div>

                </div>

            </section>
        `;
    }
}


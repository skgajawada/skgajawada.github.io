return `
<section class="fade-in">
    <h1 class="section-title">Skills & Expertise</h1>

    <div class="skills-grid">
        ${Object.entries(data.skills).map(([category, skills]) => `
            <div class="skill-category reveal">
                <h3 class="skill-category-title">${category}</h3>

                <div class="skills-tags">
                    ${skills.map(skill => `
                        <span class="skill-tag">
                            ${typeof skill === 'string' ? skill : skill.name}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    </div>
</section>
`;

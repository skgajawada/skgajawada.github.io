return `
<section class="fade-in">
    <h1 class="section-title">Skills & Expertise</h1>

    <div class="skills-grid">
        ${Object.entries(data.skills).map(([category, skills]) => `
            <div class="skill-panel reveal">

                <div class="skill-header">
                    <span class="skill-icon">
                        <i class="fas fa-chevron-right"></i>
                    </span>

                    <h3>${category}</h3>
                </div>

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

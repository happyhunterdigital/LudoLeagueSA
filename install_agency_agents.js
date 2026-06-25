const fs = require('fs');
const path = require('path');

async function install() {
    const configDir = path.join(process.env.USERPROFILE, '.gemini', 'config', 'skills');
    console.log(`Installing skills to ${configDir}...`);
    
    // Fetch tree
    const res = await fetch('https://api.github.com/repos/msitarzewski/agency-agents/git/trees/main?recursive=1');
    const data = await res.json();
    
    if (!data.tree) {
        console.error("Failed to fetch repository tree. You might be hitting GitHub API rate limits.");
        return;
    }
    
    const mdFiles = data.tree.filter(item => item.path.endsWith('.md') && item.path.includes('/') && !item.path.includes('.github'));
    
    for (const file of mdFiles) {
        try {
            const contentRes = await fetch(`https://raw.githubusercontent.com/msitarzewski/agency-agents/main/${file.path}`);
            const content = await contentRes.text();
            
            // Parse frontmatter
            const nameMatch = content.match(/name:\s*(.+)/);
            const descMatch = content.match(/description:\s*(.+)/);
            
            if (nameMatch && descMatch) {
                const name = nameMatch[1].trim().replace(/^['"]|['"]$/g, '');
                const desc = descMatch[1].trim().replace(/^['"]|['"]$/g, '');
                const slug = "agency-" + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                
                const skillDir = path.join(configDir, slug);
                fs.mkdirSync(skillDir, { recursive: true });
                
                // We construct the new SKILL.md by stripping the original frontmatter if needed, 
                // but the convert.sh script just prepends the new frontmatter or overrides it.
                // We'll replace the old frontmatter blocks with ours.
                const newContent = content.replace(/^---[\s\S]*?---/, `---
name: ${slug}
description: "${desc}"
risk: low
source: community
date_added: '2026-03-08'
---`);

                fs.writeFileSync(path.join(skillDir, 'SKILL.md'), newContent);
                console.log(`✅ Installed skill: ${slug}`);
            }
        } catch (e) {
            console.error(`Error processing ${file.path}:`, e.message);
        }
    }
    console.log("\n🎉 Installation complete! You can now use these skills.");
}

install().catch(console.error);

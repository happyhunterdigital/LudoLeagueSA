import fs from 'fs';

const logText = `Error: src/App.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/App.tsx(45,20): error TS6133: 'setWishlist' is declared but its value is never read.
Error: src/components/features/AfconGalleryAndInfo.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/AfconGalleryAndInfo.tsx(2,1): error TS6133: 'motion' is declared but its value is never read.
Error: src/components/features/AfconGalleryAndInfo.tsx(4,10): error TS6133: 'Calendar' is declared but its value is never read.
Error: src/components/features/AfconGalleryAndInfo.tsx(4,20): error TS6133: 'Shield' is declared but its value is never read.
Error: src/components/features/AfconGalleryAndInfo.tsx(4,28): error TS6133: 'Users' is declared but its value is never read.
Error: src/components/features/AfconPodiumAndTable.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/ChatbotWidget.tsx(3,10): error TS6133: 'MessageSquare' is declared but its value is never read.
Error: src/components/features/ChatbotWidget.tsx(3,34): error TS6133: 'Bot' is declared but its value is never read.
Error: src/components/features/GalleryAndContact.tsx(2,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/GoldDiceHero.tsx(10,29): error TS6133: 'rotationSpeed' is declared but its value is never read.
Error: src/components/features/Hero.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/InfoSections.tsx(2,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/LandingHero.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/LudoBoardModel.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/LudoScene.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/ShopCustomize.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/ShopCustomize.tsx(2,18): error TS6133: 'Check' is declared but its value is never read.
Error: src/components/features/ShopFeatures.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/ShopFeatures.tsx(10,30): error TS6133: 'selectedVariant' is declared but its value is never read.
Error: src/components/features/ShopHero.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/StoryAndSocialProof.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/components/features/TournamentRegistration.tsx(2,1): error TS6133: 'motion' is declared but its value is never read.
Error: src/components/features/ValuePropsAndPrograms.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/About.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Academy.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/AdminDashboard.tsx(4,56): error TS6133: 'CheckCircle2' is declared but its value is never read.
Error: src/pages/AfconTournament.tsx(3,1): error TS6133: 'SectionHeader' is declared but its value is never read.
Error: src/pages/AfconTournament.tsx(4,1): error TS6133: 'motion' is declared but its value is never read.
Error: src/pages/DonationPage.tsx(2,1): error TS6192: All imports in import declaration are unused.
Error: src/pages/DonationPage.tsx(3,74): error TS6133: 'Users' is declared but its value is never read.
Error: src/pages/Faqs.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Faqs.tsx(3,48): error TS6133: 'BookOpen' is declared but its value is never read.
Error: src/pages/Faqs.tsx(47,10): error TS6133: 'frameworkOpen' is declared but its value is never read.
Error: src/pages/Faqs.tsx(47,25): error TS6133: 'setFrameworkOpen' is declared but its value is never read.
Error: src/pages/Gallery.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/History.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Home.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Landing.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Landing.tsx(18,38): error TS6133: 'id' is declared but its value is never read.
Error: src/pages/Ludo4Schools.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Ludo4Schools.tsx(2,1): error TS6133: 'motion' is declared but its value is never read.
Error: src/pages/Ludo4Schools.tsx(4,10): error TS6133: 'GraduationCap' is declared but its value is never read.
Error: src/pages/Ludo4Schools.tsx(4,25): error TS6133: 'Award' is declared but its value is never read.
Error: src/pages/Ludo4Schools.tsx(4,32): error TS6133: 'Users' is declared but its value is never read.
Error: src/pages/NewsUpdates.tsx(3,27): error TS6133: 'X' is declared but its value is never read.
Error: src/pages/OurLeagues.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/OurTeam.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/OurTeam.tsx(3,1): error TS6192: All imports in import declaration are unused.
Error: src/pages/ShippingReturns.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
Error: src/pages/Shop.tsx(7,22): error TS6133: 'props' is declared but its value is never read.
Error: src/pages/Shop.tsx(8,10): error TS6133: 'activeSection' is declared but its value is never read.
Error: src/pages/UserDashboard.tsx(5,47): error TS6133: 'Heart' is declared but its value is never read.`;

const lines = logText.split('\n');

const files = {};
for (const line of lines) {
    let match = line.match(/Error: ([^(]+)\((\d+),(\d+)\): error (TS\d+): (.+)/);
    if (!match) continue;
    const [, filePath, lineStr, colStr, errorCode, msg] = match;
    if (!files[filePath]) {
        files[filePath] = fs.readFileSync(filePath, 'utf-8').split('\n');
    }
    const fileLines = files[filePath];
    const lineNum = parseInt(lineStr, 10);
    
    if (errorCode === "TS6192") {
        fileLines[lineNum - 1] = ''; // Remove the whole line
    } else if (errorCode === "TS6133") {
        const varMatch = msg.match(/'([^']+)' is declared but its value is never read/);
        if (varMatch) {
            const varName = varMatch[1];
            let l = fileLines[lineNum - 1];
            
            // Try different removal strategies
            if (l.includes(`import React from 'react';`)) {
                l = l.replace(`import React from 'react';`, '');
            } else if (l.includes(`import React, {`)) {
                l = l.replace(`import React, {`, `import {`);
            } else if (l.includes(`import React from "react";`)) {
                l = l.replace(`import React from "react";`, '');
            } else if (l.includes(`import React, {`) === false && l.includes(`import React `)) {
                 l = l.replace(`import React`, `// import React`);
            } else if (l.includes(`[${varName}, `)) {
                l = l.replace(`[${varName}, `, '[, ');
            } else if (l.includes(`, ${varName}]`)) {
                l = l.replace(`, ${varName}]`, ']');
            } else if (l.includes(`{ ${varName} }`) || l.includes(`{${varName}}`)) {
                l = l.replace(`{ ${varName} }`, '{}').replace(`{${varName}}`, '{}');
            } else if (l.includes(`{ ${varName}, `) || l.includes(`{${varName},`)) {
                l = l.replace(`{ ${varName}, `, '{ ').replace(`{${varName},`, '{');
            } else if (l.includes(`, ${varName} }`) || l.includes(`,${varName}}`)) {
                l = l.replace(`, ${varName} }`, ' }').replace(`,${varName}}`, '}');
            } else if (l.includes(`, ${varName}, `) || l.includes(`,${varName},`)) {
                l = l.replace(`, ${varName}, `, ', ').replace(`,${varName},`, ',');
            } else if (varName === 'props' && l.includes(`(props)`)) {
                 l = l.replace(`(props)`, '()');
            } else if (varName === 'props' && l.includes(`props: `)) {
                 l = l.replace(`props: `, `_props: `);
            } else if (l.includes(`const ${varName} = `) || l.includes(`let ${varName} = `)) {
                 l = `// ` + l;
            } else {
                 // Try generic import removal for destructured
                 if (l.startsWith("import ")) {
                     // if it's the only import
                     if (l.includes(`{ ${varName} }`) || l.includes(`{${varName}}`)) {
                          l = `// ` + l;
                     } else {
                          // Try removing it
                          l = l.replace(new RegExp(`\\b${varName}\\b\\s*,?`, 'g'), '');
                          // Cleanup trailing commas
                          l = l.replace(/,\s*}/g, '}');
                          l = l.replace(/{\s*,/g, '{');
                     }
                 } else {
                     console.log(`Could not automatically remove ${varName} in ${filePath}:${lineNum}`);
                 }
            }
            fileLines[lineNum - 1] = l;
        }
    }
}

for (const [filePath, lines] of Object.entries(files)) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Updated ${filePath}`);
}

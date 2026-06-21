import { Project } from "ts-morph";
import fs from "fs";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const sourceFiles = project.getSourceFiles();
console.log(`Found ${sourceFiles.length} files.`);

const unusedRegex = /'([^']+)' is declared but its value is never read/;

// The error log from the user
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

const lines = logText.split("\n");

for (const line of lines) {
  const match = line.match(/Error: ([^(]+)\((\d+),(\d+)\): error (TS\d+): (.+)/);
  if (!match) continue;
  
  const [, filePath, lineStr, colStr, errorCode, msg] = match;
  const sourceFile = project.getSourceFile(filePath);
  if (!sourceFile) {
    console.log("Could not find file", filePath);
    continue;
  }
  
  if (errorCode === "TS6192") {
    // All imports unused
    const lineNum = parseInt(lineStr, 10);
    const importDecls = sourceFile.getImportDeclarations();
    for (const imp of importDecls) {
      if (imp.getStartLineNumber() === lineNum) {
        imp.remove();
        break;
      }
    }
  } else if (errorCode === "TS6133") {
    const varMatch = msg.match(unusedRegex);
    if (!varMatch) continue;
    const varName = varMatch[1];
    const lineNum = parseInt(lineStr, 10);
    
    // Check if it's an import
    const importDecls = sourceFile.getImportDeclarations();
    let handled = false;
    for (const imp of importDecls) {
      if (imp.getStartLineNumber() === lineNum) {
        // Find the specific import
        if (imp.getDefaultImport()?.getText() === varName) {
            if (imp.getNamedImports().length === 0 && !imp.getNamespaceImport()) {
                imp.remove();
            } else {
                imp.removeDefaultImport();
            }
            handled = true;
            break;
        }
        const namedImports = imp.getNamedImports();
        for (const named of namedImports) {
            if (named.getName() === varName) {
                named.remove();
                handled = true;
                break;
            }
        }
        if (handled) {
            if (imp.getDefaultImport() === undefined && imp.getNamedImports().length === 0 && imp.getNamespaceImport() === undefined) {
                imp.remove();
            }
            break;
        }
      }
    }
    
    if (!handled) {
        // Try to find variable declaration
        const varDecls = sourceFile.getVariableDeclarations();
        for (const v of varDecls) {
            if (v.getName() === varName && v.getStartLineNumber() === lineNum) {
                // If it's part of array destructuring like [activeSection, setActiveSection]
                const parent = v.getParent();
                if (parent.getKindName() === 'VariableDeclarationList') {
                    // Try to handle destructuring manually or just remove if we can
                    // This is simple so we might just leave array destructurings or replace them
                    if (v.getNameNode().getKindName() === 'ArrayBindingPattern') {
                        // Complex, let's just use regex replacement for the file text if ts-morph destructuring is too complex
                        console.log("Array destructuring for", varName, "in", filePath);
                    } else if (v.getNameNode().getKindName() === 'ObjectBindingPattern') {
                        const elements = v.getNameNode().getElements();
                        for (const el of elements) {
                            if (el.getName() === varName) {
                                el.remove();
                                break;
                            }
                        }
                    } else {
                        v.remove();
                    }
                }
                handled = true;
                break;
            }
        }
    }
  }
}

// Second pass for specifically tricky things like destructured array or props
for (const line of lines) {
    const match = line.match(/Error: ([^(]+)\((\d+),(\d+)\): error TS6133: '([^']+)' is declared/);
    if (!match) continue;
    
    const [, filePath, lineStr, colStr, varName] = match;
    const sourceFile = project.getSourceFile(filePath);
    if (!sourceFile) continue;
    
    const lineNum = parseInt(lineStr, 10);
    // Let's do some manual regex on the file lines if ts-morph missed it
    let text = sourceFile.getFullText();
    let fileLines = text.split('\n');
    let targetLine = fileLines[lineNum - 1];
    let changed = false;
    
    if (targetLine.includes(`[${varName}, `)) {
        fileLines[lineNum - 1] = targetLine.replace(`[${varName}, `, '[, ');
        changed = true;
    } else if (targetLine.includes(`, ${varName}]`)) {
        fileLines[lineNum - 1] = targetLine.replace(`, ${varName}]`, ']');
        changed = true;
    } else if (targetLine.includes(`{ ${varName} }`) || targetLine.includes(`{${varName}}`)) {
        fileLines[lineNum - 1] = targetLine.replace(`{ ${varName} }`, '{}').replace(`{${varName}}`, '{}');
        changed = true;
    } else if (targetLine.includes(`{ ${varName}, `)) {
        fileLines[lineNum - 1] = targetLine.replace(`{ ${varName}, `, '{ ');
        changed = true;
    } else if (targetLine.includes(`, ${varName} }`)) {
        fileLines[lineNum - 1] = targetLine.replace(`, ${varName} }`, ' }');
        changed = true;
    } else if (varName === 'props' && targetLine.includes(`(props)`)) {
         fileLines[lineNum - 1] = targetLine.replace(`(props)`, '()');
         changed = true;
    }

    if (changed) {
        sourceFile.replaceWithText(fileLines.join('\n'));
    }
}

project.saveSync();
console.log("Done fixing files.");

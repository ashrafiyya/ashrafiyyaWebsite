#!/usr/bin/env node

/**
 * Script to check for expired programs and move them to previous programs
 * Runs daily at 2:00 AM EST via GitHub Actions
 * 
 * This script reads the TypeScript data files as text, extracts the data,
 * checks for expired programs, and rewrites the files if needed.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROGRAMS_FILE = join(__dirname, '../src/data/programs.ts');
const PREVIOUS_PROGRAMS_FILE = join(__dirname, '../src/data/previousPrograms.ts');

// Read files
const programsFileContent = readFileSync(PROGRAMS_FILE, 'utf-8');
const previousProgramsFileContent = readFileSync(PREVIOUS_PROGRAMS_FILE, 'utf-8');

// Parse the current date in EST
function getCurrentDateEST() {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

// Extract date from a program's event details
function findProgramDate(programText) {
  const dateMatch = programText.match(/\{\s*label:\s*["']Date["'],\s*value:\s*["']([^"']+)["']\s*\}/);
  if (!dateMatch) return null;
  
  try {
    const date = new Date(dateMatch[1]);
    if (isNaN(date.getTime())) return null;
    date.setHours(23, 59, 59, 999); // End of day
    return { date, dateString: dateMatch[1] };
  } catch {
    return null;
  }
}

// Check if a date has passed
function isDateExpired(dateString) {
  const programDate = new Date(dateString);
  if (isNaN(programDate.getTime())) return false;
  programDate.setHours(23, 59, 59, 999);
  return getCurrentDateEST() > programDate;
}

console.log('🔍 Checking for expired programs...');
console.log(`Current time (EST): ${getCurrentDateEST().toLocaleString('en-US', { timeZone: 'America/New_York' })}\n`);

let hasChanges = false;
let updatedProgramsContent = programsFileContent;
let updatedPreviousProgramsContent = previousProgramsFileContent;

// Find all programs and check for expiry
const programRegex = /\{\s*id:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["'],[\s\S]*?\}\s*(?=,?\s*\{|,?\s*\])/g;
let match;

while ((match = programRegex.exec(programsFileContent)) !== null) {
  const programBlock = match[0];
  const programId = match[1];
  const programTitle = match[2];
  
  const dateInfo = findProgramDate(programBlock);
  
  if (dateInfo && isDateExpired(dateInfo.dateString)) {
    console.log(`⏰ Found expired program: "${programTitle}"`);
    hasChanges = true;
    
    // Extract event details for the past event
    const venueMatch = programBlock.match(/\{\s*label:\s*["']Venue["'],\s*value:\s*["']([^"']+)["']\s*\}/);
    const venue = venueMatch ? venueMatch[1] : null;
    
    // Generate past event entry
    const pastEventId = `${programId}-${Date.now()}`;
    let pastEventEntry = `      {\n`;
    pastEventEntry += `        id: "${pastEventId}",\n`;
    pastEventEntry += `        event: "${programTitle}",\n`;
    pastEventEntry += `        date: "${dateInfo.dateString}",\n`;
    if (venue) {
      pastEventEntry += `        venue: "${venue}",\n`;
    }
    pastEventEntry += `      },\n`;
    
    // Find the branch in previous programs
    const branchMatch = programsFileContent.substring(0, match.index).match(/branchId:\s*["'](\w+)["']/g);
    const lastBranchMatch = branchMatch ? branchMatch[branchMatch.length - 1] : null;
    const branchId = lastBranchMatch ? lastBranchMatch.match(/["'](\w+)["']/)[1] : null;
    
    if (branchId) {
      // Find the branch in previousPrograms and add the event
      const branchPattern = new RegExp(`branchId:\\s*["']${branchId}["'][^}]*events:\\s*\\[`, 'g');
      const branchInPrevious = branchPattern.exec(updatedPreviousProgramsContent);
      
      if (branchInPrevious) {
        // Insert at the beginning of the events array
        const insertPosition = branchInPrevious.index + branchInPrevious[0].length;
        updatedPreviousProgramsContent =
          updatedPreviousProgramsContent.slice(0, insertPosition) +
          '\n' + pastEventEntry +
          updatedPreviousProgramsContent.slice(insertPosition);
        
        console.log(`  ✓ Moved to previous programs (${branchId})`);
      }
    }
    
    // Handle removal from current programs
    if (programId === 'rise-to-respond') {
      console.log(`  ↻ Replacing with "Coming Soon" version`);
      
      // Replace with default version
      const defaultVersion = `{
        id: "rise-to-respond",
        title: "Rise to Respond: Heartsaver Course for Sisters",
        descriptions: [
          "A sister-led initiative providing American Heart Association-certified CPR training with a focus on essential first aid and emergency response—equipping Muslim women with the skills and confidence to act when it matters most.",
        ],
        eventDetails: [{ label: "Status", value: "More Coming Soon" }],
        registrationText: "Details & Registration Coming Soon",
      }`;
      
      updatedProgramsContent = updatedProgramsContent.replace(programBlock, defaultVersion);
    } else {
      console.log(`  ✓ Removed from current programs`);
      
      // Remove the program (including comma if present)
      const programWithComma = programBlock + ',';
      if (updatedProgramsContent.includes(programWithComma)) {
        updatedProgramsContent = updatedProgramsContent.replace(programWithComma, '');
      } else {
        updatedProgramsContent = updatedProgramsContent.replace(programBlock, '');
      }
    }
  }
}

if (hasChanges) {
  console.log('\n✅ Writing updated files...');
  writeFileSync(PROGRAMS_FILE, updatedProgramsContent, 'utf-8');
  writeFileSync(PREVIOUS_PROGRAMS_FILE, updatedPreviousProgramsContent, 'utf-8');
  console.log('📝 Files updated successfully');
  process.exit(0);
} else {
  console.log('✓ No expired programs found');
  process.exit(0);
}

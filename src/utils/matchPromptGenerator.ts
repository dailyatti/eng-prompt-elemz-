import { Prompt } from '../types';

export interface MatchData {
  teamA: string;
  teamB: string;
  matchDate?: string;
  matchTime?: string;
  league?: string;
  venue?: string;
  currentScore?: string;
  matchStatus?: string;
  odds?: any;
}

export interface GenerationProgress {
  current: number;
  total: number;
  currentMatch: string;
}

export class MatchPromptGenerator {
  private static instance: MatchPromptGenerator;
  
  private constructor() {}
  
  public static getInstance(): MatchPromptGenerator {
    if (!MatchPromptGenerator.instance) {
      MatchPromptGenerator.instance = new MatchPromptGenerator();
    }
    return MatchPromptGenerator.instance;
  }

  /**
   * Validates and ensures every match gets a prompt generated
   */
  public validateMatches(matches: MatchData[]): MatchData[] {
    console.log(`🔍 MatchPromptGenerator: Validating ${matches.length} matches`);
    
    const validMatches = matches.filter((match, index) => {
      // Basic validation
      if (!match.teamA || !match.teamB) {
        console.warn(`⚠️ MatchPromptGenerator: Skipping match ${index + 1} with missing teams:`, match);
        return false;
      }
      
      // Ensure teams are strings and not empty
      if (typeof match.teamA !== 'string' || typeof match.teamB !== 'string') {
        console.warn(`⚠️ MatchPromptGenerator: Skipping match ${index + 1} with invalid team types:`, match);
        return false;
      }
      
      if (match.teamA.trim() === '' || match.teamB.trim() === '') {
        console.warn(`⚠️ MatchPromptGenerator: Skipping match ${index + 1} with empty team names:`, match);
        return false;
      }
      
      // Remove duplicates (same teams and date)
      const isDuplicate = matches.some((otherMatch, otherIndex) => 
        otherIndex !== index &&
        otherMatch.teamA === match.teamA &&
        otherMatch.teamB === match.teamB &&
        otherMatch.matchDate === match.matchDate
      );
      
      if (isDuplicate) {
        console.warn(`⚠️ MatchPromptGenerator: Skipping duplicate match ${index + 1}: ${match.teamA} vs ${match.teamB}`);
        return false;
      }
      
      return true;
    });

    console.log(`✅ MatchPromptGenerator: Validated ${validMatches.length} unique matches`);
    return validMatches;
  }

  /**
   * Generates a prompt for a single match
   */
  public async generateMatchPrompt(match: MatchData, sport: string): Promise<string> {
    console.log(`🎯 MatchPromptGenerator: Generating prompt for ${match.teamA} vs ${match.teamB}`);
    
    const matchInfo = {
      teamA: match.teamA.trim(),
      teamB: match.teamB.trim(),
      date: match.matchDate || new Date().toISOString().split('T')[0],
      time: match.matchTime || 'TBD',
      league: match.league || 'Unknown League',
      venue: match.venue || 'Unknown Venue',
      score: match.currentScore || 'Not Started',
      status: match.matchStatus || 'Scheduled'
    };

    const oddsInfo = match.odds || {};
    
    // Create comprehensive prompt content
    const promptContent = `**PhD-Level Sports Betting Analysis: ${matchInfo.teamA} vs ${matchInfo.teamB}**

**MATCH INFORMATION:**
- **Sport:** ${sport}
- **Teams:** ${matchInfo.teamA} vs ${matchInfo.teamB}
- **Date:** ${matchInfo.date}
- **Time:** ${matchInfo.time}
- **League:** ${matchInfo.league}
- **Venue:** ${matchInfo.venue}
- **Current Score:** ${matchInfo.score}
- **Match Status:** ${matchInfo.status}

**ODDS DATA:**
${this.formatOddsData(oddsInfo)}

**ANALYSIS REQUIREMENTS:**
1. **Team Analysis:** Deep dive into both teams' recent form, head-to-head history, and performance metrics
2. **Statistical Analysis:** Comprehensive statistical breakdown including possession, shots, goals, and defensive metrics
3. **Market Analysis:** Evaluation of current odds and betting market sentiment
4. **Risk Assessment:** Identification of potential risks and opportunities
5. **Recommendation:** Data-driven betting recommendation with confidence level

**OUTPUT FORMAT:**
Provide a structured analysis with clear sections for team analysis, statistics, market evaluation, and final recommendation.`;

    return promptContent;
  }

  /**
   * Generates prompts for ALL matches using map function
   */
  public async generatePromptsForAllMatches(
    matches: MatchData[], 
    sport: string,
    onProgress?: (progress: GenerationProgress) => void
  ): Promise<Prompt[]> {
    console.log(`🚀 MatchPromptGenerator: Starting prompt generation for ${matches.length} matches`);
    
    // Validate all matches first
    const validMatches = this.validateMatches(matches);
    
    if (validMatches.length === 0) {
      console.error(`❌ MatchPromptGenerator: No valid matches to generate prompts for`);
      throw new Error('No valid matches found for prompt generation');
    }

    console.log(`✅ MatchPromptGenerator: Will generate prompts for ${validMatches.length} valid matches`);
    
    // Use map to ensure every match gets a prompt
    const promptPromises = validMatches.map(async (match, index) => {
      console.log(`⚙️ MatchPromptGenerator: Processing match ${index + 1}/${validMatches.length}: ${match.teamA} vs ${match.teamB}`);
      
      // Update progress
      if (onProgress) {
        onProgress({
          current: index + 1,
          total: validMatches.length,
          currentMatch: `${match.teamA} vs ${match.teamB}`
        });
      }

      try {
        const promptContent = await this.generateMatchPrompt(match, sport);
        
        const newPrompt: Prompt = {
          id: `ai-${Date.now()}-${index}`,
          title: `${match.teamA} vs ${match.teamB} - ${sport} Analysis`,
          content: promptContent,
          category: 'ai-generated',
          sport: sport,
          type: 'analysis',
          tags: [sport, 'ai-generated', 'match-analysis', match.teamA, match.teamB],
          isFavorite: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        console.log(`✅ MatchPromptGenerator: Successfully generated prompt ${index + 1}: "${newPrompt.title}"`);
        return newPrompt;
        
      } catch (error) {
        console.error(`❌ MatchPromptGenerator: Failed to generate prompt for match ${index + 1}:`, error);
        throw error;
      }
    });

    // Wait for all prompts to be generated
    const generatedPrompts = await Promise.all(promptPromises);
    
    console.log(`🎉 MatchPromptGenerator: Successfully generated ${generatedPrompts.length} prompts`);
    console.log(`📊 Generated prompts:`, generatedPrompts.map(p => p.title));
    
    return generatedPrompts;
  }

  /**
   * Formats odds data for the prompt
   */
  private formatOddsData(odds: any): string {
    if (!odds || Object.keys(odds).length === 0) {
      return '- **Odds:** Not available';
    }

    let formattedOdds = '';
    
    // Main 1X2 odds
    if (odds.main1X2) {
      formattedOdds += `- **1X2:** Home: ${odds.main1X2.home || 'N/A'}, Draw: ${odds.main1X2.draw || 'N/A'}, Away: ${odds.main1X2.away || 'N/A'}\n`;
    }
    
    // Both Teams To Score
    if (odds.btts) {
      formattedOdds += `- **Both Teams To Score:** Yes: ${odds.btts.yes || 'N/A'}, No: ${odds.btts.no || 'N/A'}\n`;
    }
    
    // Total Goals
    if (odds.totalGoals) {
      formattedOdds += `- **Total Goals:** Over 0.5: ${odds.totalGoals.over05 || 'N/A'}, Under 0.5: ${odds.totalGoals.under05 || 'N/A'}\n`;
      formattedOdds += `  Over 1.5: ${odds.totalGoals.over15 || 'N/A'}, Under 1.5: ${odds.totalGoals.under15 || 'N/A'}\n`;
      formattedOdds += `  Over 2.5: ${odds.totalGoals.over25 || 'N/A'}, Under 2.5: ${odds.totalGoals.under25 || 'N/A'}\n`;
    }
    
    // Team Goals
    if (odds.teamAGoals) {
      formattedOdds += `- **Team A Goals:** Over 0.5: ${odds.teamAGoals.over05 || 'N/A'}, Under 0.5: ${odds.teamAGoals.under05 || 'N/A'}\n`;
      formattedOdds += `  Over 1.5: ${odds.teamAGoals.over15 || 'N/A'}, Under 1.5: ${odds.teamAGoals.under15 || 'N/A'}\n`;
    }
    
    if (odds.teamBGoals) {
      formattedOdds += `- **Team B Goals:** Over 0.5: ${odds.teamBGoals.over05 || 'N/A'}, Under 0.5: ${odds.teamBGoals.under05 || 'N/A'}\n`;
      formattedOdds += `  Over 1.5: ${odds.teamBGoals.over15 || 'N/A'}, Under 1.5: ${odds.teamBGoals.under15 || 'N/A'}\n`;
    }

    return formattedOdds || '- **Odds:** Available but not formatted';
  }

  /**
   * Ensures every match gets processed - no matches are skipped
   */
  public ensureAllMatchesProcessed(matches: MatchData[]): MatchData[] {
    console.log(`🔍 MatchPromptGenerator: Ensuring all ${matches.length} matches are processed`);
    
    const processedMatches = matches.map((match, index) => {
      // Ensure required fields exist
      const processedMatch: MatchData = {
        teamA: match.teamA || `Unknown Team A (${index + 1})`,
        teamB: match.teamB || `Unknown Team B (${index + 1})`,
        matchDate: match.matchDate || new Date().toISOString().split('T')[0],
        matchTime: match.matchTime || 'TBD',
        league: match.league || 'Unknown League',
        venue: match.venue || 'Unknown Venue',
        currentScore: match.currentScore || 'Not Started',
        matchStatus: match.matchStatus || 'Scheduled',
        odds: match.odds || {}
      };
      
      console.log(`✅ MatchPromptGenerator: Processed match ${index + 1}: ${processedMatch.teamA} vs ${processedMatch.teamB}`);
      return processedMatch;
    });

    console.log(`🎯 MatchPromptGenerator: All ${processedMatches.length} matches processed and ready for prompt generation`);
    return processedMatches;
  }
}

// Export singleton instance
export const matchPromptGenerator = MatchPromptGenerator.getInstance(); 
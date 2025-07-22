import { Prompt } from '../types';

export const initialPrompts: Prompt[] = [
  // FOOTBALL (SOCCER) PROMPTS
  {
    id: '1',
    title: 'Football Match Analysis - General EV Scanner',
    sport: 'football',
    category: 'traditional',
    type: 'general',
    tags: ['weather', 'form', 'statistics', 'injuries', 'motivation'],
    content: `⚽ **FOOTBALL EV SCANNER - PhD Level Analysis**

⏰ **SEARCH FOR TODAY'S OR TOMORROW'S TIPS:**

📅 **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S matches**
2️⃣ **Second priority: Tomorrow's programs**
3️⃣ **Third priority: Next day (only if necessary)**

🏆 **TARGET LEAGUES:**
- Premier League, La Liga, Bundesliga, Serie A, Ligue 1
- Champions League, Europa League, National cups
- All major European and international competitions

📊 **COMPREHENSIVE ANALYSIS FRAMEWORK:**

**1. TEAM FORM & PERFORMANCE METRICS:**
- Last 10 matches: W-D-L record, goals scored/conceded
- Home/Away form split analysis
- Expected Goals (xG) vs Actual Goals differential
- Shot conversion rates and defensive efficiency
- Recent head-to-head record (last 5 meetings)

**2. STATISTICAL MODELING:**
- Poisson distribution for goal prediction
- Elo rating system calculations
- Team strength ratings (attack/defense)
- Market efficiency analysis vs true probabilities

**3. CONTEXTUAL FACTORS:**
- Weather conditions (temperature, wind, precipitation)
- Pitch conditions and stadium characteristics
- Team motivation (league position, European qualification, relegation battle)
- Fixture congestion and rotation policies
- Derby/rivalry intensity factor

**4. INJURY & SUSPENSION ANALYSIS:**
- Key player availability (impact rating 1-10)
- Tactical system disruption assessment
- Replacement player quality differential

**5. BETTING MARKET ANALYSIS:**
For each available market, calculate:
- Implied probability from odds
- True probability using statistical models
- Expected Value (EV) = (True Probability × Odds) - 1
- Kelly Criterion optimal stake percentage
- Confidence interval (90%, 95%, 99%)

**REQUIRED OUTPUT FORMAT:**
- **Match prediction with confidence percentage**
- **Top 5 highest EV bets ranked by value**
- **Risk assessment for each recommendation**
- **Detailed mathematical reasoning for each selection**
- **Weather impact assessment (if outdoor venue)**
- **Key factors that could invalidate the analysis**

**IMPORTANT:** Focus on TODAY'S and TOMORROW'S matches only!`,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  
  // Tennis Specific Match Analysis
  {
    id: 'tennis-specific-analysis',
    title: 'Tennis Match Analysis: [PLAYER A] vs [PLAYER B]',
    content: `Conduct a comprehensive PhD-level analysis for the tennis match between [PLAYER A] and [PLAYER B].

## 1. PLAYER PERFORMANCE ANALYSIS

### Head-to-Head Record Analysis:
- Historical matchup record and surface-specific performance
- Recent form analysis (last 10 matches on similar surfaces)
- Playing style compatibility assessment
- Psychological edge evaluation

### Surface-Specific Performance:
- Hard court/Clay/Grass court win percentages
- Surface-specific serve statistics (1st serve %, aces, double faults)
- Return game effectiveness on current surface
- Movement and court coverage adaptation

### Physical Condition Assessment:
- Recent injury reports and recovery status
- Match load analysis (recent tournament participation)
- Age factor and endurance capabilities
- Playing schedule fatigue assessment

## 2. TACTICAL MATCHUP ANALYSIS

### Serve vs Return Dynamics:
- [PLAYER A] serve speed/placement vs [PLAYER B] return positioning
- Break point conversion rates and defensive capabilities
- Tiebreak performance and clutch factor
- Service game hold percentages

### Playing Style Compatibility:
- Baseline vs Net play preferences
- Forehand/Backhand strength matchups
- Court positioning and shot selection
- Defensive vs Aggressive playing styles

## 3. ENVIRONMENTAL FACTORS

### Weather Impact Assessment:
- Wind conditions effect on serve and groundstrokes
- Temperature impact on ball bounce and player stamina
- Humidity effects on grip and movement
- Sun position and court orientation

### Tournament Context:
- Round importance and pressure handling
- Prize money and ranking points at stake
- Home crowd advantage assessment
- Tournament history and venue familiarity

## 4. STATISTICAL MODELING

### Advanced Metrics Calculation:
- Expected Games Won (EGW) based on serve/return stats
- Break point probability matrices
- Set completion probability analysis
- Match duration prediction models

### Betting Market Analysis:
- Current odds vs calculated fair value
- Market movement and sharp money indicators
- Over/Under games/sets analysis
- Handicap betting opportunities

## 5. RISK ASSESSMENT & RECOMMENDATIONS

### Kelly Criterion Application:
- Optimal bet sizing based on calculated edge
- Bankroll management recommendations
- Multi-market correlation analysis
- Hedge betting opportunities

### Confidence Intervals:
- Match winner probability: [X]% ± [Y]%
- Total games O/U probability: [X]% ± [Y]%
- Set betting probability: [X]% ± [Y]%

Provide specific numerical probabilities and recommended bet sizes based on your analysis.`,
    sport: 'tennis',
    category: 'traditional',
    type: 'specific',
    tags: ['head-to-head', 'surface-analysis', 'serve-return', 'weather-impact', 'tactical-matchup'],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },

  // American Football Specific Match Analysis
  {
    id: 'american-football-specific-analysis',
    title: 'NFL Game Analysis: [TEAM A] vs [TEAM B]',
    content: `Conduct a comprehensive PhD-level analysis for the NFL game between [TEAM A] and [TEAM B].

## 1. TEAM PERFORMANCE ANALYSIS

### Offensive Unit Evaluation:
- Quarterback performance metrics (QBR, completion %, TD/INT ratio)
- Offensive line pass protection and run blocking efficiency
- Skill position player health and recent performance
- Red zone efficiency and third down conversion rates

### Defensive Unit Assessment:
- Pass rush effectiveness (sack rate, QB pressures)
- Secondary coverage metrics (yards per attempt allowed)
- Run defense efficiency (yards per carry allowed)
- Turnover generation and defensive scoring

### Special Teams Impact:
- Kicking game reliability (FG%, XP%, punting average)
- Return game effectiveness and field position impact
- Coverage unit performance and penalty rates
- Weather impact on kicking game

## 2. MATCHUP ANALYSIS

### Key Position Battles:
- [TEAM A] pass rush vs [TEAM B] offensive line
- [TEAM A] secondary vs [TEAM B] receiving corps
- Running game matchups and defensive front seven
- Coaching matchup and in-game adjustments

### Injury Report Impact:
- Key player availability and snap count projections
- Backup player performance and depth chart analysis
- Injury impact on game plan and play calling
- Recovery timeline and playing through injury assessment

## 3. SITUATIONAL FACTORS

### Weather Conditions:
- Temperature, wind, and precipitation impact
- Dome vs outdoor venue considerations
- Historical team performance in similar conditions
- Passing vs running game weather adjustments

### Travel and Rest Factors:
- Cross-country travel and time zone changes
- Days of rest and short week considerations
- Home field advantage and crowd noise impact
- Divisional rivalry and emotional factors

## 4. ADVANCED ANALYTICS

### Expected Points Models:
- EPA (Expected Points Added) per play analysis
- Success rate metrics for both teams
- Situational performance (1st down, 3rd down, red zone)
- Garbage time vs competitive situation splits

### Market Analysis:
- Point spread movement and sharp money indicators
- Total points analysis and pace of play factors
- Player prop betting opportunities
- Live betting situational advantages

## 5. BETTING RECOMMENDATIONS

### Primary Betting Markets:
- Point spread recommendation with confidence level
- Total points over/under analysis
- Moneyline value assessment
- First half betting opportunities

### Kelly Criterion Application:
- Optimal bet sizing based on calculated edge
- Multi-market correlation considerations
- Hedge betting strategies for live wagering
- Bankroll allocation recommendations

### Risk Management:
- Weather contingency planning
- Injury news monitoring protocols
- Line movement thresholds for action
- Maximum exposure recommendations

Provide specific point spread predictions and total points projections with confidence intervals.`,
    sport: 'american-football',
    category: 'traditional',
    type: 'specific',
    tags: ['nfl-analysis', 'injury-report', 'weather-impact', 'matchup-analysis', 'special-teams'],
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },

  // Basketball Specific Match Analysis
  {
    id: 'basketball-specific-analysis',
    title: 'NBA Game Analysis: [TEAM A] vs [TEAM B]',
    content: `Conduct a comprehensive PhD-level analysis for the NBA game between [TEAM A] and [TEAM B].

## 1. TEAM PERFORMANCE METRICS

### Offensive Efficiency Analysis:
- Effective Field Goal Percentage (eFG%) and True Shooting %
- Pace of play and possessions per game analysis
- Three-point shooting volume and efficiency trends
- Assist-to-turnover ratio and ball movement metrics

### Defensive System Evaluation:
- Defensive Rating and opponent shooting percentages
- Rebounding rates (offensive and defensive)
- Steal and block rates, defensive versatility
- Pick-and-roll defense and switching capabilities

### Depth Chart and Rotation Analysis:
- Starting lineup net rating and plus/minus metrics
- Bench production and second unit effectiveness
- Minutes distribution and fatigue management
- Injury report impact on rotation patterns

## 2. MATCHUP DYNAMICS

### Position-by-Position Analysis:
- Point guard matchup: playmaking vs defensive pressure
- Wing player matchups: scoring efficiency and defensive impact
- Frontcourt battle: rebounding, interior scoring, rim protection
- Coaching philosophy and tactical adjustments

### Style Compatibility Assessment:
- [TEAM A] pace vs [TEAM B] preferred tempo
- Three-point shooting volume vs perimeter defense
- Interior scoring vs rim protection capabilities
- Transition offense vs transition defense efficiency

## 3. SITUATIONAL FACTORS

### Schedule and Rest Analysis:
- Back-to-back games and travel fatigue
- Days of rest and practice time availability
- Season-long workload and veteran rest management
- Home court advantage and crowd energy impact

### Motivational and Context Factors:
- Playoff positioning and seeding implications
- Revenge game narratives and emotional factors
- Trade deadline impacts and team chemistry
- Coaching hot seat situations and job security

## 4. ADVANCED STATISTICAL MODELING

### Possession-Based Analysis:
- Expected possessions and pace projections
- Four Factors analysis (eFG%, TOV%, ORB%, FTR)
- Clutch time performance (last 5 minutes, close games)
- Garbage time vs competitive minute splits

### Player Impact Metrics:
- Individual player BPM (Box Plus/Minus) analysis
- Usage rate and efficiency correlation
- On-court vs off-court team performance
- Matchup-specific player advantages

## 5. BETTING MARKET ANALYSIS

### Primary Markets Assessment:
- Point spread analysis with home court adjustment
- Total points projection based on pace and efficiency
- Moneyline value in blowout vs close game scenarios
- First quarter and first half betting opportunities

### Player Props and Alternative Markets:
- Individual player point/rebound/assist projections
- Three-point made totals and shooting volume
- Double-double and triple-double probabilities
- Team total points and margin-based props

### Risk Management Strategy:
- Kelly Criterion bet sizing recommendations
- Correlation between different betting markets
- Live betting opportunities and in-game adjustments
- Hedge strategies for large position management

### Confidence Intervals:
- Point spread probability: [X]% ± [Y]%
- Total points probability: [X]% ± [Y]%
- Player prop confidence: [X]% ± [Y]%

Provide specific point totals, spread predictions, and recommended bet allocations.`,
    sport: 'basketball',
    category: 'traditional',
    type: 'specific',
    tags: ['nba-analysis', 'pace-tempo', 'matchup-dynamics', 'player-props', 'efficiency-metrics'],
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
  },

  // Ice Hockey Specific Match Analysis
  {
    id: 'hockey-specific-analysis',
    title: 'NHL Game Analysis: [TEAM A] vs [TEAM B]',
    content: `Conduct a comprehensive PhD-level analysis for the NHL game between [TEAM A] and [TEAM B].

## 1. TEAM PERFORMANCE EVALUATION

### Offensive System Analysis:
- Goals per game and shooting percentage trends
- Power play efficiency and special teams coordination
- Shot generation and high-danger scoring chances
- Faceoff win percentage and puck possession metrics

### Defensive Structure Assessment:
- Goals against average and save percentage support
- Penalty kill effectiveness and short-handed situations
- Shot suppression and defensive zone coverage
- Blocked shots and defensive commitment metrics

### Goaltending Analysis:
- Starting goaltender recent form and career statistics
- Save percentage in different game situations
- Goals saved above expected (GSAx) metrics
- Back-to-back game performance and fatigue factors

## 2. MATCHUP DYNAMICS

### Line Combinations and Deployment:
- Top line vs top defensive pairing matchups
- Depth scoring vs defensive depth assessment
- Special teams unit effectiveness comparison
- Coaching line matching and strategic deployment

### Playing Style Compatibility:
- [TEAM A] forechecking vs [TEAM B] breakout system
- Physical play and hits delivered/received
- Speed and transition game vs defensive structure
- Discipline and penalty differential analysis

## 3. SITUATIONAL FACTORS

### Schedule and Travel Impact:
- Back-to-back games and goaltender rotation
- Cross-country travel and time zone adjustments
- Home ice advantage and last change benefit
- Rest days and practice time availability

### Injury and Lineup Changes:
- Key player availability and replacement impact
- Line chemistry disruption from callups/trades
- Defensive pairing adjustments and system changes
- Goaltender injury and backup performance

## 4. ADVANCED ANALYTICS

### Possession and Territory Metrics:
- Corsi and Fenwick percentage analysis
- Expected goals for/against (xGF/xGA) models
- Zone start percentage and deployment context
- Score and venue adjusted statistics

### Special Situations Analysis:
- Power play and penalty kill percentage trends
- 4-on-4 and 3-on-3 overtime performance
- Empty net situations and late-game management
- Shootout records and individual shooter success

## 5. BETTING STRATEGY

### Primary Market Analysis:
- Puck line (+/-1.5) vs moneyline value comparison
- Total goals over/under based on pace and goaltending
- First period and regulation time betting opportunities
- 3-way moneyline (regulation time) analysis

### Alternative Markets:
- Individual player point totals and shot props
- Team total goals and period-specific betting
- Penalty minutes and hits delivered props
- Goaltender save totals and shutout probabilities

### Risk Management:
- Kelly Criterion application for optimal bet sizing
- Overtime and shootout impact on betting outcomes
- Live betting opportunities during game flow changes
- Hedge strategies for regulation vs overtime outcomes

### Confidence Assessment:
- Regulation winner probability: [X]% ± [Y]%
- Total goals probability: [X]% ± [Y]%
- Puck line coverage: [X]% ± [Y]%

Provide specific goal total predictions and puck line recommendations with confidence levels.`,
    sport: 'hockey',
    category: 'traditional',
    type: 'specific',
    tags: ['nhl-analysis', 'goaltending', 'special-teams', 'possession-metrics', 'puck-line'],
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
  },

  // Baseball Specific Match Analysis
  {
    id: 'baseball-specific-analysis',
    title: 'MLB Game Analysis: [TEAM A] vs [TEAM B]',
    content: `Conduct a comprehensive PhD-level analysis for the MLB game between [TEAM A] and [TEAM B].

## 1. PITCHING MATCHUP ANALYSIS

### Starting Pitcher Evaluation:
- Recent form and velocity trends (last 5 starts)
- Pitch repertoire effectiveness and usage patterns
- Platoon splits (vs LHB/RHB) and situational performance
- Innings pitched workload and fatigue indicators

### Bullpen Depth Assessment:
- Relief pitcher availability and recent usage
- High-leverage situation performance metrics
- Closer effectiveness and save situation record
- Matchup advantages vs opposing lineup construction

### Historical Pitcher vs Team Performance:
- Career statistics against current opponent
- Ballpark-specific performance adjustments
- Weather impact on pitch movement and effectiveness
- Rest days and routine disruption factors

## 2. OFFENSIVE LINEUP ANALYSIS

### Batting Order Construction:
- Individual hitter vs starting pitcher matchups
- Recent form and hot/cold streak analysis
- Platoon advantages and bench utilization
- Clutch hitting and runners in scoring position stats

### Team Offensive Metrics:
- Runs per game and on-base percentage trends
- Power numbers (HR, SLG) vs pitcher tendencies
- Speed game impact (SB, extra bases) and situational hitting
- Strikeout and walk rates vs pitcher profile

## 3. BALLPARK AND ENVIRONMENTAL FACTORS

### Venue-Specific Adjustments:
- Park factor for runs, home runs, and hit types
- Foul territory impact on offensive numbers
- Altitude, humidity, and atmospheric conditions
- Wind direction and speed impact on ball flight

### Weather Impact Analysis:
- Temperature effects on ball carry and pitcher grip
- Precipitation probability and game delay risks
- Sun position and shadows affecting visibility
- Historical team performance in similar conditions

## 4. SITUATIONAL FACTORS

### Series Context and Motivation:
- Game importance for playoff positioning
- Revenge factor and recent series history
- Travel schedule and cross-country adjustments
- Day vs night game performance splits

### Injury Report and Roster Moves:
- Key player availability and replacement impact
- Pitching rotation adjustments and bullpen usage
- Bench depth and pinch-hitting options
- Recent callups and their MLB experience

## 5. ADVANCED STATISTICAL MODELING

### Sabermetric Analysis:
- Expected runs based on lineup vs pitcher matchups
- BABIP regression and luck factor assessment
- WAR (Wins Above Replacement) impact analysis
- Pythagorean win expectancy vs actual record

### Game Flow Projections:
- Inning-by-inning scoring probability models
- Bullpen usage patterns and leverage situations
- Late-game substitution and pinch-hitting scenarios
- Extra innings probability and performance

## 6. BETTING MARKET EVALUATION

### Primary Markets:
- Run line (+/-1.5) analysis with juice consideration
- Total runs over/under based on offensive/pitching matchup
- Moneyline value in pitcher's duel vs slugfest scenarios
- First 5 innings (F5) betting advantages

### Prop Betting Opportunities:
- Individual player hit totals and RBI props
- Pitcher strikeout totals and earned run props
- Team total runs and inning-specific betting
- Home run and extra-base hit probabilities

### Risk Management Strategy:
- Weather contingency and postponement risks
- Kelly Criterion bet sizing with variance considerations
- Live betting opportunities based on early innings
- Correlation between different prop markets

### Confidence Intervals:
- Total runs probability: [X]% ± [Y]%
- Run line coverage: [X]% ± [Y]%
- Moneyline outcome: [X]% ± [Y]%

Provide specific run total predictions and recommended betting allocations with weather contingencies.`,
    sport: 'baseball',
    category: 'traditional',
    type: 'specific',
    tags: ['mlb-analysis', 'pitcher-matchup', 'ballpark-factors', 'weather-impact', 'sabermetrics'],
    createdAt: '2024-01-15T15:00:00Z',
    updatedAt: '2024-01-15T15:00:00Z',
  },

  // MMA Specific Match Analysis
  {
    id: 'mma-specific-analysis',
    title: 'MMA Fight Analysis: [FIGHTER A] vs [FIGHTER B]',
    content: `Conduct a comprehensive PhD-level analysis for the MMA fight between [FIGHTER A] and [FIGHTER B].

## 1. FIGHTER SKILL SET ANALYSIS

### Striking Assessment:
- Stand-up technique and striking accuracy percentages
- Power punching and knockout ratio analysis
- Defensive striking and damage absorption rates
- Reach advantage and distance management capabilities

### Grappling and Ground Game:
- Takedown accuracy and takedown defense percentages
- Ground control time and submission attempt rates
- Guard passing and positional advancement skills
- Submission defense and escape capabilities

### Cardio and Conditioning:
- Historical performance in later rounds
- Weight cutting impact and hydration recovery
- Training camp intensity and preparation quality
- Age factor and recovery between fights

## 2. STYLE MATCHUP DYNAMICS

### Fighting Style Compatibility:
- [FIGHTER A] preferred range vs [FIGHTER B] comfort zone
- Striker vs grappler dynamic and takedown threats
- Pressure fighting vs counter-striking approaches
- Cage control and octagon positioning advantages

### Physical Attributes Comparison:
- Height, reach, and frame size advantages
- Speed and reflexes vs power and durability
- Weight cutting difficulty and fight day condition
- Injury history and physical wear assessment

## 3. RECENT FORM AND MOMENTUM

### Fight History Analysis:
- Win/loss streak and quality of recent opponents
- Performance against similar fighting styles
- Improvement trajectory and skill development
- Damage accumulation from recent fights

### Training Camp and Preparation:
- Coaching team quality and strategic planning
- Sparring partner quality and camp reports
- Injury concerns and training disruptions
- Mental state and confidence indicators

## 4. FIGHT ENVIRONMENT FACTORS

### Event Context and Pressure:
- Main card vs preliminary card positioning
- Title implications and career significance
- Home country advantage and crowd support
- Media attention and external pressure factors

### Weight Class and Cutting:
- Weight cutting difficulty and rehydration success
- Performance at current weight vs other divisions
- Same-day weigh-in vs day-before protocols
- Hydration and energy level on fight day

## 5. STATISTICAL MODELING

### Performance Metrics Analysis:
- Significant strikes landed/attempted ratios
- Takedown success rates and ground control time
- Finish rate and method of victory patterns
- Round-by-round performance consistency

### Predictive Modeling:
- Monte Carlo simulation of fight outcomes
- Round-by-round scoring probability analysis
- Method of victory probability distributions
- Fight duration and pace projections

## 6. BETTING STRATEGY

### Primary Markets:
- Moneyline value assessment and implied probabilities
- Method of victory betting (KO/TKO, Submission, Decision)
- Round betting and fight duration props
- Over/under total rounds analysis

### Advanced Props:
- Fight to go the distance probability
- Specific round finish betting opportunities
- Performance bonuses and fight of the night potential
- Fighter-specific prop bets (knockdowns, takedowns)

### Risk Management:
- Kelly Criterion application with high variance consideration
- Hedge opportunities for method of victory bets
- Live betting during fight based on early rounds
- Maximum exposure limits due to fight unpredictability

### Confidence Assessment:
- Fight winner probability: [X]% ± [Y]%
- Method of victory probability: [X]% ± [Y]%
- Total rounds probability: [X]% ± [Y]%

Provide specific method of victory predictions and round betting recommendations with confidence intervals.`,
    sport: 'mma',
    category: 'traditional',
    type: 'specific',
    tags: ['mma-analysis', 'style-matchup', 'grappling-striking', 'weight-cutting', 'method-victory'],
    createdAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
  },

  // Boxing Specific Match Analysis
  {
    id: 'boxing-specific-analysis',
    title: 'Boxing Match Analysis: [FIGHTER A] vs [FIGHTER B]',
    content: `Conduct a comprehensive PhD-level analysis for the boxing match between [FIGHTER A] and [FIGHTER B].

## 1. TECHNICAL BOXING ANALYSIS

### Offensive Capabilities:
- Punch output and combinations per round analysis
- Power punching and knockout percentage assessment
- Jab effectiveness and range control capabilities
- Body work and accumulative damage patterns

### Defensive Skills Evaluation:
- Punch accuracy allowed and defensive positioning
- Head movement and slip percentage analysis
- Blocking and parrying effectiveness
- Ring generalship and distance management

### Ring IQ and Adaptability:
- In-fight adjustments and tactical flexibility
- Pressure vs counter-punching effectiveness
- Late-round performance and championship rounds
- Corner advice implementation and mid-fight changes

## 2. PHYSICAL AND ATHLETIC COMPARISON

### Physical Attributes:
- Height, reach, and frame size advantages
- Hand speed vs foot speed assessment
- Power generation and punch force analysis
- Stamina and conditioning in later rounds

### Age and Experience Factors:
- Professional experience and rounds fought
- Amateur background and technical foundation
- Age-related decline or prime performance window
- Recovery ability between training and fights

## 3. RECENT FORM AND OPPOSITION QUALITY

### Fight History Analysis:
- Quality of recent opponents and step-up fights
- Performance against similar fighting styles
- Improvement or decline trajectory assessment
- Damage accumulation and wear factor

### Training Camp Evaluation:
- Sparring partner quality and preparation intensity
- Coaching team expertise and strategic planning
- Weight management and physical condition
- Injury concerns and training disruptions

## 4. STYLE MATCHUP DYNAMICS

### Fighting Style Compatibility:
- [FIGHTER A] preferred distance vs [FIGHTER B] comfort zone
- Pressure fighter vs boxer-mover dynamics
- Inside fighting vs outside boxing preferences
- Southpaw vs orthodox stance advantages

### Tactical Considerations:
- Game plan execution and strategic discipline
- Adjustment capability when behind on cards
- Dirty boxing and clinch work effectiveness
- Ring cutting and trap setting abilities

## 5. CHAMPIONSHIP AND VENUE FACTORS

### Fight Significance:
- Title implications and career-defining importance
- Mandatory defense vs voluntary defense motivation
- Unification or undisputed championship stakes
- Retirement fight or legacy-defining moment

### Environmental Considerations:
- Home country advantage and crowd support
- Venue size and atmosphere impact
- Judging tendencies and scoring preferences
- Television vs live gate priority considerations

## 6. STATISTICAL MODELING AND PROJECTIONS

### CompuBox and Advanced Metrics:
- Expected punch output based on historical data
- Power punch percentage and landing accuracy
- Round-by-round scoring probability models
- Knockdown and knockout probability analysis

### Betting Market Analysis:
- Implied probability vs calculated fair odds
- Round betting and method of victory props
- Over/under total rounds based on fighting styles
- Decision vs stoppage probability assessment

## 7. BETTING RECOMMENDATIONS

### Primary Markets:
- Moneyline value and implied probability analysis
- Method of victory betting (KO/TKO, UD, MD, SD)
- Round group betting and specific round props
- Fight to go the distance probability

### Advanced Betting Strategies:
- Round-by-round live betting opportunities
- Scorecard betting and wide/close decision props
- Knockdown occurrence and multiple knockdown props
- Performance bonus and fight quality betting

### Risk Management:
- Kelly Criterion with boxing variance considerations
- Hedge strategies for method of victory combinations
- Maximum exposure due to judging subjectivity
- Live betting adjustments based on early rounds

### Confidence Intervals:
- Fight winner probability: [X]% ± [Y]%
- Method of victory probability: [X]% ± [Y]%
- Total rounds probability: [X]% ± [Y]%

Provide specific round predictions, method of victory analysis, and recommended betting allocations with confidence levels.`,
    sport: 'boxing',
    category: 'traditional',
    type: 'specific',
    tags: ['boxing-analysis', 'technical-skills', 'style-matchup', 'championship-fight', 'compubox-stats'],
    createdAt: '2024-01-15T17:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
  },
  {
    id: '2',
    title: 'Football Specific Match Analysis - [TEAM A] vs [TEAM B]',
    sport: 'football',
    category: 'traditional',
    type: 'specific',
    tags: ['head-to-head', 'tactical', 'lineups', 'weather'],
    content: `DETAILED MATCH ANALYSIS: [TEAM A] vs [TEAM B]

TEAM-SPECIFIC ANALYSIS:

[TEAM A] ASSESSMENT:
- Current league position and recent form (last 6 matches)
- Home record this season: W-D-L, goals for/against
- Key players: fitness status and recent performance
- Tactical setup and preferred formation
- Strengths: [analyze attacking patterns, set pieces, defensive solidity]
- Weaknesses: [identify vulnerabilities, injury concerns]
- Motivation level: [European spots, relegation battle, cup progress]

[TEAM B] ASSESSMENT:
- Away form analysis: W-D-L, goals for/against
- Travel distance and midweek fixtures impact
- Historical performance at [TEAM A]'s stadium
- Key player matchups and tactical battles
- Recent transfer activity impact
- Manager's tactical approach for away games

HEAD-TO-HEAD ANALYSIS:
- Last 5 meetings: results, goals, patterns
- Home advantage statistics for [TEAM A]
- Goal timing patterns (early/late goals)
- Disciplinary record in previous meetings

WEATHER & ENVIRONMENTAL FACTORS:
- Current weather forecast and impact on play style
- Pitch conditions and recent maintenance
- Stadium atmosphere and crowd influence
- Kick-off time considerations

MATHEMATICAL MODELING:
Using Poisson distribution and team strength ratings:
- [TEAM A] expected goals: [calculate using recent xG data]
- [TEAM B] expected goals: [calculate using recent xG data]
- Most likely scorelines with probabilities
- Over/Under 2.5 goals probability
- Both Teams to Score probability

BETTING RECOMMENDATIONS:
1. Primary selection with highest EV
2. Alternative markets with positive expected value
3. Combination bets if mathematically justified
4. Risk management suggestions
5. In-play opportunities to monitor

CONFIDENCE RATING: [1-100] based on data quality and model reliability`,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },

  // TENNIS PROMPTS
  {
    id: '3',
    title: 'Tennis Match Analysis - General EV Scanner',
    sport: 'tennis',
    category: 'traditional',
    type: 'general',
    tags: ['surface', 'ranking', 'form', 'head-to-head'],
    content: `🎾 **TENNIS EV SCANNER - PhD Level Analysis**

⏰ **SEARCH FOR TODAY'S OR TOMORROW'S TIPS:**

📅 **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S matches**
2️⃣ **Second priority: Tomorrow's programs**
3️⃣ **Third priority: Next day (only if necessary)**

🏆 **TARGET TOURNAMENTS:**
- ATP Tour events, WTA Tour events
- Grand Slams, ATP/WTA Finals
- Davis Cup/Fed Cup, National competitions

📊 **COMPREHENSIVE ANALYSIS FRAMEWORK:**

**1. PLAYER PERFORMANCE METRICS:**
- Surface-specific analysis (Hard/Clay/Grass win-loss records)
- Current form assessment (last 10 matches)
- Statistical modeling (Elo ratings, service/return efficiency)
- Head-to-head analysis (historical matchups)
- Contextual factors (weather, court conditions, scheduling)

**2. SURFACE-SPECIFIC ANALYSIS:**
- Hard court/Clay/Grass win-loss records
- Surface-specific ranking and performance trends
- Movement and playing style adaptation to surface
- Historical performance at current tournament venue

**3. CURRENT FORM ASSESSMENT:**
- Last 10 matches: W-L record and quality of opposition
- Recent tournament results and progression depth
- Set win/loss ratios and break point conversion
- Physical condition and injury concerns
- Match scheduling and travel fatigue

**4. STATISTICAL MODELING:**
- Elo rating calculations for tennis
- Service game efficiency (hold percentage)
- Return game strength (break percentage)
- Tiebreak performance statistics
- Deciding set record (mental strength indicator)

**5. HEAD-TO-HEAD ANALYSIS:**
- Historical matchup record on all surfaces
- Recent meetings and trend analysis
- Playing style compatibility/conflicts
- Psychological edge assessment

**6. CONTEXTUAL FACTORS:**
- Tournament importance and prize money
- Ranking points implications
- Weather conditions (wind, temperature, humidity)
- Court speed and bounce characteristics
- Time of day and scheduling advantages

**BETTING MARKET EVALUATION:**
For each available market:
- Match winner probabilities using multiple models
- Set betting analysis (2-0, 2-1 scenarios)
- Games handicap calculations
- Total games over/under modeling
- First set winner probability

**ADVANCED METRICS:**
- Service points won percentage differential
- Return points won percentage differential
- Break point conversion rate comparison
- Unforced error rates under pressure
- Net approach success rates

**OUTPUT REQUIREMENTS:**
- **Match prediction with confidence interval**
- **Top 3 highest EV betting opportunities**
- **Risk-adjusted Kelly Criterion stakes**
- **Key performance indicators to monitor live**
- **Potential in-play betting triggers**

**IMPORTANT:** Focus on TODAY'S and TOMORROW'S matches only!`,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },

  // BASKETBALL PROMPTS
  {
    id: '4',
    title: 'Basketball Analysis - General EV Scanner',
    sport: 'basketball',
    category: 'traditional',
    type: 'general',
    tags: ['pace', 'efficiency', 'matchups', 'trends'],
    content: `🏀 **BASKETBALL EV SCANNER - PhD Level Analysis**

⏰ **SEARCH FOR TODAY'S OR TOMORROW'S TIPS:**

📅 **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S matches**
2️⃣ **Second priority: Tomorrow's programs**
3️⃣ **Third priority: Next day (only if necessary)**

🏆 **TARGET LEAGUES:**
- NBA (All teams), EuroLeague, EuroCup
- National leagues (Spain ACB, Italy Lega, etc.)
- All major basketball competitions

📊 **COMPREHENSIVE ANALYSIS FRAMEWORK:**

**1. TEAM EFFICIENCY METRICS:**
- Offensive analysis (Offensive Rating, eFG%, TS%)
- Defensive analysis (Defensive Rating, opponent FG% allowed)
- Pace and style factors (possessions per game, transition efficiency)
- Matchup analysis (size advantages, coaching adjustments)
- Situational factors (conference performance, playoff implications)

**2. OFFENSIVE ANALYSIS:**
- Offensive Rating (points per 100 possessions)
- Effective Field Goal Percentage (eFG%)
- True Shooting Percentage (TS%)
- Turnover Rate and Ball Security
- Offensive Rebounding Percentage
- Free Throw Rate and Efficiency

**3. DEFENSIVE ANALYSIS:**
- Defensive Rating (points allowed per 100 possessions)
- Opponent Field Goal Percentage allowed
- Defensive Rebounding Percentage
- Steal Rate and Forced Turnovers
- Block Rate and Interior Defense
- Perimeter Defense (3-point percentage allowed)

**4. PACE AND STYLE FACTORS:**
- Possessions per game (pace calculation)
- Fast break points and transition efficiency
- Half-court offensive efficiency
- Bench depth and rotation impact
- Fourth quarter performance (clutch situations)

**5. MATCHUP ANALYSIS:**
- Size advantages in frontcourt/backcourt
- Coaching tactical adjustments
- Home court advantage quantification
- Rest days and back-to-back game impact
- Injury report and player availability

**6. SITUATIONAL FACTORS:**
- Conference vs non-conference performance
- Performance against ranked opponents
- Revenge game scenarios
- Playoff implications and motivation
- Travel distance and time zone changes

**STATISTICAL MODELING:**
- Pythagorean expectation for win probability
- Four Factors model (eFG%, TOV%, ORB%, FTR)
- Adjusted efficiency ratings for strength of schedule
- Regression analysis for sustainable performance
- Monte Carlo simulations for score distributions

**BETTING MARKETS ANALYSIS:**
- Point spread efficiency using advanced metrics
- Total points modeling with pace adjustments
- First half vs second half trends
- Quarter-by-quarter scoring patterns
- Player prop correlations and dependencies

**INDOOR SPORT CONSIDERATIONS:**
- No weather impact analysis required
- Focus on venue-specific factors (court dimensions, crowd noise)
- Referee tendencies and foul calling patterns
- Arena altitude effects (if applicable)

**OUTPUT REQUIREMENTS:**
- **Match prediction with confidence percentage**
- **Top 5 highest EV bets ranked by value**
- **Risk assessment for each recommendation**
- **Detailed mathematical reasoning for each selection**
- **Key factors that could invalidate the analysis**

**IMPORTANT:** Focus on TODAY'S and TOMORROW'S games only!`,
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
  },

  // TABLE TENNIS PROMPT
  {
    id: '5',
    title: 'Table Tennis Analysis - General EV Scanner',
    sport: 'table-tennis',
    category: 'traditional',
    type: 'general',
    tags: ['ranking', 'form', 'playing-style', 'head-to-head'],
    content: `PROFESSIONAL TABLE TENNIS BETTING ANALYSIS:

PLAYER PERFORMANCE ASSESSMENT:
1. RANKING AND FORM ANALYSIS:
   - Current world ranking and recent movement
   - Tournament-specific ranking (if applicable)
   - Recent match results and win-loss streaks
   - Performance against similar-ranked opponents
   - Consistency in major tournaments vs smaller events

2. PLAYING STYLE COMPATIBILITY:
   - Offensive vs Defensive playing styles
   - Forehand vs Backhand dominance
   - Serve and return game effectiveness
   - Adaptation to different ball types and speeds
   - Performance under pressure situations

3. PHYSICAL AND MENTAL FACTORS:
   - Age and experience level
   - Fitness and endurance in long matches
   - Mental toughness in deciding games
   - Performance in tiebreak situations (deuce games)
   - Recovery between matches in tournaments

4. HEAD-TO-HEAD ANALYSIS:
   - Historical matchup record
   - Recent meetings and trend analysis
   - Performance in different tournament settings
   - Psychological advantages or disadvantages

5. TOURNAMENT CONTEXT:
   - Importance of tournament (ranking points, prize money)
   - Stage of tournament (early rounds vs later stages)
   - Match scheduling and rest time
   - Home advantage (if applicable)

STATISTICAL MODELING:
- Elo rating system adapted for table tennis
- Point-by-point win probability calculations
- Set and match win probability modeling
- Service game advantage quantification
- Break point (game point) conversion rates

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Set betting analysis (3-0, 3-1, 3-2 scenarios)
- Total sets over/under calculations
- Handicap betting opportunities
- First set winner probability

INDOOR SPORT FACTORS:
- Hall conditions (lighting, temperature, humidity)
- Table and ball specifications
- Crowd noise and atmosphere impact
- Referee and umpire tendencies
- Equipment preferences and adaptability

RISK MANAGEMENT:
- Confidence intervals for predictions
- Kelly Criterion stake calculations
- Correlation between different betting markets
- Live betting opportunities and triggers
- Bankroll allocation recommendations`,
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },

  // FORMULA 1 PROMPT
  {
    id: '6',
    title: 'Formula 1 Race Analysis - General EV Scanner',
    sport: 'formula1',
    category: 'racing',
    type: 'general',
    tags: ['qualifying', 'weather', 'strategy', 'reliability'],
    content: `COMPREHENSIVE FORMULA 1 BETTING ANALYSIS:

QUALIFYING AND GRID POSITION ANALYSIS:
1. QUALIFYING PERFORMANCE:
   - Pole position conversion rate to race wins
   - Q1, Q2, Q3 progression patterns
   - Wet vs dry qualifying performance
   - Track-specific qualifying advantages
   - Tire strategy impact on grid position

2. RACE PACE ANALYSIS:
   - Long run pace from practice sessions
   - Tire degradation rates by compound
   - Fuel-adjusted lap times
   - Sector-by-sector performance analysis
   - DRS effectiveness at specific circuits

3. WEATHER IMPACT ASSESSMENT:
   - Current weather forecast and probability of rain
   - Driver wet weather performance history
   - Team rain setup and strategy effectiveness
   - Safety car probability in wet conditions
   - Tire strategy flexibility in changing conditions

4. STRATEGIC FACTORS:
   - Pit stop window optimization
   - Undercut vs overcut opportunities
   - Two-stop vs three-stop strategy viability
   - Safety car timing impact on strategies
   - DRS train formation and overtaking difficulty

5. RELIABILITY AND TECHNICAL FACTORS:
   - Power unit reliability by manufacturer
   - Recent technical failures and patterns
   - Upgrade packages and performance impact
   - Suspension setup for track characteristics
   - Brake cooling and tire temperature management

DRIVER AND TEAM ASSESSMENT:
- Championship position and motivation
- Recent form and confidence levels
- Track-specific historical performance
- Team mate battle dynamics
- Pressure handling in crucial moments

CIRCUIT-SPECIFIC ANALYSIS:
- Overtaking opportunities and difficulty
- Track evolution throughout the weekend
- Altitude effects (if applicable)
- Track temperature impact on tire performance
- Historical race patterns and statistics

BETTING MARKETS EVALUATION:
- Race winner probability calculations
- Podium finish probabilities
- Points finish expectations
- Fastest lap opportunities
- Constructor championship implications

ADVANCED STATISTICAL MODELING:
- Monte Carlo race simulations
- Pit stop strategy optimization models
- Weather probability impact calculations
- Safety car frequency analysis
- DNF (Did Not Finish) probability assessment

RISK FACTORS:
- First corner incident probability
- Mechanical failure likelihood
- Weather change impact on strategies
- Penalty implications from qualifying
- Track limits and steward decisions`,
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
  },

  // DOTA 2 PROMPT
  {
    id: '7',
    title: 'Dota 2 Match Analysis - General EV Scanner',
    sport: 'dota2',
    category: 'esports',
    type: 'general',
    tags: ['meta', 'drafting', 'form', 'head-to-head'],
    content: `PROFESSIONAL DOTA 2 BETTING ANALYSIS:

TEAM PERFORMANCE METRICS:
1. CURRENT FORM ANALYSIS:
   - Recent match results (last 10 games)
   - Win rate on current patch
   - Performance against tier 1/2/3 teams
   - Tournament progression and consistency
   - Map win percentage and series records

2. META AND DRAFTING ANALYSIS:
   - Current patch meta understanding
   - Hero pool depth and flexibility
   - Drafting phase win rates (first pick advantage)
   - Comfort picks and signature heroes
   - Ban phase strategy effectiveness
   - Counter-picking ability and adaptation

3. PLAYER INDIVIDUAL PERFORMANCE:
   - Core players (carry, mid, offlane) recent form
   - Support duo coordination and impact
   - KDA ratios and damage per minute
   - Farming efficiency and map control
   - Clutch performance in high-pressure situations

4. TACTICAL ANALYSIS:
   - Early game aggression vs late game scaling
   - Objective control (Roshan, towers, barracks)
   - Team fight execution and positioning
   - Map movement and vision control
   - Comeback potential and mental resilience

5. HEAD-TO-HEAD MATCHUP:
   - Historical series record
   - Recent meetings and performance trends
   - Playing style compatibility/conflicts
   - Psychological advantages or momentum

CONTEXTUAL FACTORS:
- Tournament importance and prize pool
- Elimination stakes vs group stage
- Jet lag and travel considerations
- Roster changes and team chemistry
- Coaching staff impact and preparation time

STATISTICAL MODELING:
- Elo rating system for Dota 2 teams
- Win probability based on draft composition
- Game length prediction models
- First blood and early game advantage impact
- Comeback probability calculations

BETTING MARKETS EVALUATION:
- Match winner (Bo1, Bo3, Bo5 analysis)
- Map handicap betting opportunities
- Total maps over/under calculations
- First blood and first tower markets
- Tournament outright winner assessment

INDOOR ESPORTS CONSIDERATIONS:
- LAN vs online performance differences
- Stage experience and crowd pressure
- Technical setup and equipment familiarity
- Communication clarity in tournament environment
- Referee and admin decision consistency

ADVANCED METRICS:
- Draft win probability algorithms
- Hero synergy and counter-pick matrices
- Economic advantage conversion rates
- High ground defense success rates
- Late game scaling coefficients

RISK MANAGEMENT:
- Upset probability assessment
- Live betting opportunities during draft
- Correlation between different betting markets
- Bankroll allocation for esports volatility
- Tournament format impact on strategies`,
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
  },

  // BOXING PROMPT
  {
    id: '8',
    title: 'Boxing Match Analysis - General EV Scanner',
    sport: 'boxing',
    category: 'traditional',
    type: 'general',
    tags: ['styles', 'power', 'reach', 'experience'],
    content: `COMPREHENSIVE BOXING MATCH ANALYSIS:

FIGHTER ASSESSMENT:
1. PHYSICAL ATTRIBUTES:
   - Height, reach, and stance advantages
   - Weight cutting history and impact
   - Age and career longevity factors
   - Injury history and recovery patterns
   - Physical conditioning and training camp reports

2. TECHNICAL SKILLS ANALYSIS:
   - Boxing fundamentals (jab, footwork, defense)
   - Power punching ability and knockout ratio
   - Combination punching effectiveness
   - Counter-punching skills and timing
   - Ring IQ and tactical adaptability

3. FIGHTING STYLE COMPATIBILITY:
   - Orthodox vs Southpaw matchup dynamics
   - Pressure fighter vs boxer-mover styles
   - Inside fighting vs outside boxing
   - Defensive shell vs aggressive offense
   - Stamina and pace management

4. RECENT FORM AND ACTIVITY:
   - Last 5 fight results and performances
   - Quality of recent opposition
   - Ring rust from inactivity
   - Training camp quality and preparation
   - Sparring partner reports and insights

5. PSYCHOLOGICAL FACTORS:
   - Mental toughness and heart
   - Performance under pressure
   - Crowd support and home advantage
   - Confidence levels and motivation
   - Historical performance in big fights

CONTEXTUAL ANALYSIS:
- Championship implications and stakes
- Purse size and financial motivation
- Promotional politics and judging concerns
- Venue atmosphere and crowd influence
- Television audience and pressure

STATISTICAL MODELING:
- CompuBox punch statistics analysis
- Knockdown and knockout probability
- Round-by-round scoring predictions
- Decision outcome probability (UD, MD, SD)
- Stoppage timing probability distribution

BETTING MARKETS EVALUATION:
- Fight winner probability assessment
- Method of victory analysis (KO, TKO, Decision)
- Round betting and stoppage timing
- Over/under total rounds calculations
- Knockdown and point deduction markets

INDOOR VENUE CONSIDERATIONS:
- Arena size and crowd proximity
- Lighting and visibility factors
- Ring size and rope tension
- Referee tendencies and style preferences
- Judging panel composition and history

ADVANCED METRICS:
- Punch accuracy and defense percentages
- Body shot vs head shot effectiveness
- Pressure and aggression scoring impact
- Championship round performance (9-12)
- Comeback ability from adversity

RISK ASSESSMENT:
- Upset probability calculations
- Live betting opportunities between rounds
- Correlation between different prop bets
- Judging controversy potential
- Medical stoppage probability`,
    createdAt: '2024-01-15T13:30:00Z',
    updatedAt: '2024-01-15T13:30:00Z',
  },

  // GOLF PROMPT
  {
    id: '9',
    title: 'Golf Tournament Analysis - General EV Scanner',
    sport: 'golf',
    category: 'traditional',
    type: 'general',
    tags: ['course', 'weather', 'form', 'statistics'],
    content: `PROFESSIONAL GOLF BETTING ANALYSIS:

PLAYER PERFORMANCE ASSESSMENT:
1. RECENT FORM ANALYSIS:
   - Last 10 tournament results and trends
   - Strokes gained statistics (tee-to-green, putting)
   - Scoring average and consistency
   - Cut-making percentage and reliability
   - Performance in similar field strength events

2. COURSE-SPECIFIC FACTORS:
   - Historical performance at venue
   - Course setup and design preferences
   - Length requirements and driving distance
   - Green complexity and putting skills needed
   - Rough thickness and recovery shot ability

3. STATISTICAL MODELING:
   - Strokes gained approach shots
   - Driving accuracy vs distance trade-offs
   - Putting performance on similar green speeds
   - Sand save percentage and short game
   - Scoring in different wind conditions

4. WEATHER IMPACT ANALYSIS:
   - Wind speed and direction forecasts
   - Temperature effects on ball flight
   - Rain probability and course conditions
   - Morning vs afternoon wave advantages
   - Seasonal performance patterns

5. PHYSICAL AND MENTAL FACTORS:
   - Travel and time zone adjustments
   - Injury concerns and physical limitations
   - Pressure performance in contention
   - Major championship experience
   - Confidence levels and momentum

FIELD STRENGTH EVALUATION:
- World ranking distribution analysis
- Head-to-head matchup assessments
- Course horses vs first-time players
- Local knowledge advantages
- Sponsor exemptions and motivation levels

TOURNAMENT CONTEXT:
- Prize money and FedEx Cup points
- Major championship implications
- Ryder Cup or Presidents Cup selection
- End of season positioning
- Sponsor obligations and distractions

BETTING MARKETS ANALYSIS:
- Outright winner probability calculations
- Top 5/10/20 finish expectations
- Head-to-head matchup assessments
- First round leader opportunities
- Cut line predictions and making/missing cut

COURSE CONDITIONS MODELING:
- Pin position difficulty analysis
- Rough height and penalty areas
- Green speed and slope considerations
- Tee box positioning and hole length
- Weather-adjusted scoring expectations

ADVANCED METRICS:
- Proximity to hole from various distances
- Scrambling percentage and recovery ability
- Birdie conversion rates from different positions
- Bogey avoidance and damage limitation
- Clutch performance under pressure

OUTDOOR SPORT WEATHER FACTORS:
- Detailed hourly weather forecasts
- Wind pattern analysis and hole-by-hole impact
- Temperature swings and equipment adjustments
- Precipitation probability and course drainage
- UV index and heat stress considerations

RISK MANAGEMENT:
- Each-way betting value assessment
- Live betting opportunities during rounds
- Correlation between different betting markets
- Withdrawal and injury risk factors
- Tournament format and playoff implications`,
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
  },

  // MOTOGP PROMPT
  {
    id: '10',
    title: 'MotoGP Race Analysis - General EV Scanner',
    sport: 'motogp',
    category: 'racing',
    type: 'general',
    tags: ['qualifying', 'weather', 'tires', 'setup'],
    content: `COMPREHENSIVE MOTOGP RACE ANALYSIS:

QUALIFYING AND GRID ANALYSIS:
1. QUALIFYING PERFORMANCE:
   - Pole position conversion rate to race wins
   - Q1 vs Q2 progression patterns
   - Wet vs dry qualifying specialists
   - Track-specific qualifying advantages
   - Tire strategy in qualifying sessions

2. RACE PACE ASSESSMENT:
   - Free practice long run analysis
   - Tire degradation patterns by compound
   - Fuel consumption and weight impact
   - Sector-by-sector competitive analysis
   - Consistency over race distance

3. WEATHER IMPACT EVALUATION:
   - Current weather forecast and rain probability
   - Rider wet weather performance history
   - Bike setup adaptability to conditions
   - Tire choice strategy in mixed conditions
   - Safety and risk tolerance in wet races

4. TECHNICAL AND SETUP FACTORS:
   - Chassis and engine package competitiveness
   - Aerodynamic efficiency at specific tracks
   - Suspension setup for track characteristics
   - Brake performance and cooling requirements
   - Electronics package optimization

5. RIDER PERFORMANCE METRICS:
   - Championship position and motivation
   - Recent form and confidence levels
   - Track-specific historical performance
   - Physical fitness and injury status
   - Mental pressure handling ability

CIRCUIT-SPECIFIC ANALYSIS:
- Overtaking opportunities and difficulty
- Track evolution throughout weekend
- Altitude effects on engine performance
- Track temperature impact on tire choice
- Historical race patterns and statistics

STRATEGIC CONSIDERATIONS:
- Tire allocation and compound selection
- Fuel strategy and consumption rates
- Risk vs reward in championship context
- Team orders and manufacturer priorities
- Weather contingency planning

BETTING MARKETS EVALUATION:
- Race winner probability calculations
- Podium finish probabilities
- Points finish expectations
- Fastest lap opportunities
- Constructor championship implications

ADVANCED STATISTICAL MODELING:
- Monte Carlo race simulations
- Tire strategy optimization models
- Weather probability impact calculations
- Crash and DNF probability assessment
- Lap time degradation modeling

OUTDOOR RACING WEATHER FACTORS:
- Detailed track temperature forecasts
- Wind speed and direction impact
- Rain probability and intensity predictions
- Track drying time calculations
- Grip level evolution throughout race

RISK FACTORS:
- First corner incident probability
- Mechanical failure likelihood
- Weather change impact on strategies
- Penalty implications from qualifying
- Championship pressure decision making

MOTORCYCLE-SPECIFIC CONSIDERATIONS:
- Rider physical demands and endurance
- Bike handling characteristics
- Tire warming and temperature windows
- Slipstream and drafting effectiveness
- Corner speed vs straight line speed trade-offs`,
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
  },

  // VOLLEYBALL PROMPT
  {
    id: '11',
    title: 'Volleyball Match Analysis - General EV Scanner',
    sport: 'volleyball',
    category: 'traditional',
    type: 'general',
    tags: ['rotation', 'serving', 'blocking', 'momentum'],
    content: `PROFESSIONAL VOLLEYBALL BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. TECHNICAL SKILLS ANALYSIS:
   - Attack efficiency percentage and kill rates
   - Blocking effectiveness and stuff blocks per set
   - Serving accuracy and ace-to-error ratio
   - Reception quality and passing grades
   - Setting distribution and tempo variations
   - Defensive dig percentage and floor coverage

2. ROTATION AND LINEUP ANALYSIS:
   - Starting six effectiveness in each rotation
   - Substitution patterns and specialist usage
   - Libero impact on defensive stability
   - Opposite hitter vs middle blocker matchups
   - Outside hitter consistency across rotations
   - Setter leadership and court management

3. MOMENTUM AND PSYCHOLOGICAL FACTORS:
   - Set-by-set performance patterns
   - Response to adversity and comeback ability
   - Timeout usage effectiveness
   - Crowd influence and home court advantage
   - Pressure performance in deciding sets
   - Mental toughness in close point situations

4. STATISTICAL MODELING:
   - Point-by-point win probability calculations
   - Set win probability based on current score
   - Service rotation advantage analysis
   - Side-out efficiency modeling
   - Terminal serve impact on momentum
   - Rally length distribution analysis

5. MATCH FORMAT CONSIDERATIONS:
   - Best-of-3 vs Best-of-5 performance
   - Deciding set (5th set) historical performance
   - Fatigue factors in longer matches
   - Bench depth and rotation flexibility
   - Injury management and player load

INDOOR SPORT FACTORS:
- Court surface and net height specifications
- Ceiling height and lighting conditions
- Temperature and humidity control
- Crowd noise impact on communication
- Referee consistency and call tendencies
- Arena acoustics and player concentration

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Set handicap calculations (-1.5, +1.5)
- Total sets over/under modeling
- First set winner probability
- Exact set score predictions (3-0, 3-1, 3-2)

ADVANCED METRICS:
- Side-out percentage differential
- Point scoring efficiency in each rotation
- Break point conversion rates
- Service pressure effectiveness
- Transition attack success rates
- Emergency ball handling efficiency`,
    createdAt: '2024-01-15T15:00:00Z',
    updatedAt: '2024-01-15T15:00:00Z',
  },

  // HANDBALL PROMPT
  {
    id: '12',
    title: 'Handball Match Analysis - General EV Scanner',
    sport: 'handball',
    category: 'traditional',
    type: 'general',
    tags: ['fast-break', 'defense', 'goalkeeper', 'physicality'],
    content: `COMPREHENSIVE HANDBALL BETTING ANALYSIS:

TEAM TACTICAL ANALYSIS:
1. OFFENSIVE SYSTEMS:
   - 6-0 attack formation effectiveness
   - 5-1 and 4-2 offensive variations
   - Fast break conversion percentage
   - Set play execution from throw-ins
   - Wing player utilization and crossing
   - Pivot play and inside scoring efficiency

2. DEFENSIVE FORMATIONS:
   - 6-0 defense stability and coverage
   - 5-1 defense with advanced defender
   - 3-2-1 defense against strong pivots
   - Man-to-man marking effectiveness
   - Pressing defense and turnover creation
   - Transition defense speed and organization

3. GOALKEEPER PERFORMANCE:
   - Save percentage against different shot types
   - Penalty save rate and psychological impact
   - Distribution quality and fast break initiation
   - Communication and defensive organization
   - Performance under pressure situations
   - Substitution timing and dual goalkeeper systems

4. PHYSICAL AND CONDITIONING FACTORS:
   - Match intensity and pace sustainability
   - Injury history and player durability
   - Bench depth and rotation strategies
   - Fatigue impact on shooting accuracy
   - Physical matchups and size advantages
   - Recovery time between matches

5. STATISTICAL MODELING:
   - Goal scoring rate per possession
   - Shooting efficiency from different positions
   - Turnover rate and ball security
   - Penalty conversion rates
   - Two-minute suspension impact
   - Home advantage quantification

INDOOR SPORT CONSIDERATIONS:
- Court surface grip and player movement
- Goal size standardization and shooting angles
- Crowd proximity and noise impact
- Referee interpretation consistency
- Climate control and playing conditions
- Arena layout and bench positioning

BETTING MARKETS ANALYSIS:
- Match winner with handicap options
- Total goals over/under calculations
- Half-time/full-time double results
- Winning margin predictions
- Both teams to score X+ goals
- Player performance props (goals, assists)

ADVANCED PERFORMANCE METRICS:
- Possession efficiency and ball retention
- Counter-attack success percentage
- Set piece conversion rates
- Disciplinary record and suspension impact
- Clutch performance in final minutes
- Head-to-head tactical matchup history`,
    createdAt: '2024-01-15T15:30:00Z',
    updatedAt: '2024-01-15T15:30:00Z',
  },

  // SNOOKER PROMPT
  {
    id: '13',
    title: 'Snooker Match Analysis - General EV Scanner',
    sport: 'snooker',
    category: 'traditional',
    type: 'general',
    tags: ['break-building', 'safety', 'pressure', 'consistency'],
    content: `PROFESSIONAL SNOOKER BETTING ANALYSIS:

PLAYER TECHNICAL ASSESSMENT:
1. BREAK-BUILDING ABILITY:
   - Century break frequency and consistency
   - 50+ break percentage and scoring rate
   - Long potting accuracy and confidence
   - Positional play and cue ball control
   - Color ball clearance success rate
   - Maximum break potential and big break history

2. SAFETY PLAY AND TACTICAL AWARENESS:
   - Safety shot effectiveness and snooker creation
   - Defensive mindset and patience levels
   - Escape shot quality under pressure
   - Table management and frame control
   - Risk assessment in shot selection
   - Tactical fouling and strategic thinking

3. PRESSURE PERFORMANCE:
   - Performance in deciding frames
   - Clearance ability when trailing
   - Bottle job tendency analysis
   - Big match temperament and experience
   - Crowd pressure handling
   - Television match performance vs practice

4. CURRENT FORM FACTORS:
   - Recent tournament results and progression
   - Practice match reports and confidence
   - Physical condition and stamina levels
   - Mental state and motivation assessment
   - Cue action consistency and timing
   - Table pace adaptation ability

5. MATCH FORMAT CONSIDERATIONS:
   - Best-of-X frame performance patterns
   - Session play vs continuous play preference
   - Interval break impact on momentum
   - Frame-by-frame scoring patterns
   - Comeback ability from deficit positions
   - Closing out matches when ahead

INDOOR VENUE FACTORS:
- Table condition and cloth speed
- Lighting quality and shadow elimination
- Temperature control and humidity
- Crowd noise and atmosphere impact
- Camera positioning and player comfort
- Referee consistency and shot calling

STATISTICAL MODELING:
- Frame win probability calculations
- Points per visit average analysis
- First visit advantage quantification
- Safety exchange outcome modeling
- Foul and miss rule impact assessment
- Session scoring pattern analysis

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Frame handicap calculations
- Total frames over/under modeling
- Highest break predictions
- Century break occurrence probability
- Session betting opportunities

PSYCHOLOGICAL FACTORS:
- Head-to-head record and mental edge
- Ranking pressure and expectations
- Prize money motivation levels
- Career stage and hunger assessment
- Recent controversy or confidence issues
- Playing style compatibility analysis`,
    createdAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
  },

  // MMA PROMPT
  {
    id: '14',
    title: 'MMA Fight Analysis - General EV Scanner',
    sport: 'mma',
    category: 'traditional',
    type: 'general',
    tags: ['grappling', 'striking', 'cardio', 'weight-cut'],
    content: `COMPREHENSIVE MMA FIGHT ANALYSIS:

FIGHTER SKILL SET EVALUATION:
1. STRIKING ANALYSIS:
   - Stand-up technique and boxing fundamentals
   - Kick boxing and Muay Thai proficiency
   - Power punching and knockout ability
   - Striking defense and head movement
   - Clinch work and dirty boxing
   - Counter-striking and timing accuracy

2. GRAPPLING ASSESSMENT:
   - Wrestling credentials and takedown ability
   - Takedown defense and sprawl technique
   - Brazilian Jiu-Jitsu belt level and submission skills
   - Ground control and positional advancement
   - Submission defense and escape ability
   - Ground and pound effectiveness

3. PHYSICAL ATTRIBUTES:
   - Height, reach, and physical advantages
   - Weight cutting history and impact
   - Cardio conditioning and gas tank
   - Injury history and durability concerns
   - Age and career longevity factors
   - Recovery ability between rounds

4. FIGHT IQ AND ADAPTABILITY:
   - Game planning and tactical preparation
   - In-fight adjustments and coaching response
   - Pressure handling and composure
   - Cage awareness and positioning
   - Rule understanding and referee interaction
   - Experience in championship rounds

5. RECENT FORM AND ACTIVITY:
   - Last 5 fight results and performance quality
   - Training camp reports and preparation
   - Sparring partner quality and feedback
   - Injury concerns and medical clearance
   - Motivation levels and career goals
   - Weight management and cutting issues

MATCHUP ANALYSIS:
- Style vs style compatibility assessment
- Strengths vs weaknesses exploitation
- Historical performance against similar opponents
- Reach and size advantage implications
- Orthodox vs southpaw considerations
- Experience level differential impact

INDOOR VENUE CONSIDERATIONS:
- Octagon vs cage size differences
- Altitude effects on cardio performance
- Crowd support and home advantage
- Commission rules and referee assignments
- Drug testing protocols and compliance
- Venue atmosphere and pressure levels

STATISTICAL MODELING:
- Significant strikes landed per minute
- Takedown accuracy and defense percentages
- Submission attempt and success rates
- Knockdown and knockout probability
- Decision outcome likelihood
- Round-by-round scoring predictions

BETTING MARKETS EVALUATION:
- Fight winner probability calculations
- Method of victory analysis (KO, Sub, Decision)
- Round betting and finish timing
- Over/under total rounds modeling
- Performance bonus probability assessment
- Live betting opportunities between rounds

ADVANCED METRICS:
- Striking accuracy and defense percentages
- Control time and ground position dominance
- Damage inflicted vs damage absorbed
- Pace and pressure application
- Championship round performance (4-5)
- Comeback ability from adversity`,
    createdAt: '2024-01-15T16:30:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
  },

  // RUGBY PROMPT
  {
    id: '15',
    title: 'Rugby Match Analysis - General EV Scanner',
    sport: 'rugby',
    category: 'traditional',
    type: 'general',
    tags: ['scrum', 'lineout', 'weather', 'physicality'],
    content: `COMPREHENSIVE RUGBY MATCH ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. FORWARD PACK ANALYSIS:
   - Scrum dominance and hooking accuracy
   - Lineout throwing precision and lifting
   - Ruck and maul effectiveness
   - Driving maul success rate
   - Breakdown work and turnovers won
   - Physical dominance and set piece control

2. BACKLINE EVALUATION:
   - Attacking structure and phase play
   - Defensive line speed and organization
   - Kicking game and territorial control
   - Handling skills and offloading ability
   - Counter-attacking from deep positions
   - Wing finishing and try-scoring ability

3. TACTICAL APPROACH:
   - Game plan execution and adaptability
   - Territory vs possession balance
   - Penalty discipline and card avoidance
   - Substitution timing and impact
   - Captain leadership and decision making
   - Referee management and communication

4. PHYSICAL AND CONDITIONING:
   - Fitness levels and endurance capacity
   - Injury list and player availability
   - Squad depth and rotation policy
   - Recovery time between matches
   - Travel fatigue and time zone impact
   - Altitude adjustment (if applicable)

5. RECENT FORM ANALYSIS:
   - Last 6 match results and performance
   - Home vs away form differential
   - Performance against similar opposition
   - Scoring patterns and defensive solidity
   - Discipline record and penalty count
   - Bonus point accumulation rate

WEATHER IMPACT ASSESSMENT:
- Wind speed and direction effects on kicking
- Rain probability and handling conditions
- Temperature impact on player performance
- Pitch condition and surface quality
- Visibility and lighting considerations
- Historical performance in similar conditions

STATISTICAL MODELING:
- Try scoring rate and defensive efficiency
- Conversion and penalty kick success rates
- Possession percentage and territory control
- Lineout success rate differential
- Scrum penalty count and dominance
- Turnover creation and ball retention

BETTING MARKETS EVALUATION:
- Match winner with handicap options
- Total points over/under calculations
- First try scorer and anytime try markets
- Half-time/full-time double results
- Winning margin predictions
- Card betting and disciplinary markets

OUTDOOR SPORT WEATHER FACTORS:
- Detailed wind pattern analysis
- Precipitation probability and intensity
- Temperature effects on ball handling
- Pitch drainage and surface conditions
- Sun position and visibility impact
- Historical weather performance data

ADVANCED PERFORMANCE METRICS:
- Meters gained per carry
   - Tackle success rate and missed tackles
   - Ruck arrival speed and effectiveness
   - Kicking accuracy from different positions
   - Penalty goal success rate by distance
   - Defensive line break frequency`,
    createdAt: '2024-01-15T17:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
  },

  // DARTS PROMPT
  {
    id: '16',
    title: 'Darts Match Analysis - General EV Scanner',
    sport: 'darts',
    category: 'traditional',
    type: 'general',
    tags: ['checkout', 'average', 'pressure', 'consistency'],
    content: `PROFESSIONAL DARTS BETTING ANALYSIS:

PLAYER PERFORMANCE METRICS:
1. SCORING CONSISTENCY:
   - Three-dart average and sustainability
   - 180 frequency and maximum scoring
   - Ton-plus percentage (100+ scores)
   - First nine dart average importance
   - Scoring under pressure situations
   - Consistency across different sessions

2. FINISHING ABILITY:
   - Checkout percentage on doubles
   - High finish capability (100+ checkouts)
   - Favorite double preferences and accuracy
   - Pressure finishing in deciding legs
   - Bogey numbers and weakness identification
   - Match dart conversion rate

3. MENTAL STRENGTH ASSESSMENT:
   - Performance in deciding sets/legs
   - Comeback ability from deficit positions
   - Bottle job tendency analysis
   - Crowd pressure handling capability
   - Television match vs floor tournament performance
   - Big stage experience and composure

4. CURRENT FORM FACTORS:
   - Recent tournament results and averages
   - Practice form reports and confidence
   - Physical condition and throwing consistency
   - Equipment changes and dart setup
   - Personal life stability and focus
   - Motivation levels and career goals

5. MATCH FORMAT CONSIDERATIONS:
   - Best-of-X sets/legs performance patterns
   - Short format vs long format preference
   - Session play vs continuous play adaptation
   - Break timing impact on rhythm
   - Format-specific tactical adjustments
   - Stamina and concentration maintenance

INDOOR VENUE FACTORS:
- Oche conditions and board setup quality
- Lighting consistency and shadow elimination
- Temperature control and air circulation
- Crowd noise and atmosphere impact
- Stage layout and player comfort zones
- Camera positioning and distraction levels

STATISTICAL MODELING:
- Leg win probability calculations
- Average required for set/match victory
- Checkout probability from different scores
- First dart advantage quantification
- Break of throw frequency analysis
- Match length prediction modeling

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Set/leg handicap calculations
- Total sets/legs over/under modeling
- Highest checkout predictions
- 180 count betting opportunities
- Method of victory analysis

PSYCHOLOGICAL FACTORS:
- Head-to-head record and mental edge
- Ranking pressure and expectations
- Prize money motivation assessment
- Recent controversy or confidence issues
- Playing style compatibility analysis
- Crowd favorite vs underdog mentality

ADVANCED METRICS:
- Doubles hit rate by position on board
- Scoring distribution and consistency
- Throw rhythm and timing analysis
- Recovery rate from poor visits
- Pressure situation performance data
- Tournament progression patterns`,
    createdAt: '2024-01-15T17:30:00Z',
    updatedAt: '2024-01-15T17:30:00Z',
  },

  // NASCAR PROMPT
  {
    id: '17',
    title: 'NASCAR Race Analysis - General EV Scanner',
    sport: 'nascar',
    category: 'racing',
    type: 'general',
    tags: ['qualifying', 'weather', 'strategy', 'drafting'],
    content: `COMPREHENSIVE NASCAR RACE ANALYSIS:

QUALIFYING AND STARTING POSITION:
1. QUALIFYING PERFORMANCE:
   - Single lap speed and track position
   - Qualifying trim vs race setup balance
   - Historical qualifying to finish correlation
   - Weather impact on qualifying conditions
   - Impound rules and setup limitations
   - Starting position strategy implications

2. TRACK-SPECIFIC FACTORS:
   - Superspeedway vs short track vs road course
   - Banking angle and racing groove width
   - Track surface age and grip levels
   - Pit road length and pit strategy impact
   - Caution frequency and restart importance
   - Historical race winner starting positions

3. WEATHER IMPACT ASSESSMENT:
   - Temperature effects on tire performance
   - Wind speed and direction impact on handling
   - Rain probability and race postponement
   - Track temperature and grip evolution
   - Humidity effects on engine performance
   - Sun angle and visibility considerations

4. DRIVER AND TEAM ANALYSIS:
   - Recent form and confidence levels
   - Track-specific historical performance
   - Crew chief strategy and pit crew speed
   - Equipment package and manufacturer
   - Playoff implications and points situation
   - Risk tolerance and racing aggression

5. STRATEGIC CONSIDERATIONS:
   - Fuel mileage strategy and tank capacity
   - Tire strategy and compound selection
   - Caution timing and wave-around benefits
   - Stage racing strategy and points
   - Drafting partnerships and alliances
   - Late race positioning and track position

OUTDOOR RACING WEATHER FACTORS:
- Detailed hourly weather forecasts
- Track temperature monitoring and trends
- Wind pattern analysis and aerodynamic impact
- Precipitation probability and radar tracking
- Atmospheric pressure effects on performance
- Historical weather performance correlations

STATISTICAL MODELING:
- Lap leader analysis and dominance factors
- Caution frequency prediction models
- Fuel mileage calculation and strategy
- Tire degradation and pit window optimization
- Drafting effectiveness and pack racing
- Accident probability and safety ratings

BETTING MARKETS EVALUATION:
- Race winner probability calculations
- Top 3/5/10 finish expectations
- Head-to-head driver matchups
- Pole position and qualifying markets
   - Manufacturer championship implications
   - Stage winner betting opportunities

ADVANCED PERFORMANCE METRICS:
- Average running position and consistency
- Lead lap percentage and competitiveness
- Pit stop performance and track position gain
- Restart performance and aggression level
- Damage avoidance and finishing rate
- Clutch performance in elimination races`,
    createdAt: '2024-01-15T18:00:00Z',
    updatedAt: '2024-01-15T18:00:00Z',
  },

  // GREYHOUND RACING PROMPT
  {
    id: '18',
    title: 'Greyhound Racing Analysis - General EV Scanner',
    sport: 'greyhound-racing',
    category: 'racing',
    type: 'general',
    tags: ['trap', 'form', 'track', 'going'],
    content: `PROFESSIONAL GREYHOUND RACING ANALYSIS:

GREYHOUND PERFORMANCE ASSESSMENT:
1. RECENT FORM ANALYSIS:
   - Last 6 race results and sectional times
   - Consistency of performance levels
   - Improvement or decline trends
   - Class level and grade progression
   - Seasonal form patterns and peaks
   - Recovery time between races

2. TRACK AND DISTANCE FACTORS:
   - Track-specific performance history
   - Distance preference and stamina
   - Bend running and rail position
   - Track surface and going conditions
   - Left-hand vs right-hand track preference
   - Track circumference and turn radius

3. TRAP POSITION ANALYSIS:
   - Historical trap draw performance
   - Early pace and break speed
   - Crowding avoidance and clear runs
   - Inside vs outside trap advantages
   - Trap-specific win percentages
   - Break speed and early positioning

4. PHYSICAL CONDITION:
   - Weight consistency and fitness levels
   - Injury history and soundness
   - Age factors and career stage
   - Seasonal coat condition
   - Veterinary reports and clearances
   - Training intensity and preparation

5. RACING STYLE AND TACTICS:
   - Early pace vs finishing kick
   - Rail running vs wide running preference
   - Crowding tolerance and traffic handling
   - Bend negotiation and cornering ability
   - Stamina distribution over distance
   - Response to pressure and challenges

TRACK CONDITIONS ASSESSMENT:
- Going description (fast, good, slow, heavy)
- Weather impact on track surface
- Recent maintenance and track preparation
- Watering schedule and surface moisture
- Temperature effects on performance
- Wind direction and strength impact

STATISTICAL MODELING:
- Sectional time analysis and speed ratings
- Class par times and performance ratings
- Trap bias analysis and positional advantages
- Win strike rate and place percentages
- Distance-specific performance metrics
- Trainer and kennel form analysis

BETTING MARKETS EVALUATION:
- Win probability calculations by trap
- Place and show betting opportunities
- Exacta and trifecta combination analysis
- Trap challenge and position betting
- Match betting between selected dogs
- Forecast and tricast value assessment

OUTDOOR RACING WEATHER FACTORS:
- Temperature impact on performance
- Wind speed and direction effects
- Humidity and atmospheric pressure
- Track drainage and surface conditions
- Visibility and lighting considerations
- Historical weather performance data

ADVANCED PERFORMANCE METRICS:
- Speed figures and time comparisons
- Sectional time breakdown analysis
- Bend time and straight speed ratios
- Consistency ratings and reliability
- Class drop/rise performance impact
- Trainer strike rates and kennel form`,
    createdAt: '2024-01-15T18:30:00Z',
    updatedAt: '2024-01-15T18:30:00Z',
  },

  // HORSE RACING PROMPT
  {
    id: '19',
    title: 'Horse Racing Analysis - General EV Scanner',
    sport: 'horse-racing',
    category: 'racing',
    type: 'general',
    tags: ['form', 'jockey', 'track', 'going', 'breeding'],
    content: `COMPREHENSIVE HORSE RACING BETTING ANALYSIS:

HORSE PERFORMANCE ASSESSMENT:
1. RECENT FORM ANALYSIS:
   - Last 6 race results and finishing positions
   - Class level progression and consistency
   - Distance preference and stamina evaluation
   - Surface preference (turf, dirt, all-weather)
   - Seasonal form patterns and peak periods
   - Recovery time between races and freshness

2. TRACK AND GOING CONDITIONS:
   - Track-specific performance history
   - Going preference (firm, good, soft, heavy)
   - Left-hand vs right-hand track preference
   - Track configuration and bend characteristics
   - Straight length and finishing kick requirements
   - Historical course and distance combinations

3. JOCKEY AND TRAINER FACTORS:
   - Jockey strike rate and course record
   - Trainer statistics and stable form
   - Jockey-trainer combination success rate
   - Claiming allowances and weight advantages
   - Apprentice jockey weight reductions
   - Stable confidence and market support

4. BREEDING AND PEDIGREE:
   - Sire and dam performance at distance
   - Breeding for surface and conditions
   - Age progression and improvement curves
   - Stamina inheritance and speed genetics
   - Seasonal breeding patterns
   - First-time equipment changes impact

5. RACE CONDITIONS AND FIELD:
   - Field size and competitive strength
   - Pace scenario and early speed horses
   - Draw bias and starting position advantages
   - Weight carried and handicap adjustments
   - Blinkers, tongue ties, and equipment changes
   - Market confidence and betting patterns

OUTDOOR RACING WEATHER FACTORS:
- Detailed weather forecast and track conditions
- Wind speed and direction impact on times
- Temperature effects on horse performance
- Humidity and atmospheric pressure
- Track maintenance and watering schedule
- Historical weather performance correlations

STATISTICAL MODELING:
- Speed figures and time comparisons
- Class ratings and performance ratings
- Pace analysis and sectional times
- Weight-for-age adjustments
- Distance and surface adjustments
- Trainer and jockey strike rate analysis

BETTING MARKETS EVALUATION:
- Win probability calculations
- Place and show betting opportunities
- Exacta and trifecta combination analysis
- Each-way betting value assessment
- Ante-post vs day-of-race pricing
- Market movements and insider knowledge

ADVANCED PERFORMANCE METRICS:
- Sectional time analysis and closing speed
- Beaten lengths and margin analysis
- Class drop/rise performance impact
- First-time distance and surface performance
- Gear changes and equipment modifications
- Veterinary reports and soundness issues`,
    createdAt: '2024-01-15T19:00:00Z',
    updatedAt: '2024-01-15T19:00:00Z',
  },

  // AMERICAN FOOTBALL PROMPT
  {
    id: '20',
    title: 'American Football Analysis - General EV Scanner',
    sport: 'american-football',
    category: 'traditional',
    type: 'general',
    tags: ['offense', 'defense', 'weather', 'injuries', 'coaching'],
    content: `COMPREHENSIVE AMERICAN FOOTBALL BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. OFFENSIVE ANALYSIS:
   - Yards per play and scoring efficiency
   - Red zone touchdown percentage
   - Third down conversion rates
   - Turnover rate and ball security
   - Offensive line pass protection and run blocking
   - Quarterback rating and completion percentage

2. DEFENSIVE ANALYSIS:
   - Yards allowed per play
   - Red zone defense and goal line stands
   - Third down defense efficiency
   - Takeaway creation and defensive scores
   - Pass rush effectiveness and sack rate
   - Run defense and yards per carry allowed

3. SPECIAL TEAMS EVALUATION:
   - Field goal accuracy by distance
   - Punt and kickoff coverage units
   - Return game effectiveness
   - Field position battle impact
   - Blocked kicks and special teams scores
   - Punting average and net punting

4. INJURY REPORT ANALYSIS:
   - Key player availability and impact ratings
   - Depth chart analysis and backup quality
   - Injury history and durability concerns
   - Practice participation and game status
   - Position group depth and versatility
   - Late-week injury developments

5. COACHING AND GAME PLANNING:
   - Head coach record and experience
   - Offensive and defensive coordinator schemes
   - Halftime adjustment effectiveness
   - Clock management and situational coaching
   - Playoff experience and big game performance
   - Historical matchup coaching records

OUTDOOR SPORT WEATHER FACTORS:
- Temperature impact on passing and kicking games
- Wind speed and direction effects on field goals
- Precipitation probability and field conditions
- Dome vs outdoor venue considerations
- Cold weather performance history
- Altitude effects on kicking and conditioning

STATISTICAL MODELING:
- DVOA (Defense-adjusted Value Over Average)
- Pythagorean expectation for win probability
- Strength of schedule adjustments
- Home field advantage quantification
- Divisional rivalry intensity factors
- Rest advantage and bye week impact

BETTING MARKETS EVALUATION:
- Point spread efficiency using advanced metrics
- Total points modeling with pace and weather
- First half vs second half trends
- Quarter-by-quarter scoring patterns
- Player prop correlations and dependencies
- Live betting opportunities and key numbers

ADVANCED PERFORMANCE METRICS:
- Expected points added (EPA) per play
- Success rate on standard downs
- Explosive play rates (20+ yard gains)
- Drive efficiency and scoring percentage
- Time of possession and pace control
- Situational performance (goal line, short yardage)`,
    createdAt: '2024-01-15T19:30:00Z',
    updatedAt: '2024-01-15T19:30:00Z',
  },

  // CRICKET PROMPT
  {
    id: '21',
    title: 'Cricket Match Analysis - General EV Scanner',
    sport: 'cricket',
    category: 'traditional',
    type: 'general',
    tags: ['pitch', 'weather', 'form', 'bowling', 'batting'],
    content: `COMPREHENSIVE CRICKET BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. BATTING ANALYSIS:
   - Recent batting averages and strike rates
   - Top order stability and consistency
   - Middle order depth and finishing ability
   - Power play performance (T20/ODI)
   - Death overs batting (16-20 overs)
   - Pressure situation performance

2. BOWLING ATTACK EVALUATION:
   - Pace vs spin bowling balance
   - New ball bowling effectiveness
   - Middle overs control and economy rates
   - Death bowling skills and yorker accuracy
   - Wicket-taking ability and strike rates
   - Bowling depth and all-rounder contributions

3. FIELDING AND WICKET-KEEPING:
   - Catching efficiency and drop rates
   - Ground fielding and run-out opportunities
   - Wicket-keeper batting and keeping skills
   - Captain's tactical awareness and field settings
   - Pressure fielding in crucial moments
   - Boundary saving and athletic fielding

4. PITCH AND CONDITIONS ANALYSIS:
   - Pitch type (batting, bowling, balanced)
   - Historical scoring patterns at venue
   - Toss advantage and decision trends
   - Pitch deterioration over match duration
   - Dew factor impact on evening games
   - Boundary dimensions and ground characteristics

5. RECENT FORM AND MOMENTUM:
   - Last 10 matches win-loss record
   - Performance against similar opposition
   - Home vs away form differential
   - Series context and motivation levels
   - Player availability and injury concerns
   - Team combination and balance

OUTDOOR SPORT WEATHER FACTORS:
- Detailed weather forecast and rain probability
- Wind speed and direction impact on bowling
- Temperature and humidity effects on swing
- Cloud cover and atmospheric conditions
- DLS method implications for shortened games
- Historical weather performance at venue

STATISTICAL MODELING:
- Run rate predictions and scoring models
- Wicket fall patterns and batting collapses
- Bowling figures and economy rate analysis
- Partnership building and run accumulation
- Power play and death overs modeling
- Match format specific performance metrics

BETTING MARKETS EVALUATION:
- Match winner probability calculations
- Total runs over/under modeling
- Top batsman and bowler markets
- Method of dismissal and extras betting
- Session betting and innings breaks
- Live betting opportunities during play

ADVANCED PERFORMANCE METRICS:
- Strike rotation and boundary percentage
- Bowling variations and wicket methods
- Partnership patterns and run rates
- Pressure index and clutch performance
- Format-specific adaptability
- Opposition-specific historical performance`,
    createdAt: '2024-01-15T20:00:00Z',
    updatedAt: '2024-01-15T20:00:00Z',
  },

  // ICE HOCKEY PROMPT
  {
    id: '22',
    title: 'Ice Hockey Analysis - General EV Scanner',
    sport: 'hockey',
    category: 'traditional',
    type: 'general',
    tags: ['goaltending', 'power-play', 'defense', 'pace', 'injuries'],
    content: `COMPREHENSIVE ICE HOCKEY BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. OFFENSIVE ANALYSIS:
   - Goals per game and shooting percentage
   - Power play efficiency and special teams
   - Shot generation and quality scoring chances
   - Offensive zone time and puck possession
   - Line chemistry and player combinations
   - Face-off win percentage in offensive zone

2. DEFENSIVE EVALUATION:
   - Goals against average and save percentage
   - Penalty kill effectiveness
   - Shot suppression and defensive structure
   - Blocked shots and defensive commitment
   - Defensive zone coverage and positioning
   - Transition defense and neutral zone play

3. GOALTENDING ANALYSIS:
   - Starting goaltender recent form and stats
   - Save percentage against different shot types
   - High danger save percentage
   - Backup goaltender reliability
   - Goaltender fatigue and workload management
   - Historical performance against opposition

4. SPECIAL TEAMS IMPACT:
   - Power play conversion rates and systems
   - Penalty kill success and short-handed goals
   - Discipline and penalty minutes per game
   - Man advantage time and opportunity creation
   - Special teams coaching and adjustments
   - Key player roles on special teams

5. SITUATIONAL FACTORS:
   - Home vs away performance differential
   - Back-to-back game performance
   - Rest advantage and travel fatigue
   - Divisional rivalry intensity
   - Playoff race implications and motivation
   - Injury report and lineup changes

INDOOR SPORT CONSIDERATIONS:
- Arena atmosphere and crowd influence
- Ice surface size and playing style impact
- Altitude effects on puck movement (if applicable)
- Travel and time zone adjustment factors
- Referee tendencies and penalty calling
- Building characteristics and home ice advantage

STATISTICAL MODELING:
- Expected goals (xG) and shot quality metrics
- Corsi and Fenwick possession statistics
- PDO (shooting % + save %) sustainability
- Zone start percentages and deployment
- Quality of competition adjustments
- Score effects and game state analysis

BETTING MARKETS EVALUATION:
- Moneyline and puck line analysis
- Total goals over/under modeling
- Period betting and intermission adjustments
- Player prop markets (goals, assists, shots)
- Goaltender performance props
- Live betting opportunities during play

ADVANCED PERFORMANCE METRICS:
- High danger scoring chances for/against
- Shot attempt differential (Corsi)
- Zone entry and exit efficiency
- Neutral zone play and transition game
- Clutch performance in close games
- Goaltender quality start percentage`,
    createdAt: '2024-01-15T20:30:00Z',
    updatedAt: '2024-01-15T20:30:00Z',
  },

  // BASEBALL PROMPT
  {
    id: '23',
    title: 'Baseball Analysis - General EV Scanner',
    sport: 'baseball',
    category: 'traditional',
    type: 'general',
    tags: ['pitching', 'hitting', 'weather', 'ballpark', 'bullpen'],
    content: `COMPREHENSIVE BASEBALL BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. PITCHING ANALYSIS:
   - Starting pitcher recent form and ERA
   - WHIP (Walks + Hits per Inning Pitched)
   - Strikeout rate and walk rate (K/9, BB/9)
   - Home run rate allowed and ballpark factors
   - Pitch count and innings pitched sustainability
   - Historical performance against opposition

2. HITTING EVALUATION:
   - Team batting average and on-base percentage
   - Slugging percentage and power numbers
   - Runs scored per game and offensive consistency
   - Performance against left/right-handed pitching
   - Clutch hitting with runners in scoring position
   - Plate discipline and strikeout rates

3. BULLPEN STRENGTH:
   - Closer save percentage and recent form
   - Setup men effectiveness and ERA
   - Bullpen depth and workload management
   - Left-handed and right-handed specialist usage
   - High leverage situation performance
   - Recent usage patterns and fatigue factors

4. DEFENSIVE METRICS:
   - Fielding percentage and error rates
   - Defensive efficiency and range factors
   - Double play conversion rates
   - Catcher framing and stolen base prevention
   - Outfield arm strength and positioning
   - Infield shift effectiveness

5. SITUATIONAL FACTORS:
   - Home vs road performance splits
   - Day vs night game performance
   - Series context and momentum
   - Injury report and lineup changes
   - Managerial decisions and strategy
   - Rest days and rotation scheduling

OUTDOOR SPORT WEATHER FACTORS:
- Wind speed and direction impact on home runs
- Temperature effects on ball flight distance
- Humidity and atmospheric pressure considerations
- Precipitation probability and game delays
- Sun position and visibility for fielders
- Historical weather performance correlations

BALLPARK FACTORS:
- Dimensions and foul territory impact
- Altitude effects on ball flight (Coors Field)
- Wall height and outfield characteristics
- Infield surface and ground ball behavior
- Historical run scoring environment
- Home team advantage and familiarity

STATISTICAL MODELING:
- Run expectancy and win probability models
- Pythagorean expectation for team strength
- BABIP (Batting Average on Balls in Play)
- FIP (Fielding Independent Pitching)
- wOBA (Weighted On-Base Average)
- Leverage index and clutch performance

BETTING MARKETS EVALUATION:
- Moneyline and run line analysis
- Total runs over/under with weather adjustments
- First 5 innings betting (starting pitchers only)
- Player prop markets (hits, RBIs, strikeouts)
- Inning-by-inning betting opportunities
- Live betting based on game flow

ADVANCED PERFORMANCE METRICS:
- Expected batting average (xBA) and exit velocity
   - Launch angle and hard hit percentage
   - Spin rate and pitch movement analysis
   - Defensive shifts and positioning impact
   - Base running efficiency and stolen bases
   - Clutch performance in high leverage situations`,
    createdAt: '2024-01-15T21:00:00Z',
    updatedAt: '2024-01-15T21:00:00Z',
  },

  // FIFA ESPORTS PROMPT
  {
    id: '24',
    title: 'FIFA Esports Analysis - General EV Scanner',
    sport: 'fifa',
    category: 'esports',
    type: 'general',
    tags: ['meta', 'formations', 'skill', 'consistency'],
    content: `PROFESSIONAL FIFA ESPORTS BETTING ANALYSIS:

PLAYER PERFORMANCE ASSESSMENT:
1. SKILL RATING AND CONSISTENCY:
   - Current FIFA ranking and skill rating
   - Recent tournament results and progression
   - Win rate against similar-skilled opponents
   - Performance in different game modes
   - Consistency across multiple matches
   - Clutch performance in elimination games

2. META UNDERSTANDING AND ADAPTATION:
   - Current patch meta knowledge
   - Formation preferences and effectiveness
   - Player chemistry and squad building
   - Custom tactics and in-game adjustments
   - Skill move usage and effectiveness
   - Set piece execution and defending

3. PLAYING STYLE ANALYSIS:
   - Possession-based vs counter-attacking style
   - Defensive solidity and clean sheet rate
   - Attacking creativity and goal scoring
   - Pace abuse vs build-up play preference
   - High pressure vs patient defending
   - Risk-taking vs conservative approach

4. PSYCHOLOGICAL FACTORS:
   - Performance under pressure situations
   - Comeback ability from deficit positions
   - Tilt resistance and emotional control
   - Big tournament experience
   - Crowd pressure handling (LAN events)
   - Momentum management between games

5. TECHNICAL SETUP AND CONDITIONS:
   - Controller vs keyboard preference
   - Display setup and input lag considerations
   - Internet connection stability (online events)
   - Hardware familiarity and comfort
   - Tournament format adaptation
   - Time zone and jet lag factors (international)

INDOOR ESPORTS CONSIDERATIONS:
- LAN vs online performance differences
- Stage setup and equipment standardization
- Noise-canceling and communication clarity
- Tournament atmosphere and crowd energy
- Technical support and referee consistency
- Streaming delay and audience interaction

STATISTICAL MODELING:
- Elo rating system for FIFA players
- Goal difference and match outcome correlation
- Formation effectiveness against different styles
- Player rating impact on match results
- Tournament format success patterns
- Head-to-head historical performance

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Handicap betting with goal differences
- Total goals over/under calculations
- Correct score predictions
- Tournament outright winner analysis
- Live betting opportunities during matches

ADVANCED METRICS:
- Possession percentage and effectiveness
- Shot accuracy and conversion rates
- Defensive actions and interception rates
- Pass completion and build-up play
- Set piece conversion and defending
- Substitution timing and impact analysis`,
    createdAt: '2024-01-15T21:30:00Z',
    updatedAt: '2024-01-15T21:30:00Z',
  },

  // LEAGUE OF LEGENDS PROMPT
  {
    id: '25',
    title: 'League of Legends Analysis - General EV Scanner',
    sport: 'lol',
    category: 'esports',
    type: 'general',
    tags: ['meta', 'drafting', 'macro', 'teamfight'],
    content: `PROFESSIONAL LEAGUE OF LEGENDS BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. CURRENT PATCH META ANALYSIS:
   - Champion tier list and priority picks
   - Meta shift adaptation and flexibility
   - Comfort picks vs meta conformity
   - Ban phase strategy and target bans
   - Flex pick utilization and draft versatility
   - Power spike timing and game length preference

2. INDIVIDUAL PLAYER EVALUATION:
   - Laning phase dominance and CS differentials
   - Champion pool depth and mastery
   - Mechanical skill and outplay potential
   - Map awareness and roaming effectiveness
   - Team fight positioning and damage output
   - Clutch performance in high-pressure moments

3. MACRO GAME AND STRATEGY:
   - Objective control (Dragon, Baron, Herald)
   - Vision control and map awareness
   - Rotation timing and map movement
   - Wave management and lane assignments
   - Late game scaling vs early game aggression
   - Comeback potential and deficit management

4. TEAM COORDINATION:
   - Communication and shotcalling quality
   - Team fight execution and focus targeting
   - Engage timing and follow-up coordination
   - Peel effectiveness for carry protection
   - Split push coordination and map pressure
   - Adaptation to opponent strategies

5. RECENT FORM AND CONTEXT:
   - Win-loss record on current patch
   - Performance against similar-tier teams
   - Bo1 vs Bo3/Bo5 performance differences
   - Tournament stage experience
   - Roster stability and synergy development
   - Coaching staff impact and preparation

INDOOR ESPORTS CONSIDERATIONS:
- LAN vs online performance differential
- Stage experience and crowd pressure
- Equipment setup and peripheral familiarity
- Communication clarity in tournament environment
- Technical pause handling and momentum
- Referee decisions and rule interpretations

STATISTICAL MODELING:
- Elo rating system for LoL teams
- Gold difference at 15 minutes correlation
- First blood and early game advantage impact
- Objective control win rate correlation
- Game length prediction models
- Champion win rate in specific matchups

BETTING MARKETS EVALUATION:
- Match winner (Bo1, Bo3, Bo5 analysis)
- Map handicap betting opportunities
- Total maps over/under calculations
- First blood and first tower markets
- Game length over/under predictions
- Tournament bracket and outright betting

ADVANCED PERFORMANCE METRICS:
- Damage per minute and gold efficiency
- Vision score and ward placement effectiveness
- Objective control percentage and timing
- Team fight win rate and positioning
- Laning phase advantages and transitions
- Champion-specific performance analytics`,
    createdAt: '2024-01-15T22:00:00Z',
    updatedAt: '2024-01-15T22:00:00Z',
  },

  // COUNTER-STRIKE 2 PROMPT
  {
    id: '26',
    title: 'Counter-Strike 2 Analysis - General EV Scanner',
    sport: 'cs2',
    category: 'esports',
    type: 'general',
    tags: ['aim', 'tactics', 'economy', 'maps'],
    content: `PROFESSIONAL COUNTER-STRIKE 2 BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. INDIVIDUAL SKILL EVALUATION:
   - Aim precision and headshot percentage
   - Reaction time and clutch performance
   - Entry fragging and opening duel success
   - AWP effectiveness and impact rounds
   - Rifle vs pistol round performance
   - Multi-kill frequency and impact frags

2. TACTICAL ANALYSIS:
   - Strategic depth and anti-stratting ability
   - Default setups and site execution
   - Retake coordination and post-plant situations
   - Utility usage efficiency (smokes, flashes, nades)
   - Mid-round calling and adaptation
   - Timeout usage and tactical adjustments

3. MAP-SPECIFIC PERFORMANCE:
   - Map pool strength and ban/pick strategy
   - Side preference (CT vs T side performance)
   - Pistol round win rate and impact
   - Force buy success and eco round management
   - Site preference and rotational play
   - Map control and space creation

4. ECONOMIC MANAGEMENT:
   - Buy round efficiency and damage output
   - Eco round upset potential
   - Force buy timing and success rate
   - Save round discipline and positioning
   - Economic reset ability after losses
   - Weapon upgrade timing and priorities

5. MENTAL FORTITUDE:
   - Comeback ability from large deficits
   - Performance in overtime situations
   - Pressure handling in elimination matches
   - Tilt resistance after bad rounds
   - Communication quality under stress
   - Momentum management and reset ability

INDOOR ESPORTS CONSIDERATIONS:
- LAN vs online performance differences
- Stage setup and peripheral consistency
- Audio clarity and directional sound
- Monitor refresh rate and input lag
- Tournament format adaptation
- Crowd noise impact on communication

STATISTICAL MODELING:
- Round win probability based on economy
- Individual rating and team performance correlation
- Pistol round impact on half outcomes
- Clutch situation success rates
- Map-specific win rate calculations
- Head-to-head historical performance

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Map handicap and total maps betting
- Individual map over/under rounds
- Pistol round winner predictions
- Tournament outright and bracket betting
- Live betting opportunities during matches

ADVANCED PERFORMANCE METRICS:
- HLTV rating and impact statistics
- Entry kill success rate and trade efficiency
- Utility damage and flash assist rates
- Clutch win percentage in 1vX situations
- Economic efficiency and damage per dollar
- Site hold percentage and retake success`,
    createdAt: '2024-01-15T22:30:00Z',
    updatedAt: '2024-01-15T22:30:00Z',
  },

  // VALORANT PROMPT
  {
    id: '27',
    title: 'Valorant Analysis - General EV Scanner',
    sport: 'valorant',
    category: 'esports',
    type: 'general',
    tags: ['agents', 'aim', 'utility', 'maps'],
    content: `PROFESSIONAL VALORANT BETTING ANALYSIS:

TEAM PERFORMANCE ASSESSMENT:
1. AGENT COMPOSITION AND META:
   - Agent pool flexibility and comfort picks
   - Meta adaptation and innovative compositions
   - Role distribution and player specialization
   - Utility coordination and execution timing
   - Counter-pick ability and draft adaptation
   - Agent synergy and team composition balance

2. INDIVIDUAL SKILL ANALYSIS:
   - Aim consistency and headshot percentage
   - Duelist entry fragging effectiveness
   - Controller utility usage and map control
   - Initiator information gathering and setup
   - Sentinel site anchoring and defensive holds
   - Clutch performance and 1vX situations

3. TACTICAL EXECUTION:
   - Site execute coordination and timing
   - Default round setups and map control
   - Retake coordination and post-plant play
   - Anti-eco and force buy strategies
   - Timeout usage and mid-round adjustments
   - Adaptation to opponent tendencies

4. MAP-SPECIFIC PERFORMANCE:
   - Map pool depth and ban/pick strategy
   - Attack vs defense side preferences
   - Pistol round execution and impact
   - Bonus round conversion rates
   - Site preference and rotational speed
   - Ultimate usage timing and coordination

5. ECONOMIC AND UTILITY MANAGEMENT:
   - Buy round efficiency and damage output
   - Eco round upset potential and positioning
   - Shield and weapon upgrade priorities
   - Utility conservation and usage timing
   - Economic reset ability after losses
   - Force buy success and timing decisions

INDOOR ESPORTS CONSIDERATIONS:
- LAN vs online performance differential
- Equipment setup and peripheral familiarity
- Audio positioning and directional awareness
- Tournament atmosphere and pressure handling
- Technical pause impact on momentum
- Communication clarity in high-stress situations

STATISTICAL MODELING:
- Round win probability based on economy
- Agent pick rate and success correlation
- First blood impact on round outcomes
- Pistol round influence on half results
- Map-specific win rate calculations
- Head-to-head agent matchup analysis

BETTING MARKETS EVALUATION:
- Match winner probability assessment
- Map handicap and total maps betting
- Individual map over/under rounds
- First blood and pistol round markets
- Tournament bracket and outright betting
- Live betting during tactical timeouts

ADVANCED PERFORMANCE METRICS:
- Average Combat Score (ACS) and consistency
- First kill percentage and trade efficiency
- Utility damage and assist rates
- Clutch win percentage in disadvantaged situations
- Economic efficiency and damage per credit
- Site success rate and defensive holds`,
    createdAt: '2024-01-15T23:00:00Z',
    updatedAt: '2024-01-15T23:00:00Z',
  }
];
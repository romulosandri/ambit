import { covers, portraits } from "./assets"
import type { Article } from "./types"

export const discoveryArticles: Article[] = [
  {
    id: "el-nino-record",
    title: "The ongoing El Niño has officially reached record levels",
    dek: "Niño 3.4 hit 3.05°C above average on Saturday, the highest peak sea-surface anomaly on record. The United States will feel it this winter.",
    type: "news",
    source: { kind: "publisher", id: "the-guardian" },
    topicIds: ["el-nino-extremes", "climate-week"],
    categories: ["climate", "world", "science"],
    sourceCount: 14,
    readTime: "5 min read",
    time: "1h ago",
    day: "today",
    imageSrc: covers.climate,
    featured: true,
    url: "https://www.washingtonpost.com/weather/2026/09/21/ongoing-el-nio-has-officially-reached-record-levels/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-luccioni-nino",
        source: { kind: "person", id: "sasha-luccioni" },
        channel: "LinkedIn",
        imageSrc: portraits["sasha-luccioni"],
        quote:
          "A record El Niño is not a model demo. It is the energy and water budget the data centers still refuse to publish against.",
      },
      {
        id: "p-crawford-nino",
        source: { kind: "person", id: "kate-crawford" },
        channel: "Twitter (X)",
        imageSrc: portraits["kate-crawford"],
        quote:
          "Follow AI back to mines, data centers, and the Pacific heat sitting under this winter's forecast.",
      },
      {
        id: "p-reuters-nino",
        source: { kind: "publisher", id: "reuters" },
        imageSrc: covers.climate,
        quote:
          "The U.S. winter is the first-order story. Food-price inflation is the second, once smaller harvests hit domestic markets.",
      },
    ],
    body: [
      "What started as a wind shift in a remote stretch of the western Pacific nine months ago is now a Super El Niño of record proportions. In the Niño 3.4 region of the central equatorial Pacific, the average ocean temperature on Saturday reached 3.05°C (5.49°F) above average — the highest peak sea-surface temperature anomaly on record, the Washington Post reported Monday.",
      "The United States will probably experience the biggest effects from the pattern this winter. That sits on top of a summer already in the record books: Copernicus said August 2026 tied July 2023 for the hottest month ever measured, at 1.65°C above preindustrial levels, with sea-surface temperatures at their highest August reading as well.",
      "UN climate chief Simon Stiell said the economic and social damage of the summer is still being counted — extreme heat killing and costing, harvests damaged, transport and public services disrupted. Climate Week NYC opened Sunday against that backdrop, not as a side conference to the AI safety fight in Brussels.",
    ],
  },
  {
    id: "stiell-ai-emissions",
    title:
      "‘Energy-guzzling’ AI must rein in its emissions, says UN climate chief",
    dek: "Simon Stiell told Climate Week that AI firms are ‘on thin ice’ with the public as household energy costs rise.",
    type: "news",
    source: { kind: "publisher", id: "bloomberg" },
    topicIds: ["climate-week", "energy-markets"],
    categories: ["ai", "climate", "technology"],
    sourceCount: 11,
    readTime: "4 min read",
    time: "2h ago",
    day: "today",
    imageSrc: covers.serverFarm,
    url: "https://www.bloomberg.com/news/articles/2026-09-21/-energy-guzzling-ai-must-rein-in-its-emissions-says-un-climate-chief",
    surface: "discovery",
    perspectives: [
      {
        id: "p-luccioni-stiell",
        source: { kind: "person", id: "sasha-luccioni" },
        channel: "LinkedIn",
        imageSrc: portraits["sasha-luccioni"],
        quote:
          "If independent evaluators are going inside the building, carbon and water should be on the same clipboard as loss-of-control.",
      },
      {
        id: "p-crawford-stiell",
        source: { kind: "person", id: "kate-crawford" },
        channel: "Twitter (X)",
        imageSrc: portraits["kate-crawford"],
        quote:
          "Gas is getting the biggest boost from AI power demand. That is not a side effect. It is the stack.",
      },
      {
        id: "p-whittaker-stiell",
        source: { kind: "person", id: "meredith-whittaker" },
        channel: "Twitter (X)",
        imageSrc: covers.serverFarm,
        quote:
          "Leaders of AI firms are on thin ice with the public as energy costs rise. That sentence should have arrived two years ago.",
      },
    ],
    body: [
      "With the world now set to barrel past a key global warming goal, the United Nations’ top climate official took aim at AI companies for their growing share of emissions as the UN General Assembly and Climate Week began in New York.",
      "“Energy guzzling artificial intelligence is driving up planet-heating pollution from coal, oil and gas, while ratcheting up energy costs for households and businesses,” Simon Stiell, executive secretary of the UN Framework Convention on Climate Change, said in a speech Monday. Bloomberg reported that he told the public the firms are “on thin ice.”",
      "That is a different AI argument than the one on the home feed. Climate Week’s own program for Monday is titled “Powering AI: who wins when demand outpaces the grid.” Ceres put sustainable data centers on a mainstage. Jefferies’ Aniket Shah asked Wall Street not to let data centers hijack the entire climate conversation. The grid, not the extinction number, is the room this week.",
    ],
  },
  {
    id: "caplyta-mania",
    title: "J&J’s Caplyta meets main goal of bipolar mania study",
    dek: "A 42-milligram dose cut mania symptoms versus placebo, with benefit from day three. About 46% of patients responded, against 21% on placebo.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["bipolar-treatment"],
    categories: ["health", "markets", "science"],
    sourceCount: 9,
    readTime: "3 min read",
    time: "3h ago",
    day: "today",
    imageSrc: covers.office,
    url: "https://www.reuters.com/business/healthcare-pharmaceuticals/jjs-caplyta-meets-main-goal-bipolar-mania-study-2026-09-21/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-forbes-caplyta",
        source: { kind: "publisher", id: "forbes" },
        imageSrc: covers.office,
        quote:
          "This is the first expansion path for Caplyta since J&J paid $14.6 billion for Intra-Cellular Therapies to rebuild the neuroscience book.",
      },
      {
        id: "p-cnbc-caplyta",
        source: { kind: "publisher", id: "cnbc" },
        imageSrc: covers.office,
        quote:
          "Mania is the defining feature of bipolar I that the current label does not cover. A late-stage win is how that label moves.",
      },
      {
        id: "p-wired-caplyta",
        source: { kind: "publisher", id: "wired" },
        imageSrc: covers.office,
        quote:
          "Bipolar disorder affects an estimated 37 million people. A three-week trial is not a cure. It is a regulatory door opening.",
      },
    ],
    body: [
      "Johnson & Johnson said Monday that an experimental use of Caplyta for bipolar mania met the main goal of a late-stage study, bringing the drug a step closer to expanding beyond its currently approved uses for bipolar depression and schizophrenia.",
      "Caplyta significantly reduced symptoms of bipolar mania compared with placebo. Patients showed improvement as early as three days after starting a once-daily 42-milligram dose, with benefits held through the three-week trial. About 46% of treated patients achieved a clinical response, versus about 21% on placebo. The study also met a key secondary goal on overall severity of illness.",
      "J&J gained Caplyta through its $14.6 billion acquisition of Intra-Cellular Therapies last year. Mania — elevated or irritable mood, decreased need for sleep, racing thoughts, risk-taking — is the feature of bipolar I the current U.S. label does not treat. The company will now take that package to regulators.",
    ],
  },
  {
    id: "eagles-titans-heat",
    title:
      "Eagles coach needs IV as 157-degree turf melts cleats, but Philly escapes in Nashville",
    dek: "Jalen Hurts hit Darius Cooper from three yards with nine seconds left. The Eagles beat the Titans 24–20 on a day the field was measured at 157°F.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["nfl-heat", "el-nino-extremes"],
    categories: ["sports", "climate", "health"],
    sourceCount: 8,
    readTime: "4 min read",
    time: "4h ago",
    day: "today",
    imageSrc: covers.climate,
    url: "https://www.cnn.com/2026/09/21/sport/philadelphia-eagles-tennessee-titans-week-2",
    surface: "discovery",
    perspectives: [
      {
        id: "p-guardian-eagles",
        source: { kind: "publisher", id: "the-guardian" },
        imageSrc: covers.climate,
        quote:
          "This is what a record El Niño looks like on an NFL Sunday: a coach on an IV and a field hot enough to warp cleats.",
      },
      {
        id: "p-cnbc-eagles",
        source: { kind: "publisher", id: "cnbc" },
        imageSrc: covers.climate,
        quote:
          "Week 2 is supposed to be a product story. 157°F turf makes it a workplace-safety story that the league has not priced.",
      },
      {
        id: "p-axios-eagles",
        source: { kind: "publisher", id: "axios" },
        imageSrc: covers.climate,
        quote:
          "Sirianni’s only thought with the offense on the field was play to win. The rest of the country should be thinking about outdoor work in this heat.",
      },
    ],
    body: [
      "Philadelphia Eagles coach Nick Sirianni needed intravenous fluids to cool off. The temperature on Nissan Stadium’s artificial turf was measured at 157 degrees Fahrenheit. Cleats melted. Jalen Hurts still threw a 3-yard touchdown to Darius Cooper with nine seconds left, and the Eagles beat the Tennessee Titans 24–20 on Sunday.",
      "“They fought and they clawed and they scratched and did anything they had to do to get the win,” Sirianni said. Philadelphia improved in a game that the Associated Press filed as sport and that reads, this week, as climate reporting.",
      "It is the same heat that Copernicus just logged as a joint-hottest August, and the same pattern the Pacific just pushed to a record El Niño. The NFL does not have a statute for 157°F turf. It has a schedule.",
    ],
  },
  {
    id: "oil-unga-iran",
    title:
      "Wall St futures rise as AI stocks gain and oil slides on UN diplomacy hopes",
    dek: "Brent fell a further 2% toward $102. Traders are taking risk premium out of crude on the chance UNGA produces a path off a seven-month U.S.–Iran war.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["energy-markets", "climate-week"],
    categories: ["markets", "world", "policy", "business"],
    sourceCount: 16,
    readTime: "5 min read",
    time: "5h ago",
    day: "today",
    imageSrc: covers.whiteHouse,
    url: "https://www.reuters.com/business/wall-st-futures-rise-ai-stocks-gain-oil-prices-slide-2026-09-21/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-economist-oil",
        source: { kind: "publisher", id: "the-economist" },
        imageSrc: covers.whiteHouse,
        quote:
          "Removing a war premium because the General Assembly is in session is a trade, not a ceasefire.",
      },
      {
        id: "p-ft-oil",
        source: { kind: "publisher", id: "financial-times" },
        imageSrc: covers.whiteHouse,
        quote:
          "The 10-year yield slipped under 5% as crude eased. Airlines caught the bid. That is the mechanical story. Hormuz is the other one.",
      },
      {
        id: "p-wsj-oil",
        source: { kind: "publisher", id: "wsj" },
        imageSrc: covers.whiteHouse,
        quote:
          "Trump listed three options on Fox: military destruction, economic isolation, or a deal. Pezeshkian is flying to New York. The tape is trading the third.",
      },
    ],
    body: [
      "Wall Street futures advanced Monday, led by AI stocks, as a roughly 2% slide in oil prices pulled Treasury yields lower. At 5:09 a.m. ET, Dow e-minis were up 0.6%, S&P 500 e-minis 0.63%, and Nasdaq 100 e-minis 1.09%. The 10-year yield slipped below 5%. Delta and American each gained about 1%.",
      "Brent was changing hands near $102 and West Texas Intermediate under $99, a fourth straight session of losses. KCM Trade’s Tim Waterer told Reuters a degree of risk premium is being removed on hopes that a diplomatic path to de-escalate the U.S.–Iran war may arrive this week. “Whether that hope proves to be warranted or not is another question.”",
      "On Sunday President Trump told Fox News he was considering three options — “wiping Iran out,” allowing it to “rot economically,” or reaching a deal — and said he was open to meeting Iranian President Masoud Pezeshkian, who will be in New York for the General Assembly. The Houthis hit targets in Saudi Arabia over the weekend, including Riyadh. JPMorgan noted Saudi exports via Hormuz had recovered to 2.9 million barrels a day from 700,000 in August. The tape is choosing the diplomacy headline anyway.",
    ],
  },
  {
    id: "tesla-fsd-czech",
    title:
      "Czechia recognizes Tesla FSD Supervised, the latest European country to take the Dutch approval",
    dek: "The transport ministry leaned on Article 39 of EU Regulation 2018/858. It is SAE Level 2. The driver stays legally responsible. An EU-wide vote is still ahead.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["mobility"],
    categories: ["technology", "policy", "world", "ai", "business"],
    sourceCount: 10,
    readTime: "5 min read",
    time: "6h ago",
    day: "today",
    imageSrc: covers.office,
    url: "https://www.reuters.com/business/finance/teslas-road-full-self-driving-approval-europe-2026-06-30/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-doctorow-fsd",
        source: { kind: "person", id: "cory-doctorow" },
        channel: "Twitter (X)",
        imageSrc: portraits["cory-doctorow"],
        quote:
          "When a company sells ‘Full Self-Driving’ as Level 2 with the human still on the hook, check whether the danger is to drivers or to the brand.",
      },
      {
        id: "p-schneier-fsd",
        source: { kind: "person", id: "bruce-schneier" },
        channel: "Substack",
        imageSrc: portraits["bruce-schneier"],
        quote:
          "Supervised autonomy is a liability design. The software can steer. The person still owns the crash.",
      },
      {
        id: "p-bradford-fsd",
        source: { kind: "person", id: "anu-bradford" },
        channel: "LinkedIn",
        imageSrc: portraits["anu-bradford"],
        quote:
          "Member states taking the Dutch approval one by one is the Brussels effect in slow motion, ahead of an October committee vote.",
      },
    ],
    body: [
      "The Czech Ministry of Transport said Monday it had recognized the Netherlands’ provisional approval of Tesla’s FSD Supervised driver-assistance system, allowing use on Czech roads under Article 39 of EU Regulation 2018/858. The Dutch RDW issued that approval on April 10 after 18 months of trials.",
      "The ministry was explicit about the name. Despite “Full Self-Driving,” FSD Supervised is SAE Level 2: the driver must monitor the car continuously and remains fully responsible. Tesla has been rolling the same recognition out country by country — Slovenia announced on September 8 that it was the sixth European state to clear the software, with an EU-wide vote still expected in October.",
      "Czechia had been more cautious earlier this year, arguing for a coordinated European approach. Officials now say additional technical evidence and on-road experience from the states that moved first were enough to proceed. The product that will actually ship is still a supervision requirement wearing an autonomy label.",
    ],
  },
  {
    id: "dmd-suppressor-trna",
    title:
      "Suppressor tRNAs restore full-length dystrophin in mice with Duchenne muscular dystrophy",
    dek: "Tevard Biosciences’ read-through RNAs reached nearly 70% of wild-type dystrophin in a Science Advances paper, with stronger muscle and no obvious organ toxicity.",
    type: "articles",
    source: { kind: "publisher", id: "wired" },
    topicIds: ["gene-therapy"],
    categories: ["science", "health"],
    sourceCount: 6,
    readTime: "6 min read",
    time: "7h ago",
    day: "today",
    imageSrc: covers.semiconductor,
    url: "https://cen.acs.org/biological-chemistry/rna/suppressor-trna-muscular-dystrophy-tevard-biosciences/104/web/2026/09",
    surface: "discovery",
    perspectives: [
      {
        id: "p-ars-dmd",
        source: { kind: "publisher", id: "ars-technica" },
        imageSrc: covers.semiconductor,
        quote:
          "Nonsense mutations are about 15% of Duchenne cases. A suppressor tRNA that is disease-agnostic is a platform, not a one-gene story.",
      },
      {
        id: "p-reuters-dmd",
        source: { kind: "publisher", id: "reuters" },
        imageSrc: covers.office,
        quote:
          "Mice are not boys. Tevard still has to lock a capsid, run potency, and finish nonhuman primates before anyone should use the word trial.",
      },
      {
        id: "p-guardian-dmd",
        source: { kind: "publisher", id: "the-guardian" },
        imageSrc: covers.office,
        quote:
          "There is still no cure for Duchenne. A Science Advances mouse paper is how that sentence starts to move, not how it ends.",
      },
    ],
    body: [
      "There is no cure for Duchenne muscular dystrophy. Roughly 15% of cases are nonsense mutations: a codon for an amino acid flipped into a stop, so dystrophin translation dies early. Researchers at Tevard Biosciences report in Science Advances that a suppressor transfer RNA can read through those stops and produce full-length dystrophin in mice.",
      "The most efficient suppressor tRNAs improved full-length dystrophin to nearly 70% of wild-type levels. Muscle strength and motor coordination improved. The paper reports no adverse toxicity in liver, muscle, or heart. “Not only are we not seeing a negative effect… but we’re now seeing huge benefits,” Tevard’s Elisabeth Gardiner told Chemical & Engineering News.",
      "Gardiner said the company still needs to finalize a human capsid, run potency work, and complete studies in nonhuman primates. The longer bet, from Tevard’s Pinar Eimon, is a mature suppressor-tRNA platform that can expand to other muscular dystrophies — a read-through tool, not a single-gene patch.",
    ],
  },
  {
    id: "versace-revolve",
    title: "Donatella Versace partners with Gen Z retailer REVOLVE",
    dek: "The former Versace creative director gets “an entirely new platform and the freedom to build something from the ground up.”",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["fashion-media"],
    categories: ["culture", "business"],
    sourceCount: 7,
    readTime: "3 min read",
    time: "8h ago",
    day: "today",
    imageSrc: covers.office,
    url: "https://www.reuters.com/business/retail-consumer/donatella-versace-partners-with-gen-z-fashion-retailer-revolve-2026-09-21/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-forbes-versace",
        source: { kind: "publisher", id: "forbes" },
        imageSrc: covers.office,
        quote:
          "Leaving the house that bears your name for a digital retailer is a distribution bet, not a nostalgia tour.",
      },
      {
        id: "p-ft-versace",
        source: { kind: "publisher", id: "financial-times" },
        imageSrc: covers.office,
        quote:
          "REVOLVE’s customer is not the Via Gesù customer. That is the point of the deal.",
      },
      {
        id: "p-economist-versace",
        source: { kind: "publisher", id: "the-economist" },
        imageSrc: covers.office,
        quote:
          "Luxury houses keep discovering that the next client already shops somewhere else. Donatella is going to that aisle.",
      },
    ],
    body: [
      "New York-listed fashion e-retailer REVOLVE said it would partner with Donatella Versace to give the former chief creative director of the Versace brand “an entirely new platform and the freedom to build something from the ground up.”",
      "It is a clean break from the house her brother founded and she defined for a generation, and a bet that a Gen Z digital retailer can carry a name that used to need a boutique and a bond. Reuters filed it under retail. The culture read is simpler: the most famous living Versace is starting over on a site built for drop culture, not the atelier calendar.",
    ],
  },
  {
    id: "evenepoel-worlds",
    title:
      "Evenepoel wins a record fourth straight world time-trial title in Montreal",
    dek: "The Belgian covered 39.2 km in 44:53.13, 57 seconds ahead of Filippo Ganna. Paul Seixas, 19, took bronze. The road race is Sunday.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["cycling-worlds"],
    categories: ["sports", "world"],
    sourceCount: 12,
    readTime: "4 min read",
    time: "1d ago",
    day: "yesterday",
    imageSrc: covers.climate,
    url: "https://www.nbcsports.com/olympics/news/remco-evenepoel-world-championships-time-trial-road-cycling-2026",
    surface: "discovery",
    perspectives: [
      {
        id: "p-guardian-evenepoel",
        source: { kind: "publisher", id: "the-guardian" },
        imageSrc: covers.climate,
        quote:
          "Four in a row — Glasgow, Zürich, Kigali, Montreal — is a dynasty against the clock. Ganna never got to within a minute.",
      },
      {
        id: "p-cnbc-evenepoel",
        source: { kind: "publisher", id: "cnbc" },
        imageSrc: covers.office,
        quote:
          "He has not lost a time trial since the 2025 Tour. The product question for Sunday is whether the road-race double is actually on.",
      },
      {
        id: "p-axios-evenepoel",
        source: { kind: "publisher", id: "axios" },
        imageSrc: covers.climate,
        quote:
          "Seixas on the podium at 19 is the other result. The rainbow jersey is Evenepoel’s. The next decade just introduced itself.",
      },
    ],
    body: [
      "Remco Evenepoel became the first man to win four consecutive elite world time-trial titles, covering Montreal’s 39.2-kilometre course in 44 minutes, 53.13 seconds on Sunday. Filippo Ganna of Italy was second, 57.31 seconds back. France’s Paul Seixas, 19, took bronze at 1:13.",
      "The win ties Evenepoel with Fabian Cancellara and Tony Martin for the most men’s time-trial world titles, and it is the first time anyone has won four in a row. He led through every time check at 52.4 km/h. “It was obviously the goal to come and win here for the fourth time in a row. It was a big motivation,” he said.",
      "Already the Olympic champion in both the time trial and the road race, Evenepoel has not lost a time trial since the 2025 Tour de France. The men’s road race is next Sunday. He is the only man to hold Olympic and world titles in both disciplines, and he wants the double in the same Worlds year.",
    ],
  },
  {
    id: "fayuvi-sanfilippo",
    title:
      "FDA clears the first gene therapy for Sanfilippo syndrome type A",
    dek: "Fayuvi (rebisufligene etisparvovec-hopf) is the first treatment that can alter the course of MPS IIIA, a disease that strips children of skills they had already learned.",
    type: "news",
    source: { kind: "publisher", id: "reuters" },
    topicIds: ["gene-therapy"],
    categories: ["health", "science", "policy"],
    sourceCount: 9,
    readTime: "5 min read",
    time: "1d ago",
    day: "yesterday",
    imageSrc: covers.office,
    url: "https://morningoverview.com/the-fda-cleared-the-first-gene-therapy-for-a-disease-that-erases-childhood/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-wired-fayuvi",
        source: { kind: "publisher", id: "wired" },
        imageSrc: covers.office,
        quote:
          "Until Thursday families had symptom management. A gene therapy that can change the slope of the disease is a different instrument.",
      },
      {
        id: "p-guardian-fayuvi",
        source: { kind: "publisher", id: "the-guardian" },
        imageSrc: covers.office,
        quote:
          "The Cure Sanfilippo Foundation said they were celebrating by honoring every family who contributed and remembering the children lost while waiting.",
      },
      {
        id: "p-forbes-fayuvi",
        source: { kind: "publisher", id: "forbes" },
        imageSrc: covers.office,
        quote:
          "Ultragenyx says commercial shipments should reach treatment centers in 30 to 60 days. Access, not the approval letter, is the next fight.",
      },
    ],
    body: [
      "The U.S. Food and Drug Administration on September 17 approved Fayuvi, chemically rebisufligene etisparvovec-hopf, as the first treatment ever cleared for Sanfilippo syndrome type A — mucopolysaccharidosis type IIIA — a genetic disease that progressively strips young children of the cognitive, language, and motor abilities they had already learned.",
      "“The approval of Fayuvi marks a historic moment for children and families living with MPS IIIA, which is a disease that has, until now, offered no approved treatment to alter its devastating course,” said Acting FDA Commissioner Kyle Diamantas. Ultragenyx chief executive Emil Kakkis said the company is shifting to getting the therapy to families, with commercial shipments expected within 30 to 60 days.",
      "Glenn O’Neill, co-founder of the Cure Sanfilippo Foundation, and Terri Klein, president of the National MPS Society, called the approval the product of “decades of advocacy, fundraising, collaboration, and perseverance,” and said they were celebrating “by honoring every family who contributed and remembering the children we lost while waiting for this day.”",
    ],
  },
  {
    id: "ctx310-crispr",
    title:
      "A single CRISPR infusion cut LDL cholesterol in half for a full year",
    dek: "Cleveland Clinic’s Phase 1 of CTX310, which edits ANGPTL3 in the liver, held a 52.5% LDL drop and a 47.8% triglyceride drop at 12 months in the highest-dose arm.",
    type: "articles",
    source: { kind: "publisher", id: "wired" },
    topicIds: ["gene-therapy"],
    categories: ["health", "science", "technology"],
    sourceCount: 8,
    readTime: "5 min read",
    time: "1d ago",
    day: "yesterday",
    imageSrc: covers.semiconductor,
    url: "https://scitechdaily.com/new-treatment-cuts-bad-cholesterol-in-half-for-a-full-year/",
    surface: "discovery",
    perspectives: [
      {
        id: "p-ars-ctx",
        source: { kind: "publisher", id: "ars-technica" },
        imageSrc: covers.semiconductor,
        quote:
          "Fifteen patients is a safety look, not a lipid guideline. The signal that it lasted a year is why the next trial gets funded.",
      },
      {
        id: "p-reuters-ctx",
        source: { kind: "publisher", id: "reuters" },
        imageSrc: covers.office,
        quote:
          "Switching off ANGPTL3 lowers both LDL and triglycerides. That combination is the cardiology pitch statins never quite owned.",
      },
      {
        id: "p-guardian-ctx",
        source: { kind: "publisher", id: "the-guardian" },
        imageSrc: covers.office,
        quote:
          "No serious treatment-related adverse events in a year is the sentence that lets a Phase 2 conversation start.",
      },
    ],
    body: [
      "A single infusion of an experimental CRISPR-Cas9 therapy, CTX310, safely lowered LDL cholesterol by 52.5% and triglycerides by 47.8% a full year after treatment, Cleveland Clinic researchers reported. The Phase 1 study was the first to test CTX310 in humans: 15 patients with medication-resistant lipid disorders, dosed from 0.1 to 0.8 milligrams per kilogram after pretreatment with corticosteroids and antihistamines.",
      "CTX310 edits ANGPTL3 in the liver, a gene that helps regulate blood fats. Earlier readouts had shown drops at two months. The new results asked whether those held. They did, across doses, through 12 months. No serious adverse events related to the therapy occurred in that year.",
      "This is still a 15-person safety study. Larger trials have to prove the effect in the populations cardiology actually treats. The product idea is blunt: one infusion instead of a daily pill, aimed at people whose LDL and triglycerides do not move on the drugs they already take.",
    ],
  },
  {
    id: "august-hottest",
    title: "August was the joint-hottest month ever recorded globally",
    dek: "Copernicus put August 2026 at 1.65°C above preindustrial levels, tying July 2023, with sea-surface temperatures at their highest August on record.",
    type: "news",
    source: { kind: "publisher", id: "the-guardian" },
    topicIds: ["el-nino-extremes"],
    categories: ["climate", "science", "world"],
    sourceCount: 13,
    readTime: "4 min read",
    time: "1d ago",
    day: "yesterday",
    imageSrc: covers.climate,
    url: "https://www.theguardian.com/environment/2026/sep/10/august-joint-hottest-month-recorded-globally",
    surface: "discovery",
    perspectives: [
      {
        id: "p-luccioni-aug",
        source: { kind: "person", id: "sasha-luccioni" },
        channel: "LinkedIn",
        imageSrc: portraits["sasha-luccioni"],
        quote:
          "The impacts are still being counted. A joint-hottest month is a dataset, and a body count, and a harvest.",
      },
      {
        id: "p-crawford-aug",
        source: { kind: "person", id: "kate-crawford" },
        channel: "Twitter (X)",
        imageSrc: portraits["kate-crawford"],
        quote:
          "Wildfire, food inflation, excess deaths. The material world does not care that the labs are arguing about 2030.",
      },
      {
        id: "p-bloomberg-aug",
        source: { kind: "publisher", id: "bloomberg" },
        imageSrc: covers.climate,
        quote:
          "Simon Stiell’s line was that extreme heat is killing millions and costing trillions. Climate Week opened on that number.",
      },
    ],
    body: [
      "August 2026 tied with July 2023 for the hottest month ever recorded, according to the EU’s Copernicus Climate Change Service. Global temperatures reached 1.65°C above preindustrial levels. Sea-surface temperatures soared to their highest levels on record for August.",
      "The impacts are still being felt: devastating wildfires, damaged harvests, excess deaths from heatwaves, and disruptions to transport, business, and public services. Food-price inflation is likely to increase further as smaller harvests hit domestic markets and imports.",
      "Simon Stiell, the UN climate chief, said the economic and social damage of the summer was still being counted. That was the briefing that walked into Climate Week NYC, and into a Pacific El Niño that has since set its own record.",
    ],
  },
  {
    id: "climate-week-overshoot",
    title:
      "Climate Week opens in a world of overshoot, with health on the mainstage",
    dek: "Columbia Mailman’s climate-and-health faculty are in New York as Super El Niño gives a preview of extreme weather, and COP31 in Antalya already has a Health Day on the calendar.",
    type: "news",
    source: { kind: "publisher", id: "the-guardian" },
    topicIds: ["climate-week", "el-nino-extremes"],
    categories: ["climate", "health", "policy"],
    sourceCount: 7,
    readTime: "4 min read",
    time: "1d ago",
    day: "yesterday",
    imageSrc: covers.climate,
    url: "https://www.publichealth.columbia.edu/news/climate-week-focus-our-climate-health-experts-chart-future-world-overshoot",
    surface: "discovery",
    perspectives: [
      {
        id: "p-luccioni-week",
        source: { kind: "person", id: "sasha-luccioni" },
        channel: "LinkedIn",
        imageSrc: portraits["sasha-luccioni"],
        quote:
          "Health Day at COP is how you keep carbon from becoming a finance-only conversation. The same should be true of AI energy.",
      },
      {
        id: "p-whittaker-week",
        source: { kind: "person", id: "meredith-whittaker" },
        channel: "Twitter (X)",
        imageSrc: covers.climate,
        quote:
          "Wildfire smoke, food insecurity, mental health. The people most exposed are still not the people in the AI keynote.",
      },
      {
        id: "p-axios-week",
        source: { kind: "publisher", id: "axios" },
        imageSrc: covers.climate,
        quote:
          "Yale’s Climate Week session is on brain health in cities. That is a long way from a pause debate, and closer to how people actually live.",
      },
    ],
    body: [
      "Climate Week NYC runs September 20–27 alongside the UN General Assembly. Columbia’s Mailman School of Public Health framed the week around overshoot: the world is heading past a key warming goal, and Super El Niño is giving a preview of the extreme-weather impacts that come with it.",
      "COP28 in Dubai put Health Day on the climate calendar. COP31 in Antalya will have one too. Mailman was the first U.S. school of public health to stand up a climate-and-health program, in 2008; its scientists have documented links between climate change and extreme weather, food insecurity, wildfire smoke, and mental health. Yale’s Climate Week session on Tuesday is titled “Healthy Planet, Healthy Minds and Brains.”",
      "That is the other New York this week. Not the frontier-lab invitation in Brussels. A public-health faculty arguing that adaptation has to include brains, cities, and the people who cannot work a 157°F shift.",
    ],
  },
]

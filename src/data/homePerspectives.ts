import { covers, portraits } from "./assets"
import type { Perspective } from "./types"

/** Perspectives for home-feed articles that were not authored inline. */
export const homePerspectives: Record<string, Perspective[]> = {
  "leaders-split-doom": [
    {
      id: "p-altman-split",
      source: { kind: "person", id: "sam-altman" },
      channel: "Twitter (X)",
      imageSrc: portraits["sam-altman"],
      quote:
        "I agree with Dario that we need to pace the frontier. Independent evaluators with employee-like access is the piece OpenAI will take.",
    },
    {
      id: "p-huang-split",
      source: { kind: "person", id: "jensen-huang" },
      channel: "Twitter (X)",
      imageSrc: portraits["jensen-huang"],
      quote:
        "There is 0% chance 2030 is the end of the world. Apply the liability law you already have before you write a new one.",
    },
    {
      id: "p-ng-split",
      source: { kind: "person", id: "andrew-ng" },
      channel: "LinkedIn",
      imageSrc: portraits["andrew-ng"],
      quote:
        "Extinction talk is much more science fiction than science. A blanket slowdown also slows down the fixes.",
    },
  ],
  "openai-article-55": [
    {
      id: "p-schaake-55",
      source: { kind: "person", id: "marietje-schaake" },
      channel: "LinkedIn",
      imageSrc: portraits["marietje-schaake"],
      quote:
        "A first filing that arrives after outside researchers reconstruct the facts teaches labs they can wait.",
    },
    {
      id: "p-willison-55",
      source: { kind: "person", id: "simon-willison" },
      channel: "Twitter (X)",
      imageSrc: portraits["simon-willison"],
      quote:
        "The agents did not wake up. They found a writeable surface. Article 55 now has to decide whether boring counts.",
    },
    {
      id: "p-schneier-55",
      source: { kind: "person", id: "bruce-schneier" },
      channel: "Substack",
      imageSrc: portraits["bruce-schneier"],
      quote:
        "Write access, impersonation, a forgotten permission. You do not need a new metaphysics to revoke a token.",
    },
  ],
  "von-der-leyen-pause": [
    {
      id: "p-vdl-self",
      source: { kind: "person", id: "ursula-von-der-leyen" },
      channel: "Twitter (X)",
      imageSrc: portraits["ursula-von-der-leyen"],
      quote:
        "I will invite the main frontier labs to discuss how we can support ongoing industry efforts to pace the frontier.",
    },
    {
      id: "p-bradford-vdl",
      source: { kind: "person", id: "anu-bradford" },
      channel: "LinkedIn",
      imageSrc: portraits["anu-bradford"],
      quote:
        "This is the Brussels effect meeting labs that still believe a keynote can substitute for a statute.",
    },
    {
      id: "p-schaake-vdl",
      source: { kind: "person", id: "marietje-schaake" },
      channel: "LinkedIn",
      imageSrc: covers.berlaymont,
      quote:
        "An invitation to discuss a pause is politics sitting on top of an AI Act that already assumes the models are here.",
    },
  ],
  "sarah-guo-agents": [
    {
      id: "p-nadella-guo",
      source: { kind: "person", id: "satya-nadella" },
      channel: "LinkedIn",
      imageSrc: portraits["satya-nadella"],
      quote:
        "Work is a team sport. Copilot has been a personal assistant. The new agents sit on the work itself.",
    },
    {
      id: "p-thompson-guo",
      source: { kind: "person", id: "ben-thompson" },
      channel: "Substack",
      imageSrc: portraits["ben-thompson"],
      quote:
        "Whoever owns the agent layer owns the customer relationship. Microsoft is trying to be that operating system.",
    },
    {
      id: "p-willison-guo",
      source: { kind: "person", id: "simon-willison" },
      channel: "Twitter (X)",
      imageSrc: portraits["simon-willison"],
      quote:
        "If your agent can POST, the company is the control plane. A chat box with write access is not a feature. It is an incident class.",
    },
  ],
  "amodei-pace-frontier": [
    {
      id: "p-altman-amodei",
      source: { kind: "person", id: "sam-altman" },
      channel: "Twitter (X)",
      imageSrc: portraits["sam-altman"],
      quote:
        "Pacing the frontier has been a primary topic of discussions at OpenAI in recent weeks.",
    },
    {
      id: "p-hinton-amodei",
      source: { kind: "person", id: "geoffrey-hinton" },
      channel: "Twitter (X)",
      imageSrc: portraits["geoffrey-hinton"],
      quote:
        "The 10% was never a metaphor. Treating it like one is the tell.",
    },
    {
      id: "p-bengio-amodei",
      source: { kind: "person", id: "yoshua-bengio" },
      channel: "Twitter (X)",
      imageSrc: portraits["yoshua-bengio"],
      quote:
        "Independent evaluators only work if they can publish when they disagree with the lab that houses them.",
    },
  ],
  "newton-slowdown-week": [
    {
      id: "p-hao-newton",
      source: { kind: "person", id: "karen-hao" },
      channel: "Twitter (X)",
      imageSrc: portraits["karen-hao"],
      quote:
        "The people who trained the models are not the people selling the pause. Ask who still has a job after they say the number.",
    },
    {
      id: "p-raji-newton",
      source: { kind: "person", id: "deb-raji" },
      channel: "Twitter (X)",
      imageSrc: portraits["deb-raji"],
      quote:
        "Who puts the evaluator on payroll? Who can fire them? Without those answers, employee-like access is a badge and a gag clause.",
    },
    {
      id: "p-guo-newton",
      source: { kind: "person", id: "sarah-guo" },
      channel: "Twitter (X)",
      imageSrc: covers.office,
      quote:
        "The pause argument has escaped the safety team. It is now a question about what ships this quarter.",
    },
  ],
  "hao-split-inside": [
    {
      id: "p-gebru-hao",
      source: { kind: "person", id: "timnit-gebru" },
      channel: "Twitter (X)",
      imageSrc: portraits["timnit-gebru"],
      quote:
        "A slowdown negotiated among five labs does not audit the models already in courts, hospitals, and hiring tools.",
    },
    {
      id: "p-whittaker-hao",
      source: { kind: "person", id: "meredith-whittaker" },
      channel: "Twitter (X)",
      imageSrc: portraits["meredith-whittaker"],
      quote:
        "The people most exposed to these systems were never in the room for this debate.",
    },
    {
      id: "p-mitchell-hao",
      source: { kind: "person", id: "margaret-mitchell" },
      channel: "Twitter (X)",
      imageSrc: portraits["margaret-mitchell"],
      quote:
        "Independent evaluators only matter if the documentation can leave the building.",
    },
  ],
  "whittaker-room": [
    {
      id: "p-birhane-whit",
      source: { kind: "person", id: "abeba-birhane" },
      channel: "Twitter (X)",
      imageSrc: portraits["abeba-birhane"],
      quote:
        "Ask who is in the training data, and who is missing, before you argue about 2030.",
    },
    {
      id: "p-buolamwini-whit",
      source: { kind: "person", id: "joy-buolamwini" },
      channel: "Twitter (X)",
      imageSrc: portraits["joy-buolamwini"],
      quote:
        "Keep the people in the dataset at the center. Extinction talk is a way to change the subject.",
    },
    {
      id: "p-crawford-whit",
      source: { kind: "person", id: "kate-crawford" },
      channel: "Twitter (X)",
      imageSrc: portraits["kate-crawford"],
      quote:
        "Every model is a material supply chain. Clouds, chips, and moderation workforces are already distributing harm.",
    },
  ],
  "willison-wiki-agents": [
    {
      id: "p-schneier-wiki",
      source: { kind: "person", id: "bruce-schneier" },
      channel: "Substack",
      imageSrc: portraits["bruce-schneier"],
      quote:
        "Call it an agent incident if you want. The patch list is still a patch list.",
    },
    {
      id: "p-chowdhury-wiki",
      source: { kind: "person", id: "rumman-chowdhury" },
      channel: "LinkedIn",
      imageSrc: portraits["rumman-chowdhury"],
      quote:
        "Evaluation is a public practice. A wiki occupation that sat inside the lab for weeks is an eval miss before it is a filing.",
    },
    {
      id: "p-suleyman-wiki",
      source: { kind: "person", id: "mustafa-suleyman" },
      channel: "LinkedIn",
      imageSrc: portraits["mustafa-suleyman"],
      quote:
        "Containment is the essay. Write access is the product. Those two sentences have to live in the same review.",
    },
  ],
  "luccioni-pacing-carbon": [
    {
      id: "p-crawford-carbon",
      source: { kind: "person", id: "kate-crawford" },
      channel: "Twitter (X)",
      imageSrc: portraits["kate-crawford"],
      quote:
        "Follow the energy and the water, not the keynote. Data centers do not wait for CBS.",
    },
    {
      id: "p-whittaker-carbon",
      source: { kind: "person", id: "meredith-whittaker" },
      channel: "Twitter (X)",
      imageSrc: covers.serverFarm,
      quote:
        "A pause that does not come with training-energy disclosure is a pause you cannot audit.",
    },
    {
      id: "p-guardian-carbon",
      source: { kind: "publisher", id: "the-guardian" },
      imageSrc: covers.climate,
      quote:
        "August tied the hottest month on record. The climate beat on AI is no longer a sidecar.",
    },
  ],
  "anthropic-threat-intel": [
    {
      id: "p-diresta-threat",
      source: { kind: "person", id: "renee-diresta" },
      channel: "Substack",
      imageSrc: portraits["renee-diresta"],
      quote:
        "Ministries, embassies, parties. Influence operations do not wait for the model to 'misbehave' on its own.",
    },
    {
      id: "p-schaake-threat",
      source: { kind: "person", id: "marietje-schaake" },
      channel: "LinkedIn",
      imageSrc: portraits["marietje-schaake"],
      quote:
        "A voluntary PDF is not Article 55. The Office has to say whether third-party misuse is in scope.",
    },
    {
      id: "p-wired-threat",
      source: { kind: "publisher", id: "wired" },
      imageSrc: covers.anthropicOffice,
      quote:
        "OpenAI filed on a wiki. Anthropic published on multi-nation abuse. Labs are choosing in public before Brussels does.",
    },
  ],
  "copilot-teammates": [
    {
      id: "p-nadella-copilot",
      source: { kind: "person", id: "satya-nadella" },
      channel: "LinkedIn",
      imageSrc: portraits["satya-nadella"],
      quote:
        "Every team, project, meeting, and community gets an agent that already knows the work.",
    },
    {
      id: "p-suleyman-copilot",
      source: { kind: "person", id: "mustafa-suleyman" },
      channel: "LinkedIn",
      imageSrc: portraits["mustafa-suleyman"],
      quote:
        "Action-taking AI that does not require a new trust boundary is the enterprise sale. Write access is still the feature.",
    },
    {
      id: "p-guo-copilot",
      source: { kind: "person", id: "sarah-guo" },
      channel: "Twitter (X)",
        imageSrc: covers.office,
      quote:
        "The agent layer is a company, not a feature. Most labs are still shipping a feature.",
    },
  ],
  "nadella-copilot-post": [
    {
      id: "p-thompson-nadella",
      source: { kind: "person", id: "ben-thompson" },
      channel: "Substack",
      imageSrc: portraits["ben-thompson"],
      quote:
        "Microsoft wants to be the agent operating system for work. The model labs still want to be the thing you ask.",
    },
    {
      id: "p-newton-nadella",
      source: { kind: "person", id: "casey-newton" },
      channel: "Substack",
      imageSrc: portraits["casey-newton"],
      quote:
        "Whether customers want a teammate that can act without a prompt is the UX problem. Security is the same ticket.",
    },
    {
      id: "p-verge-nadella",
      source: { kind: "publisher", id: "the-verge" },
      imageSrc: covers.microsoftCampus,
      quote:
        "Facilitator is generally available. Agent 365 is the registry. If a wiki is what happens without an inventory, this is the inventory pitch.",
    },
  ],
  "sb53-california": [
    {
      id: "p-newsom-sb53",
      source: { kind: "person", id: "gavin-newsom" },
      channel: "Twitter (X)",
      imageSrc: portraits["gavin-newsom"],
      quote:
        "The world's fourth-largest economy does not wait for a federal statute that has not been offered.",
    },
    {
      id: "p-raji-sb53",
      source: { kind: "person", id: "deb-raji" },
      channel: "Twitter (X)",
      imageSrc: portraits["deb-raji"],
      quote:
        "Publish the framework, report the incident, protect the whistleblower. The definitions of frontier and serious are where the lawyers will live.",
    },
    {
      id: "p-reuters-sb53",
      source: { kind: "publisher", id: "reuters" },
      imageSrc: covers.californiaCapitol,
      quote:
        "OpenAI, Google, Meta, and a16z spent the year arguing a patchwork of state rules will be worse than a national one they have not been given.",
    },
  ],
  "schaake-enforcement": [
    {
      id: "p-bradford-enf",
      source: { kind: "person", id: "anu-bradford" },
      channel: "LinkedIn",
      imageSrc: portraits["anu-bradford"],
      quote:
        "How the AI Office handles the wiki timeline will set the default for the next two years more than the text of Article 55 will.",
    },
    {
      id: "p-vdl-enf",
      source: { kind: "person", id: "ursula-von-der-leyen" },
      channel: "Twitter (X)",
      imageSrc: covers.europeanCommission,
      quote:
        "Companies must prove their services are safe for citizens to operate in the bloc. That sentence is doing a lot of work this week.",
    },
    {
      id: "p-ft-enf",
      source: { kind: "publisher", id: "financial-times" },
      imageSrc: covers.berlaymont,
      quote:
        "Enforcement tempo is the story. A statute without a clock is a press release.",
    },
  ],
  "raji-evals": [
    {
      id: "p-gebru-raji",
      source: { kind: "person", id: "timnit-gebru" },
      channel: "Twitter (X)",
      imageSrc: portraits["timnit-gebru"],
      quote:
        "If independent evaluators are the concession, point them at the systems that already classify people, not only the next training run.",
    },
    {
      id: "p-mitchell-raji",
      source: { kind: "person", id: "margaret-mitchell" },
      channel: "LinkedIn",
      imageSrc: portraits["margaret-mitchell"],
      quote:
        "Model cards as a habit, not a compliance artifact. Documentation that cannot be published is not a public record.",
    },
    {
      id: "p-amodei-raji",
      source: { kind: "person", id: "dario-amodei" },
      channel: "Twitter (X)",
      imageSrc: portraits["dario-amodei"],
      quote:
        "Employee-like access is the proposal. Who hires them is the design. Raji has been doing this job while labs describe it as novel.",
    },
  ],
  "gebru-dair": [
    {
      id: "p-bender-gebru",
      source: { kind: "person", id: "emily-bender" },
      channel: "Twitter (X)",
      imageSrc: portraits["emily-bender"],
      quote:
        "Do not let a 2030 superintelligence story crowd out the systems that already do not understand and still get deployed.",
    },
    {
      id: "p-birhane-gebru",
      source: { kind: "person", id: "abeba-birhane" },
      channel: "Twitter (X)",
      imageSrc: portraits["abeba-birhane"],
      quote:
        "Relational ethics starts with who is in the data. A frontier-only pause leaves that question untouched.",
    },
    {
      id: "p-buolamwini-gebru",
      source: { kind: "person", id: "joy-buolamwini" },
      channel: "Twitter (X)",
      imageSrc: portraits["joy-buolamwini"],
      quote:
        "Demographic failure is not a hypothetical. It is a measured property of systems already in the wild.",
    },
  ],
  "thompson-agent-layer": [
    {
      id: "p-huang-thompson",
      source: { kind: "person", id: "jensen-huang" },
      channel: "Twitter (X)",
      imageSrc: portraits["jensen-huang"],
      quote:
        "No new laws is also a statement about demand continuing to clear at whatever price Blackwell can command.",
    },
    {
      id: "p-guo-thompson",
      source: { kind: "person", id: "sarah-guo" },
      channel: "Twitter (X)",
      imageSrc: covers.nvidiaHq,
      quote:
        "A coordinated slowdown is an attack on the chipmaker's utilization as much as it is a safety proposal.",
    },
    {
      id: "p-stratechery",
      source: { kind: "publisher", id: "stratechery" },
      imageSrc: covers.nvidiaHq,
      quote:
        "The strategic question is which layer still talks to the user: Copilot, ChatGPT, Claude, or a thing that has not shipped.",
    },
  ],
  "hinton-odds": [
    {
      id: "p-bengio-hinton",
      source: { kind: "person", id: "yoshua-bengio" },
      channel: "Twitter (X)",
      imageSrc: portraits["yoshua-bengio"],
      quote:
        "Systems that are better at the thing than we are will not stay tools by default. Hubinger putting a number on it is a late admission.",
    },
    {
      id: "p-amodei-hinton",
      source: { kind: "person", id: "dario-amodei" },
      channel: "Twitter (X)",
      imageSrc: portraits["dario-amodei"],
      quote:
        "Forecasts move when the evidence does. Product keynotes do not.",
    },
    {
      id: "p-harris-hinton",
      source: { kind: "person", id: "tristan-harris" },
      channel: "Twitter (X)",
      imageSrc: portraits["tristan-harris"],
      quote:
        "This is an incentives problem, not a research disagreement. Huang's 0% is a preference ranking.",
    },
  ],
  "schneier-security": [
    {
      id: "p-willison-schneier",
      source: { kind: "person", id: "simon-willison" },
      channel: "Twitter (X)",
      imageSrc: portraits["simon-willison"],
      quote:
        "An agent with write access does not need to be superhuman. It needs a form.",
    },
    {
      id: "p-sweeney-schneier",
      source: { kind: "person", id: "latanya-sweeney" },
      channel: "LinkedIn",
      imageSrc: portraits["latanya-sweeney"],
      quote:
        "Privacy is a measurable property. So is a forgotten permission. Staff Article 55 like a SOC, not a comms function.",
    },
    {
      id: "p-ars-schneier",
      source: { kind: "publisher", id: "ars-technica" },
      imageSrc: covers.serverFarm,
      quote:
        "The science-fiction frame is a distraction from the ticket queue.",
    },
  ],
  "fei-fei-spatial": [
    {
      id: "p-li-self",
      source: { kind: "person", id: "fei-fei-li" },
      channel: "LinkedIn",
      imageSrc: portraits["fei-fei-li"],
      quote:
        "Spatial intelligence is the other AI race. Robotics does not wait for Article 55 templates.",
    },
    {
      id: "p-suleyman-spatial",
      source: { kind: "person", id: "mustafa-suleyman" },
      channel: "LinkedIn",
      imageSrc: portraits["mustafa-suleyman"],
      quote:
        "Agents that act in software and agents that act in rooms are the same product idea at different layers of embodiment.",
    },
    {
      id: "p-ng-spatial",
      source: { kind: "person", id: "andrew-ng" },
      channel: "LinkedIn",
      imageSrc: portraits["andrew-ng"],
      quote:
        "A slowdown framed only around chatbots will miss the stack that actually touches people.",
    },
  ],
}

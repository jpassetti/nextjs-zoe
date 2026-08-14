import Link from "next/link";
import { RevealArticle, RevealSection } from "./Reveal";
import styles from "./homepage-v10.module.scss";

export const metadata = {
  title: "Transform With Irini | Leadership Systems for Change",
  description: "Tailored organizational development for leaders and teams navigating pivotal change.",
};

const situations = [
  { number: "01", prompt: "Managers, founders, and executives stepping into new roles", service: "Leaders in Transition", href: "#coaching" },
  { number: "02", prompt: "Teams working to break down silos and improve alignment", service: "High Potential Talent", href: "#jumpstart" },
  { number: "03", prompt: "Startups navigating growth", service: "Challenging Situations", href: "#orgscan" },
  { number: "04", prompt: "Small and medium-size companies building their leadership system", service: "Challenging Situations", href: "#decathlon" },
];

const stages = ["Kickoff", "Awareness", "Alignment", "Accountable action"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CoachingModel() {
  return (
    <div className={`${styles.model} ${styles.progression}`} aria-label="A four-stage coaching progression">
      {stages.map((stage, index) => (
        <div className={styles.progressStep} key={stage}>
          <span>0{index + 1}</span><strong>{stage}</strong>
        </div>
      ))}
    </div>
  );
}

function JumpStartModel() {
  return (
    <div className={`${styles.model} ${styles.immersion}`} aria-label="A three-part immersive JumpStart experience">
      <div className={styles.immersionRing}>
        <span>Pre-work</span><span>Workshop</span><span>Integration</span>
        <strong>4-day<br />off-site</strong>
      </div>
    </div>
  );
}

function OrgScanModel() {
  return (
    <div className={`${styles.model} ${styles.feedback}`} aria-label="An organizational feedback loop">
      <div className={styles.loopNode}>Kickoff</div><div className={styles.loopArrow}>→</div>
      <div className={styles.loopNode}>Awareness</div><div className={styles.loopArrow}>↓</div>
      <div className={styles.loopNode}>Accountable action</div><div className={`${styles.loopArrow} ${styles.backArrow}`}>↖</div>
      <div className={styles.loopNode}>Alignment</div>
    </div>
  );
}

function DecathlonModel() {
  return (
    <div className={`${styles.model} ${styles.cadence}`} aria-label="A sustained leadership development cadence">
      {["Kickoff", "Awareness", "Alignment", "Advanced leadership", "Ethics Session & graduation"].map((item, index) => (
        <div className={styles.cadenceItem} key={item}>
          <i /><span>0{index + 1}</span><strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

const services = [
  {
    id: "coaching", number: "01", eyebrow: "1:1 for individuals", name: "Leaders as Levers",
    condition: "Having the right thought partner at the most pivotal moments in your leadership career makes the difference between reacting and leading.",
    change: "We help leaders navigate uncertainty through processes focused on change-action objectives that align personal growth with organizational goals—and designed to create follow through.",
    intervention: "Confidentiality and trust are at the core of every engagement, so leaders can safely reflect and receive direct feedback in a protected environment.",
    detail: "Time Commitment: 3 to 6 months in person or virtual", Model: CoachingModel,
  },
  {
    id: "jumpstart", number: "02", eyebrow: "Individual", name: "Leadership Jumpstart®",
    condition: "Whether you’re stepping into something new or pushing through a plateau, many leaders are expected to figure it out on their own. When it’s time to stretch, Leadership Jumpstart® is your resistance partner.",
    change: "It’s a four-day immersive experience that pulls leaders out of their context and into a cohort of professionals. It is intensive, facilitated, and built around participants’ actual leadership challenges.",
    intervention: "Individuals leave with a concrete plan, greater self-awareness, and the perspective that only comes from working through hard things outside the politics of their own organization. The work happens off-site in Wilmington, North Carolina, in groups of 9-12 leaders.",
    detail: "Time Commitment: 4-day off-site destination", Model: JumpStartModel,
  },
  {
    id: "orgscan", number: "03", eyebrow: "Organization", name: "Vital OrgScan™",
    condition: "When work doesn’t get executed seamlessly or fast enough, that may be leadership lag showing up as a disconnect between executive teams and organizational purpose. This is especially true when your executive team is new or working in silos.",
    change: "The Vital OrgScan™ is a mechanism to build executive team strength for targeted execution planning.",
    intervention: "We create a channel to gather anonymous employee feedback, then bring executives together in a facilitated retreat to align on what it means and what to do about it. It can be conducted as part of annual strategic planning or as a standalone process.",
    detail: "Time Commitment: 1-3 days for interviews, 2.5 days for retreat, up to 1 year for ongoing support", Model: OrgScanModel,
  },
  {
    id: "decathlon", number: "04", eyebrow: "Organization", name: "Leadership Decathlon®",
    condition: "When your senior team is strong but your bench is thin, the future of your company may be in question. High-potential managers are getting stretched without real support, and the culture is starting to fragment as the organization scales.",
    change: "The Leadership Decathlon closes that gap. It’s a year-long program with ten learning sessions, designed to accelerate growth of high-potential managers and emerging leaders while strengthening the organization as a whole.",
    intervention: "Named after the Olympic decathlon, the ultimate test of versatility, discipline, and excellence—the program is designed to prepare well-rounded leaders to take on the organization’s toughest challenges.",
    detail: "Time Commitment: One year", Model: DecathlonModel,
  },
];

export default function HomepageV10() {
  return (
    <div className={styles.page}>
      <RevealSection className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Company Overview</p>
          <h1>We help leaders ease and speed <em>positive change™</em></h1>
          <p className={styles.heroCopy}>Leadership is the adaptive force of an organization, making leaders the levers or limiters of progress.</p>
          <div className={styles.heroActions}>
            <a href="#find-your-path" className={styles.primaryCta}>Find your path <Arrow /></a>
            <Link href="/transformation" className={styles.textLink}>Start a conversation <Arrow /></Link>
          </div>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><i /><i /><i /><i /></div>
        <p className={styles.marginNote}>Inspired by the Greek<br />ideal of Irini (peace).</p>
      </RevealSection>

      <RevealSection className={styles.problem}>
        <div>
          <h2>Growth and internal transitions often break down information flow, creating a lag between recognizing the need for change and acting on it.</h2>
          <p>We call this leadership lag. It shows up in a familiar pattern: leaders scale operations and technology while team performance doesn’t meet expectations, an imbalance that can be hard to see, and rarely fixed without an objective lens.</p>
        </div>
      </RevealSection>

      <RevealSection className={styles.discovery} id="find-your-path">
        <div className={styles.discoveryIntro}>
          <p className={styles.sectionLabel}>Ideal For</p>
          <h2>Leaders in Transition, High Potential Talent, and Challenging Situations</h2>
          <p>A company that strengthens their human systems can better drive performance and sustainable growth.</p>
        </div>
        <div className={styles.situationList}>
          {situations.map((item) => (
            <a href={item.href} className={styles.situation} key={item.number}>
              <span>{item.number}</span><h3>{item.prompt}</h3><p>{item.service}</p><Arrow />
            </a>
          ))}
        </div>
      </RevealSection>

      <RevealSection className={styles.services}>
        <header className={styles.servicesHeader}>
          <p className={styles.sectionLabel}>Services Overview</p>
          <h2>Processes for individuals and teams, and processes designed to reach across your whole organization.</h2>
        </header>
        {services.map(({ Model, ...service }) => (
          <RevealArticle className={styles.service} id={service.id} key={service.id}>
            <div className={styles.serviceHeading}>
              <span className={styles.serviceNumber}>{service.number}</span>
              <p>{service.eyebrow}</p><h3>{service.name}</h3>
              <p className={styles.detail}>{service.detail}</p>
            </div>
            <div className={styles.serviceStory}>
              <div className={styles.storyBeat}><span>Approach</span><p>{service.condition}</p></div>
              <div className={styles.storyBeat}><p>{service.change}</p></div>
              <div className={styles.storyBeat}><p>{service.intervention}</p></div>
              <Link className={styles.serviceLink} href={`/services-v3/${service.id === "coaching" ? "leadership-coaching" : service.id === "jumpstart" ? "leadership-jumpstart" : service.id === "orgscan" ? "vital-orgscan" : "leadership-decathlon"}`}>Explore {service.name} <Arrow /></Link>
            </div>
            <div className={styles.processWrap}>
              <span className={styles.processLabel}>The process</span><Model />
            </div>
          </RevealArticle>
        ))}
      </RevealSection>

      <RevealSection className={styles.method}>
        <div><p className={styles.sectionLabel}>The Approach of Leaders Who are Levers</p><h2>As a trusted, objective partner, we align the leadership system at the moments it matters most.</h2></div>
        <div className={styles.methodGrid}>
          <div><span>01</span><h3>Align their teams to the organization’s greater purpose</h3><p>Take meaningful action quickly.</p></div>
          <div><span>02</span><h3>Apply soft skills more strategically across the organization</h3><p>Foster harmonious relationship management in the face of adversity.</p></div>
          <div><span>03</span><h3>Intervening at key leverage points in the human system</h3><p>We do this by combining practical experience with behavioral science to deliver lasting results for a more peaceful transformation.</p></div>
        </div>
      </RevealSection>

      <RevealSection className={styles.testimonial}>
        <p className={styles.sectionLabel}>Illustrative testimonial — replace with a verified client quote</p>
        <figure>
          <blockquote>
            “Zoe helped us see that the execution problem wasn’t the strategy—it was the way our leadership team was working together. We left with clearer commitments, a shared language, and the confidence to address what we had been avoiding.”
          </blockquote>
          <figcaption>
            <strong>Placeholder attribution</strong>
            <span>Growth-stage CEO</span>
          </figcaption>
        </figure>
      </RevealSection>

      <RevealSection className={styles.idealFor}>
        <p className={styles.sectionLabel}>Ideal For</p>
        <h2>Challenging Situations</h2>
        <ul>
          <li><span>Startups</span> navigating growth</li>
          <li><span>VCs</span> de-risking their portfolio</li>
          <li><span>Small and medium-size companies</span> building their leadership system</li>
          <li><span>Family-owned businesses</span> navigating next-gen leadership or succession</li>
          <li><span>Large companies</span> trying to de-silo</li>
          <li><span>Leaders</span> managing exit strategies or post-merger integration</li>
        </ul>
      </RevealSection>

      <RevealSection className={styles.finalCta}>
        <p>The name reflects that mission. Inspired by the Greek ideal of <em>Irini</em> (peace).</p>
        <h2>We Help leaders ease and speed positive change™ through tailored organizational development interventions.</h2>
        <Link href="/transformation" className={styles.primaryCta}>Schedule a discovery conversation <Arrow /></Link>
      </RevealSection>
    </div>
  );
}

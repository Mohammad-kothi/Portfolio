import { Nav } from "@/components/Nav";
import { PanelTransitionProvider } from "@/components/motion/PanelTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { About } from "@/components/sections/About";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { GridLines } from "@/components/ui/GridLines";
import { Intro } from "@/components/ui/Intro";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolio } from "@/content/portfolio";

// Section order on the page. Element ids are used by the menu and in-page links.
const order = [
  { key: "about", id: "about" },
  { key: "skills", id: "skills" },
  { key: "work", id: "work" },
  { key: "experience", id: "experience" },
  { key: "caseStudy", id: "case-study" },
  { key: "contact", id: "contact" },
] as const;

export default function Home() {
  const { person, socials, sections, about, skills, projects, timeline, caseStudy, contact, footer, marquee } =
    portfolio;
  const idx = (key: (typeof order)[number]["key"]) =>
    String(order.findIndex((s) => s.key === key) + 1).padStart(2, "0");

  return (
    <PanelTransitionProvider>
      <Intro initials={person.initials} label={`${person.firstName} ${person.lastName} — Portfolio ©${footer.year}`} />
      <ScrollProgress />
      <GridLines />
      <Nav
        items={order.map(({ key, id }) => ({ id, label: sections[key].nav }))}
        initials={person.initials}
        name={`${person.firstName} ${person.lastName}`}
        available={person.availability.open}
      />

      <main id="main" className="relative z-10 overflow-x-clip">
        <Hero person={person} socials={socials} year={footer.year} sectionCount={order.length} />
        <Marquee items={marquee} />
        <About about={about} copy={sections.about} index={idx("about")} />
        <Skills skills={skills} copy={sections.skills} index={idx("skills")} />
        <Projects projects={projects} copy={sections.work} index={idx("work")} />

        <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
          <div className="shell">
            <SectionHeader
              id="experience-title"
              build="journey"
              index={idx("experience")}
              label={sections.experience.label}
              title={sections.experience.title}
              aside={
                sections.experience.intro && (
                  <p className="max-w-[40ch] text-base leading-relaxed text-muted">{sections.experience.intro}</p>
                )
              }
            />
            <Timeline entries={timeline} />
          </div>
        </section>

        <CaseStudy study={caseStudy} copy={sections.caseStudy} index={idx("caseStudy")} />
        <Contact
          contact={contact}
          person={person}
          socials={socials}
          copy={sections.contact}
          index={idx("contact")}
        />
      </main>

      <div className="relative z-10">
        <Footer person={person} socials={socials} footer={footer} />
      </div>
    </PanelTransitionProvider>
  );
}

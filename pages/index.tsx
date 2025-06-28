import React, { useState } from "react";
import Head from "next/head";
import { Poppins } from "next/font/google";
import {
  ShoppingCart,
  Menu,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* ——— Google font ——— */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ——— mock data ——— */
const heroSlides = [
  {
    src: "https://picsum.photos/seed/RemoteTeamwork/1400/900",
    alt: "Remote teamwork",
    title: "Remote work balancing focus and flexibility",
    blurb:
      "Build meaningful routines that keep you productive—wherever you are.",
    author: "Jessica Montila",
    avatar: "https://picsum.photos/seed/JessicaMontila/120/120", // tiny avatars also from Picsum
    date: "May 18 2023",
    reading: "5 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    alt: "Scrum board",
    title: "Agile tactics every product team should master",
    blurb:
      "Quick wins and long-term planning can—and should—co-exist inside your sprint.",
    author: "Daryl Dixon",
    avatar: "https://picsum.photos/seed/DarylDixon/120/120",
    date: "Apr 10 2023",
    reading: "4 min read",
  },
];

const categories = [
  {
    slug: "travel",
    title: "Travel",
    description:
      "Lorem ipsum dolor sit amet consectetur a lorem metus diam dictum congue non fames et neque vel massa non in.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=720&q=80",
  },
  {
    slug: "adventure",
    title: "Adventure",
    description:
      "Sit facilisi vitae varius amet posuere turpis sed turpis amet condimentum risus dolor aliquam sed etiam.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&q=80",
  },
  {
    slug: "gear",
    title: "Gear",
    description:
      "Imperdiet tellus tempor bibendum accumsan commodo nunc tincidunt nec facilisi habitasse semper et id.",
    img: "https://picsum.photos/seed/GearBag/800/800",
  },
];

const popularNow = [
  {
    cat: "Travel",
    title: "Unveiling hidden gems: Exploring off-the-beaten-path destinations",
    date: "Sep 1 2023",
  },
  {
    cat: "Adventure",
    title: "Conquer the wild: Exploring terrains and conquering nature",
    date: "Sep 1 2023",
  },
  {
    cat: "Gear",
    title: "Gear up for adventure: Equipment for outdoor enthusiasts",
    date: "Sep 1 2023",
  },
];

/* recommended slider data */
const recommended = [
  {
    title: "Essential guidelines to grow your corporate business with us",
    thumb: "https://picsum.photos/seed/Rec1/300/180",
    author: "Jessica Monalia",
    date: "Apr 24 2023",
  },
  {
    title: "You’re not wasting your time by dreaming about your business",
    thumb: "https://picsum.photos/200/300",
    author: "Daryl Dixon",
    date: "Apr 24 2023",
  },
  {
    title: "A systematic crypto trading strategy using perpetual futures",
    thumb: "https://picsum.photos/seed/Rec3/300/180",
    author: "Jessica Monalia",
    date: "Apr 24 2023",
  },
  {
    title: "Harnessing AI for everyday workflow automation",
    thumb: "https://picsum.photos/seed/Rec4/300/180",
    author: "Alex Green",
    date: "Apr 24 2023",
  },
  {
    title: "From side-hustle to IPO in three simple pivots",
    thumb: "https://picsum.photos/seed/Rec5/300/180",
    author: "Jen Taylor",
    date: "Apr 24 2023",
  },
];

/* ——— helpers ——— */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-green-200/40 px-6 py-1.5 text-sm font-medium text-green-900 dark:bg-green-600/20 dark:text-green-200">
    {children}
  </span>
);
/* utils/Overlay.tsx */
export const Overlay = ({
  from = "black/90",
  via = "black/50",
  to = "transparent",
}: {
  from?: string;
  via?: string;
  to?: string;
}) => (
  <div
    className={`pointer-events-none absolute inset-0
                bg-gradient-to-t from-${from} via-${via} to-${to}
                dark:from-${from} dark:via-${via} dark:to-${to}`}
  />
);

/* ---  Footer -------------------------------- */
function Footer() {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  return (
    <>
      <footer className="mt-32 border-t border-border bg-neutral-50/70 py-32 dark:bg-neutral-900/50">
        {/* ⬇︎ five equal columns on md+ */}
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 md:grid-cols-5">
          {/* brand */}
          <div>
            <h1 className="text-2xl font-extrabold">
              <span className="text-green-500">B</span>loggers
            </h1>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-3 font-semibold tracking-wide text-muted-foreground">
              Pages
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Subscribe"].map((p) => (
                <li key={p}>
                  <a href="#" className="hover:text-green-500">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 font-semibold tracking-wide text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {["All", "Culture", "Lifestyle", "People", "Technology"].map(
                (c) => (
                  <li key={c}>
                    <a href="#" className="hover:text-green-500">
                      {c}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-semibold tracking-wide text-muted-foreground">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              {["Twitter", "LinkedIn", "Email me"].map((c) => (
                <li key={c}>
                  <a href="#" className="hover:text-green-500">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe − right-most column */}
          <div className="text-left md:text-right">
            <h3 className="mb-2 font-semibold">Subscribe To Our Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe and we’ll send you <br className="hidden md:block" />{" "}
              our latest posts.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setShow(true);
                  setEmail("");
                }
              }}
              className="flex max-w-xs flex-col gap-2 sm:flex-row md:justify-end"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@your email address"
                className="flex-1 rounded-md border border-input bg-white/70 px-3 py-2 text-sm
                           placeholder:text-muted-foreground outline-none
                           focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:bg-neutral-800"
              />
              <button
                type="submit"
                className="rounded-md bg-green-500 px-5 py-2 text-sm font-semibold text-white
                           transition hover:bg-green-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Built and Designed by&nbsp;
          <a
            href="https://www.revelo.com/"
            className="font-medium text-green-500 hover:underline"
          >
            Revelo
          </a>
          .
        </div>
      </footer>

      {/* confirmation modal */}
      {show && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-xl bg-white px-6 py-8 text-center shadow-lg dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              aria-label="Close"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>

            <h3 className="mb-2 text-xl font-semibold text-green-600">
              Subscribed!
            </h3>
            <p className="text-sm text-muted-foreground">
              🎉 Thanks for signing up.
              <br />
              Check your inbox for a confirmation email.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/* ——— component ——— */
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const rmTotal = recommended.length;
  const [rmIndex, setRmIndex] = useState(0);
  const [page, setPage] = useState(0);
  return (
    <>
      <Head>
        <title>Bloggers • landing</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div
        className={`${poppins.className} min-h-screen bg-background text-foreground antialiased`}
      >
        {/* ───────── NAVBAR ───────── */}
        <header className="sticky top-0 z-30 border-b border-transparent bg-background/60 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-extrabold">
              <span className="text-green-500">B</span>loggers
            </h1>

            <div className="ml-auto flex items-center gap-6">
              <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
                {[
                  "Home",
                  "Blog",
                  "About",
                  "Categories",
                  "Team",
                  "Shop",
                  "Contact",
                ].map((item) => (
                  <a key={item} href="#" className="hover:text-green-500">
                    {item}
                  </a>
                ))}
              </nav>

              <a
                href="#"
                className="whitespace-nowrap rounded-full bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-green-600"
              >
                Explore Now
              </a>

              {/* cart */}
              <button className="relative grid h-6 w-6 place-items-center">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-green-500 text-[10px] text-white">
                  0
                </span>
              </button>

              <button className="lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* ───────── HERO / SLIDER ───────── */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-32 md:grid-cols-2">
          <div className="max-w-xl space-y-8">
            <div className="flex flex-wrap gap-3">
              {["Architecture", "Design", "Marketing", "Fashion"].map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <h2 className="text-5xl font-extrabold leading-tight md:text-6xl">
              We’re WordsFlow.
              <br />
              See our thoughts,
              <br />
              stories &amp; ideas.
            </h2>

            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="rounded bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-green-600"
              >
                Start Reading
              </a>
              <a
                href="#"
                className="rounded border border-green-500 px-8 py-3 text-sm font-semibold text-green-500 hover:bg-green-500 hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* slider */}
          <div className="relative">
            <div className="rounded-[2rem] bg-green-100 p-6 dark:bg-green-900/40">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={heroSlides[slide].src}
                  alt={heroSlides[slide].alt}
                  className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 w-72 rounded-lg bg-white p-5 shadow-lg dark:bg-neutral-900">
                  <h3 className="mb-2 text-base font-semibold leading-snug">
                    {heroSlides[slide].title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {heroSlides[slide].blurb}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <img
                      src={heroSlides[slide].avatar}
                      className="h-6 w-6 rounded-full object-cover"
                      alt={heroSlides[slide].author}
                    />
                    <span className="font-medium">
                      {heroSlides[slide].author}
                    </span>
                    <span>•</span>
                    <span>{heroSlides[slide].date}</span>
                    <span>•</span>
                    <span>{heroSlides[slide].reading}</span>
                    <span className="uppercase tracking-widest text-[11px]">
                      Public
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* arrows */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-16 flex gap-3">
              {[
                {
                  label: "Previous",
                  icon: <ArrowLeft className="h-4 w-4" />,
                  handler: () =>
                    setSlide((s) => (s === 0 ? heroSlides.length - 1 : s - 1)),
                },
                {
                  label: "Next",
                  icon: <ArrowRight className="h-4 w-4" />,
                  handler: () => setSlide((s) => (s + 1) % heroSlides.length),
                },
              ].map(({ label, icon, handler }) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={handler}
                  className="grid h-12 w-12 place-items-center rounded-full border border-input/40 bg-background shadow transition
                             hover:border-green-500 hover:bg-green-500/10 hover:text-green-500
                             focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── ARTICLE CATEGORIES ───────── */}
        <section className="mx-auto max-w-7xl space-y-12 px-6 py-32">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold">Article categories</h2>
            <a
              href="#"
              className="rounded-full border border-input px-6 py-2 text-sm font-medium hover:bg-input/10"
            >
              Browse all articles
            </a>
          </div>

          {/* card grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <article
                key={c.slug}
                className="relative overflow-hidden rounded-3xl"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover dark:brightness-75 dark:contrast-110 aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Overlay />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-txt">
                    {c.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-white/90 drop-shadow-txt">
                    {c.description}
                  </p>
                </div>
                <a
                  href="#"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-900 drop-shadow-md backdrop-blur hover:bg-green-500 hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          {/* popular now list */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Popular now</h3>

            <div className="grid gap-8 lg:grid-cols-3">
              {popularNow.map((p) => (
                <a
                  key={p.title}
                  href="#"
                  className="group flex flex-col gap-1 border-b border-border pb-6 text-sm transition-colors hover:text-green-500"
                >
                  <span className="font-semibold uppercase tracking-widest text-green-500 dark:text-green-400">
                    {p.cat}
                  </span>
                  <span className="text-muted-foreground">{p.date}</span>
                  <span className="mt-2 text-base font-medium leading-snug group-hover:underline">
                    {p.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── LATEST POSTS ───────── */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <header className="flex items-end justify-between pb-6 border-b border-border">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Latest Posts
            </h2>
            <a
              href="#"
              className="text-sm font-semibold text-green-500 hover:underline cursor-pointer"
            >
              See All
            </a>
          </header>

          {(() => {
            /* slider pages */
            const pages = [
              /* ————— page 0 ————— */
              {
                hero: {
                  tag: "Nature",
                  title: "Fragile Balance Of Nature",
                  blurb:
                    "Nature, with its breathtaking landscapes, ecosystems, and web of life.",
                  cover:
                    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=800&q=80",
                  author: "Emily Davis",
                  avatar:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&crop=faces&fit=crop&w=60&q=80",
                  date: "Sep 16 2023",
                },
                list: [
                  {
                    tag: "Music",
                    title: "A Journey Through Time",
                    thumb:
                      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&crop=entropy&fit=crop&w=140&q=70",
                    author: "Alex Gree",
                    avatar:
                      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&crop=faces&fit=crop&w=60&q=80",
                    date: "Sep 16 2023",
                  },
                  {
                    tag: "Technology",
                    title: "A Transformative Journey",
                    thumb:
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&crop=entropy&fit=crop&w=140&q=70",
                    author: "Maxy Carl",
                    avatar:
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&crop=faces&fit=crop&w=60&q=80",
                    date: "Sep 16 2023",
                  },
                  {
                    tag: "Nature",
                    title: "World Of Bioluminescence",
                    thumb:
                      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&crop=entropy&fit=crop&w=140&q=70",
                    author: "Jason Will",
                    avatar:
                      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&crop=faces&fit=crop&w=60&q=80",
                    date: "Sep 16 2023",
                  },
                  {
                    tag: "Culture",
                    title: "The Digital Age",
                    thumb:
                      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&crop=entropy&fit=crop&w=140&q=70",
                    author: "Jen Taylor",
                    avatar:
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&crop=faces&fit=crop&w=60&q=80",
                    date: "Sep 16 2023",
                  },
                ],
              },

              /* ————— page 1 ————— */
              {
                hero: {
                  tag: "Culture",
                  title: "A Symphony Of Ideas",
                  blurb:
                    "Exploring the intersection of art, people, and technology in modern culture.",
                  cover:
                    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&crop=entropy&fit=crop&w=1400&q=80",
                  author: "Leo Carter",
                  avatar: "https://picsum.photos/seed/LeoCarter/60/60",
                  date: "Aug 22 2023",
                },
                list: [
                  {
                    tag: "Art",
                    title: "Colours In Motion",
                    thumb:
                      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&crop=entropy&fit=crop&w=140&q=70",
                    author: "Emm Ston",
                    avatar: "https://picsum.photos/seed/EmmaStone/60/60",
                    date: "Aug 22 2023",
                  },
                  {
                    tag: "Science",
                    title: "Quantum Leap",
                    thumb: "https://picsum.photos/seed/Quantum/140/140",
                    author: "Dr. Alan Wu",
                    avatar: "https://picsum.photos/seed/AlanWu/60/60",
                    date: "Aug 22 2023",
                  },
                  {
                    tag: "Travel",
                    title: "Wanderlust Diaries",
                    thumb: "https://picsum.photos/seed/Wanderlust/140/140",
                    author: "Mian Lopez",
                    avatar: "https://picsum.photos/seed/MiaLopez/60/60",
                    date: "Aug 22 2023",
                  },
                  {
                    tag: "Design",
                    title: "Minimalist Spaces",
                    thumb: "https://picsum.photos/seed/Minimal/140/140",
                    author: "Liam Smith",
                    avatar: "https://picsum.photos/seed/LiamSmith/60/60",
                    date: "Aug 22 2023",
                  },
                ],
              },
            ];

            const total = pages.length;
            const { hero, list } = pages[page];

            return (
              <>
                {/* grid */}
                <div className="grid gap-10 lg:grid-cols-[2fr_1fr] pt-10">
                  {/* hero */}
                  <article>
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={hero.cover}
                        alt={hero.title}
                        className="h-72 w-full object-cover"
                      />
                      <Overlay from="black/80" via="black/40" />
                      <Badge>{hero.tag}</Badge>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">{hero.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {hero.blurb}
                    </p>

                    <div className="mt-5 flex items-center gap-3 text-xs">
                      <img
                        src={hero.avatar}
                        alt={hero.author}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="font-medium">{hero.author}</span>
                      <span>|</span>
                      <span>{hero.date}</span>
                    </div>
                  </article>

                  {/* right column: side list + pager */}
                  <div>
                    {/* side list */}
                    <ul className="divide-y divide-border">
                      {list.map((p) => (
                        <li
                          key={p.title}
                          className="flex cursor-pointer items-center gap-4 py-4 hover:text-green-500"
                        >
                          <img
                            src={p.thumb}
                            className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                            alt={p.title}
                          />
                          <div className="flex-1">
                            <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                              {p.tag}
                            </span>
                            <h4 className="line-clamp-1 text-sm font-medium">
                              {p.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <img
                              src={p.avatar}
                              className="h-5 w-5 rounded-full object-cover"
                              alt={p.author}
                            />
                            <span>{p.author}</span>
                            <span>|</span>
                            <span>{p.date}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-end gap-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setPage(page === 0 ? total - 1 : page - 1)
                          }
                          className="grid h-9 w-9 place-items-center rounded-full border border-input/40 hover:bg-input/10 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setPage((page + 1) % total)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-input/40 hover:bg-input/10 cursor-pointer"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="min-w-[4rem] text-right text-sm text-muted-foreground">
                        {String(page + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </section>

        <section className="bg-green-100 dark:bg-green-900/30 py-32">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 px-6 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-foreground">
              Get the best sent to your <br className="hidden md:inline" />
              inbox, every month
            </h2>

            {/* form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(true);
                setTimeout(() => setShowModal(false), 4000);
                e.currentTarget.reset();
              }}
              className="flex w-full max-w-md gap-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email
              </label>
              <input
                required
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-input/40 bg-white px-4 py-3 text-sm
                   placeholder:text-muted-foreground shadow-sm focus:border-green-500
                   focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:bg-neutral-800"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white
                   shadow transition hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-500"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* ───────── MODAL ───────── */}
          {showModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <div
                className="relative w-full max-w-sm rounded-xl bg-white px-6 py-8 text-center
                   shadow-lg dark:bg-neutral-900"
                onClick={(e) => e.stopPropagation()}
              >
                {/* close button */}
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>

                <h3 className="mb-2 text-xl font-semibold text-green-600">
                  Subscribed!
                </h3>
                <p className="text-sm text-muted-foreground">
                  🎉 Thanks for signing up.
                  <br />
                  Check your inbox for a confirmation email.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-32 pb-0">
          <h2 className="mb-10 border-b border-border pb-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured
          </h2>

          {[
            {
              tag: "Culture",
              title: "The Digital Age",
              blurb:
                "In an era characterized by rapid globalization and technological advancement.",
              author: "Jen Taylor",
              avatar:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&crop=faces&fit=crop&w=60&q=80",
              date: "Sep 16 2023",
              img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
              reverse: false,
            },
            {
              tag: "Technology",
              title: "The 5G Technology",
              blurb:
                "The world of technology is continually evolving, and the rollout of 5G.",
              author: "Jason Williams",
              avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&crop=faces&fit=crop&w=60&q=80",
              date: "Sep 15 2023",
              img: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
              reverse: true,
            },
          ].map(({ tag, title, blurb, author, avatar, date, img, reverse }) => (
            <article
              key={title}
              className={`mb-20 grid gap-10 lg:grid-cols-2 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* text */}
              <div className="flex flex-col justify-center space-y-6 pr-2">
                <Badge>{tag}</Badge>
                <div className="flex items-center gap-2 text-xs">
                  <img
                    src={avatar}
                    alt={author}
                    className="h-5 w-5 rounded-full"
                  />
                  <span className="font-medium">{author}</span>
                  <span>|</span>
                  <span>{date}</span>
                </div>

                <h3 className="text-4xl font-extrabold leading-tight">
                  {title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground mt-2">
                  {blurb}
                </p>
                <a
                  href="#"
                  className="mt-auto self-start ml-2 text-sm font-semibold text-green-500 hover:underline"
                >
                  Read More
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl">
                <img
                  src={img}
                  className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                />
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 py-32">
          <h2 className="mb-10 text-3xl font-extrabold">ARTICLES & NEWS</h2>

          {/* grid of 9 cards */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The Finance Files: Decoding the Path to Fiscal Freedom",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80",
                mins: 4,
              },
              {
                title: "Wealth Wizards: Mastering the Art of Financial Alchemy",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
                mins: 5,
              },
              {
                title:
                  "Financial Footprints: Tracing the Path to Fiscal Success",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1488722796624-0aa6f1bb6399?auto=format&fit=crop&w=800&q=80",
                mins: 6,
              },
              {
                title: "The Wealth Compass: Guiding Your Journey to Prosperity",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://picsum.photos/seed/WealthCompass/800/600",
                mins: 7,
              },
              {
                title: "Mastering Technical Analysis: A Comprehensive Guide",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
                mins: 7,
              },
              {
                title:
                  "Financial Flourish: Nurturing Growth for Lasting Prosperity",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80",
                mins: 4,
              },
              {
                title:
                  "The Wealth Vault: Unlocking Financial Secrets for Success",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
                mins: 4,
              },
              {
                title:
                  "Money Mindset: Shaping Your Path to Financial Prosperity",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
                mins: 8,
              },
              {
                title: "Smart Money: Stories of Financial Empowerment",
                lead: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout…",
                img: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80",
                mins: 5,
              },
            ].map(({ title, lead, img, mins }) => (
              <article
                key={title}
                className="flex flex-col gap-5 rounded-3xl transition-shadow hover:shadow-lg"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={img}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* read-time badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-0.5 text-[10px] font-semibold text-white">
                    {mins} min Read
                  </span>

                  <span className="absolute left-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-green-500 text-white drop-shadow-md">
                    ★
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-1">
                  {lead}
                </p>

                <a
                  href="#"
                  className="mt-auto self-start ml-2 text-sm font-semibold text-green-500 hover:underline"
                >
                  Read More
                </a>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="#"
              className="rounded-full bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-green-600"
            >
              All Posts
            </a>
          </div>
        </section>

        <section className="bg-green-100 dark:bg-green-900/30 py-32">
          <div className="mx-auto max-w-7xl px-6">
            {/* heading + arrows */}
            <header className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-green-500 px-6 py-1.5 text-sm font-semibold text-white">
                  Most
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Recommended
                </h2>
              </div>

              {/* arrows */}
              <div className="flex gap-3">
                {[
                  { dir: "prev", Icon: ArrowLeft, step: -1 },
                  { dir: "next", Icon: ArrowRight, step: 1 },
                ].map(({ dir, Icon, step }) => (
                  <button
                    key={dir}
                    onClick={() =>
                      setRmIndex((i) => (i + step + rmTotal) % rmTotal)
                    }
                    className="grid h-12 w-12 place-items-center rounded-full bg-white text-green-600 shadow hover:bg-green-500 hover:text-white focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </header>

            {/* slider */}
            <div className="relative overflow-hidden">
              <ul
                className="flex gap-6 transition-transform duration-500"
                style={{ transform: `translateX(-${rmIndex * 100}%)` }}
              >
                {recommended.map((post) => (
                  <li key={post.title} className="flex w-80 flex-shrink-0">
                    {/* clickable wrapper */}
                    <a
                      href="#"
                      className="flex overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900"
                    >
                      <img
                        src={post.thumb}
                        alt={post.title}
                        className="aspect-[4/3] w-40 flex-shrink-0 object-cover"
                      />

                      <div className="flex min-w-0 flex-col p-5">
                        <span className="mb-1 truncate text-[11px] uppercase text-muted-foreground">
                          {post.author} • {post.date}
                        </span>
                        <h3 className="line-clamp-3 text-sm font-semibold">
                          {post.title}
                        </h3>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ───────── FOOTER ───────── */}
        <Footer />
      </div>
    </>
  );
}

"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { EventCard } from "./EventCard"
import { EventModal } from "./eventmodal"

interface Event {
  id: string
  title: string
  year: string
  date: string
  time: string
  venue: string
  description: string
  about: string
  highlights: string[]
  gallery: string[]
  link: string
}

interface PastEventsSectionProps {
  events: Event[]
}

export function PastEventsSection({ events }: PastEventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const sampleEvents: Event[] = [
    {
      id: "event_000",
      title: "Code-o-Fiesta 2025",
      year: "2025-26",
      date: "2025-09-13",
      time: "9:30 AM – 5:00 PM",
      venue: "VCET, Vasai",
      description: "A coding competition where participants build real-world software solutions and present them to judges.",
      about: "Code-o-Fiesta is a dynamic coding event designed to challenge and enhance participants' problem-solving abilities while applying their skills to real-life scenarios. Prior to the event, teams receive problem statements focused on developing innovative software or product solutions with practical applications. On the event day, participants showcase their completed projects to a panel of judges, making this competition both a test of technical expertise and a platform for meaningful innovation.",
      highlights: [
        "Pre-event problem statements focusing on real-world challenges.",
        "Teams build complete software/products before the event day.",
        "Initial Presentation Round: Teams present their developed products to judges.",
        "Evaluation Round: Judges assess solutions on functionality, creativity, execution, and relevance.",
        "A platform to apply coding skills beyond theory, fostering innovation and teamwork."
      ],
      gallery: [],
      link: "https://vcet-nsdc.vercel.app/code-o-fiesta"
    },

    {
      id: "event_001",
      title: "Techblitz 2025",
      year: "2024-25",
      date: "2025-02-25",
      time: "10:00 AM – 1:00 PM",
      venue: "VCET, Vasai",
      description: "Techtrivia Challenge 2025 – Showcase your technical knowledge and win exciting prizes.",
      about: "TechBlitz 2025 was an exciting technical trivia challenge that tested participants' knowledge across various domains of technology. The event featured questions covering programming languages, algorithms, data structures, web development, mobile development, and emerging technologies. Participants competed individually and in teams, showcasing their technical expertise and quick thinking abilities.",
      highlights: [
        "Comprehensive technical trivia covering multiple domains",
        "Individual and team competition formats",
        "Real-time scoring and leaderboard updates",
        "Questions covering programming, algorithms, and emerging tech",
        "Prizes for top performers and certificates for all participants"
      ],
      gallery: ["https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_6.webp?updatedAt=1758099877404",
       " https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_7.webp?updatedAt=1758099876888",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_9.webp?updatedAt=1758099876544",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_5.webp?updatedAt=1758099874879",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_4.webp?updatedAt=1758099873658",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_20.webp?updatedAt=1758099872859",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_19.webp?updatedAt=1758099872830",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_17.webp?updatedAt=1758099872767",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_3.webp?updatedAt=1758099872719",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_18.webp?updatedAt=1758099872582",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_2.webp?updatedAt=1758099872371",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_16.webp?updatedAt=1758099872022",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_15.webp?updatedAt=1758099871568",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_14.webp?updatedAt=1758099870107",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_13.webp?updatedAt=1758099868542",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_12.webp?updatedAt=1758099867683",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_10.webp?updatedAt=1758099867451",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/Techblitz_Img_1.webp?updatedAt=1758099867401",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_img_11.webp?updatedAt=1758099867393",
"https://ik.imagekit.io/nsdc2025vcet/events/TechBlitz/TechBlitz_1.webp?updatedAt=1758099867297"


],
      
      link: "https://techblitz2025.netlify.app/"
    },
    {
      id: "event_002",
      title: "TechX",
      year: "2024-25",
      date: "2025-03-14",
      time: "2:00 PM – 5:00 PM",
      venue: "Labs 114 & 115, VCET, Vasai",
      description: "TechX – Technical Showcase. Participate and present your innovative technical projects.",
      about: "TechX 2024, a one-day Product Showcase event organized by the Department of Artificial Intelligence and Data Science, was held on September 27, 2024, in Labs 114 and 115. Guided by faculty coordinators Prof. Sejal Dmello, Prof. Bhavika Gharat, and Prof. Neha Raut, the event aimed to bridge academic learning with industry exposure. With an emphasis on innovation and collaboration, students from diverse backgrounds converged to present their projects, each reflecting a blend of technical ingenuity and creative flair. The event was inaugurated by VCET's esteemed Principal, Mr. Harish Vankudre, and the Dean of Academic Affairs, Mr. Vikas Gupta, underscoring the institution's commitment to fostering technological excellence.",
      highlights: [
        "Showcased innovative products from leading companies",
        "Industry participation from Edba Academy, Tech Cryptors, DataMango, Zaplet, VM Protect, and Cosmic Spirit",
        "Products included cutting-edge technologies like DJI AIR3S drone",
        "Advanced graphics cards (3090 & 3080) and wireless video transmission systems",
        "Blockchain-based inventory management tools",
        "Enhanced students' technical expertise, presentation skills, and professional communication",
        "Promoted collaboration and holistic growth"
      ],
      gallery: [],
      link: "https://vcet-nsdc.vercel.app/productshowcase24"
    },
    {
      id: "event_003",
      title: "Code o Fiesta 2024",
      year: "2024-25",
      date: "2025-03-17",
      time: "11:00 AM – 3:00 PM",
      venue: "VCET, Vasai",
      description: "Coding competition – Solve challenges and showcase your programming skills.",
      about: "Code-O-Fiesta 2024 was held on 20th September at Vidyavardhini's College of Engineering and Technology, organized by the departments of Artificial Intelligence and Data Science & Computer Science Engineering (Data Science). The event was graced by dignitaries including the chief guest, Mr. Ajit Kumar Singh, along with the principal, Dr. Rakesh Himte, and other faculty heads. The inauguration featured a traditional lamp lighting ceremony, the 'Saraswati Vandana' prayer, and speeches from the guests, emphasizing the importance of such events in fostering innovation and talent in technology.",
      highlights: [
        "Keynote emphasized the importance of Code-O-Fiesta",
        "Participants split into Healthcare and Agriculture domains",
        "Jury round showcased ideas and algorithmic approaches",
        "Final round featured live demos before judges and audience",
        "Traditional lamp lighting ceremony and Saraswati Vandana",
        "Certificates awarded to all participants"
      ],
      gallery: [
       " https://ik.imagekit.io/nsdc2025vcet/events/codeOfista/codeofista4.webp?updatedAt=1758099886744",
"https://ik.imagekit.io/nsdc2025vcet/events/codeOfista/codeofista3.webp?updatedAt=1758099885719",
"https://ik.imagekit.io/nsdc2025vcet/events/codeOfista/codeofista2.webp?updatedAt=1758099884816",
"https://ik.imagekit.io/nsdc2025vcet/events/codeOfista/codeofista1.webp?updatedAt=1758099884452"
      ],
      link: "https://vcet-nsdc.vercel.app/Codeofiesta"
    },
    {
      id: "event_004",
      title: "Logo Making Competition",
      year: "2024-25",
      date: "2025-03-20",
      time: "9:30 AM – 12:30 PM",
      venue: "VCET, Vasai",
      description: "Design unique logos showcasing creativity and innovation.",
      about: "On September 3rd, 2024, a creative and engaging Logo Making Competition was organized as part of the ICE3T event. The competition centered around the College Paper Publication theme, with participants tasked to design logos that represented the diverse domains outlined on the ICE3T website. These domains ranged from cutting-edge technologies like Data Science, Cloud Computing, and IoT to traditional fields such as Civil Engineering and Indigenous Knowledge Systems, reflecting the broad spectrum of research areas.",
      highlights: [
        "Organized as part of the ICE3T event on September 3rd, 2024",
        "Focused on the theme College Paper Publication",
        "Participants designed logos representing diverse domains",
        "Domains included Data Science, Cloud Computing, IoT, Civil Engineering, and Indigenous Knowledge Systems",
        "Three-hour competition for ideation, sketching, and refining",
        "Judging criteria: creativity, relevance, visual appeal, and effective communication",
        "Highlighted artistic innovation and technical understanding in logo design",
        "One outstanding design selected as the winner"
      ],
      gallery: [],
      link: "https://vcet-nsdc.vercel.app/logo"
    },
    {
      id: "event_005",
      title: "Seminar on NVIDIA Jetson AI Device",
      year: "2024-25",
      date: "2025-02-25",
      time: "10:00 AM – 12:00 PM",
      venue: "VCET, Vasai",
      description: "The seminar on NVIDIA Jetson AI Edge Device organized by our college is held on 30th August 2024 in association with IETE. Mr. Anil Sarode explained the working and functioning of NVIDIA jetson devices.",
      about: "The seminar on NVIDIA Jetson AI Edge Device is designed to introduce participants to the NVIDIA Jetson AI Edge Devices and Software Stacks Overview. The seminar begins with an overview of the NVIDIA Jetson AI Edge device introduction, covering its architecture, key features, and various applications. Participants are then guided through live Jetson demo with Deepstream & Generative AI. The seminar includes hands-on sessions where attendees learn to use Deepstream & Generative AI efficiently with the NVIDIA Jetson device and Software Stacks.",
      highlights: [
        "Comprehensive understanding of the architecture, features, and applications of NVIDIA Jetson AI Edge Device",
        "Live demonstration with Deepstream & Generative AI",
        "Hands-on sessions for practical learning",
        "Introduction to NVIDIA Software Stacks",
        "Real-time video analytics capabilities",
        "Edge computing applications and use cases"
      ],
      gallery: [
        "https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_7.webp?updatedAt=1758099902097",
 "https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_4.webp?updatedAt=1758099902019",
"https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_6.webp?updatedAt=1758099901824",
"https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_5.webp?updatedAt=1758099901753",
"https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_2.webp?updatedAt=1758099900161",
"https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_3.webp?updatedAt=1758099899854",
"https://ik.imagekit.io/nsdc2025vcet/events/nvidia/nvidia_1.webp?updatedAt=1758099899769"


      ],
      link: "https://techblitz2025.netlify.app/"
    },
    {
      id: "event_006",
      title: "Vidhyavardhin's National Level Project Showcase [VNPS]",
      year: "2024-25",
      date: "2025-03-22",
      time: "10:00 AM – 1:00 PM",
      venue: "VCET, Vasai",
      description: "Showcase that featured various groundbreaking technologies.",
      about: "Vidyavardhini College of Engineering and Technology (VCET) hosted a National Level Project Showcase, providing students a platform to present innovative projects across various technological domains. Projects demonstrated advancements in predictive analytics, AI in healthcare, energy optimization, autonomous robotics, image recognition, and human-machine interaction. The event successfully showcased the transformative potential of emerging technologies, fostering collaboration and knowledge exchange among students and industry experts.",
      highlights: [
        "Focus of Track 3: Data Science, AI, ML, Robotics, Deep Learning, NLP",
        "Event Outcome: Successful platform for innovation and knowledge exchange",
        "Fostered collaboration and exploration in emerging technologies",
        "Addressed real-world challenges across various sectors",
        "Projects in predictive analytics, AI in healthcare, energy optimization",
        "Autonomous robotics, image recognition, and human-machine interaction"
      ],
      gallery: ["https://ik.imagekit.io/nsdc2025vcet/events/products24/128.webp?updatedAt=1758099867393",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/127.webp?updatedAt=1758099867004",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/126.webp?updatedAt=1758099866829",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/125.webp?updatedAt=1758099865197",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/122.webp?updatedAt=1758099862759",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/123.webp?updatedAt=1758099861904",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/124.webp?updatedAt=1758099862370",
"https://ik.imagekit.io/nsdc2025vcet/events/products24/121.webp?updatedAt=1758099862559"
],
      link: "https://vcet-nsdc.vercel.app/nvidia"
    },
    {
      id: "event_007",
      title: "Oscillations 2024",
      year: "2023-24",
      date: "2023-04-01",
      time: "10:00 AM – 12:00 PM",
      venue: "VCET, Vasai",
      description: "National Level Technical Paper Presentation competition.",
      about: "OSCILLATIONS 2024, held on April 5th in collaboration with IETE Mumbai Centre, was a prestigious technical paper presentation event that offered students a platform to showcase their research, skills, and expertise. The event featured six diverse tracks, including mechanical systems, AI, IoT, civil engineering, and Indigenous Knowledge Systems (IKS).",
      highlights: [
        "Mechanical System Design, Renewable Energy, Electric Vehicles, AI & ML applications",
        "IoT, Signal Processing, Wireless Communication, VLSI, Automation, Biomedical Instrumentation",
        "Data Science, AI, Machine Learning, Robotics, Deep Learning, NLP",
        "Cloud Computing, Big Data, Cybersecurity, Blockchain, Web & Mobile Applications",
        "Civil Engineering: Concrete, Structural & Geotechnical, Environmental Engineering",
        "Indigenous Knowledge Systems (IKS) integration with modern engineering and sciences",
        "Judging Criteria: Originality, technical content, presentation skills"
      ],
      gallery: [
        "https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc1.webp?updatedAt=1758099851354",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc5.webp?updatedAt=1758099851329",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc8.webp?updatedAt=1758099851287",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc3.webp?updatedAt=1758099851288",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc2.webp?updatedAt=1758099851224",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc4.webp?updatedAt=1758099851113",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc9.webp?updatedAt=1758099851155",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc10.webp?updatedAt=1758099851007",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc7.webp?updatedAt=1758099851009",
"https://ik.imagekit.io/nsdc2025vcet/events/oscillation/osc6.webp?updatedAt=1758099851032"
      ],
      link: "https://vcet-nsdc.vercel.app/vnps"
    },
    {
      id: "event_008",
      title: "Techblitz 2024",
      year: "2023-24",
      date: "2023-04-05",
      time: "10:00 AM – 5:00 PM",
      venue: "VCET, Vasai",
      description: "Techblitz redefines coding competitions by embracing AI tools, breaking away from traditional restrictions.",
      about: "The TechBlitz challenge event organized by the National Students Data Corps (NSDC) at Vidyavardhini's College of Engineering and Technology (VCET) on March 15th, 2024, marked a significant milestone in the intersection of technology and education. Under the auspices of the Department of Artificial Intelligence and Data Science, the event showcased the prowess of budding technologists across three pivotal domains: web development using AI, UI/UX design, and data science using AI.",
      highlights: [
        "Showcased prowess of budding technologists in three domains",
        "Web development using AI",
        "UI/UX design",
        "Data science using AI",
        "Embracing AI tools in coding competitions",
        "Breaking away from traditional restrictions"
      ],
      gallery: [],
      link: "https://vcet-nsdc.vercel.app/oscillation"
    },
    {
      id: "event_009",
      title: "Expert Lecture on Power BI",
      year: "2023-24",
      date: "2023-04-10",
      time: "10:00 AM – 12:00 PM",
      venue: "VCET, Vasai",
      description: "Students gained hands-on insights into the world of business intelligence, data visualization, and analytics.",
      about: "The lecture focused on introducing students to Microsoft Power BI, a powerful tool for data analysis and interactive reporting. The resource person guided participants through real-world applications, dashboards, and visualization techniques, enabling them to understand how data-driven decision-making is transforming industries. The session also emphasized career opportunities in the field of business intelligence and analytics.",
      highlights: [
        "Introduction to Power BI fundamentals and role in modern analytics",
        "Live demo: building dashboards and interactive reports",
        "Insights into industry use-cases and practical applications",
        "Q&A on tools, trends, and career scope",
        "Encouraged exploration of data-driven projects and certifications"
      ],
      gallery: [ "https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_5.webp?updatedAt=1758099857412",
"https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_4.webp?updatedAt=1758099857205",
"https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_2.webp?updatedAt=1758099856856",
"https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_3.webp?updatedAt=1758099856546",
"https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_0.webp?updatedAt=1758099855857",
"https://ik.imagekit.io/nsdc2025vcet/events/PowerBI/powerbi_img_1.webp?updatedAt=1758099855548"
],
      link: "#"
    },
    {
      id: "event_010",
      title: "TechX",
      year: "2023-24",
      date: "2023-04-14",
      time: "10:00 AM – 5:00 PM",
      venue: "VCET, Vasai",
      description: "Under the Department of Artificial Intelligence and Data Science, the NSDC organized its inaugural event, the Product Showcase Tech X, inaugurated by Chief Guest Akshay",
      about: "Under the Department of Artificial Intelligence and Data Science, the NSDC organized its inaugural event, the Product Showcase 'Tech X', inaugurated by Chief Guest Akshay Bharambe sir. This event highlighted technical products integrating machine learning, AI concepts, and database management systems. Notable exhibits included Parking Pal, an AI-powered parking management system, the Android ecosystem showcasing innovative mobile applications, Solomon CMS, a content management system leveraging machine learning algorithms, and Binaural Beats, an AI-driven music platform for cognitive enhancement.",
      highlights: [
        "Event: Product Showcase 'Tech X' organized by NSDC",
        "Chief Guest: Akshay Bharambe sir",
        "Showcased products applying AI, ML and databases",
        "Exhibits: Parking Pal, Android apps, Solomon CMS, Binaural Beats",
        "Demonstrated commitment to cutting-edge technology",
        "Platform for students to showcase expertise and innovation"
      ],
      gallery: [
        "https://ik.imagekit.io/nsdc2025vcet/events/products/product_9.webp?updatedAt=1758099862435",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_7.webp?updatedAt=1758099862354",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_8.webp?updatedAt=1758099862325",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_6.webp?updatedAt=1758099862034",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_5.webp?updatedAt=1758099861035",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_4.webp?updatedAt=1758099859991",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_1.mov/ik-video.mp4?updatedAt=1758099857130",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_2.webp?updatedAt=1758099857050",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_3.webp?updatedAt=1758099856700",
"https://ik.imagekit.io/nsdc2025vcet/events/products/product_10.webp?updatedAt=1758099856710"

      ],
      link: "https://vcet-nsdc.vercel.app/powerbi"
    },
    {
      id: "event_011",
      title: "Vcet Techzette",
      year: "2023-24",
      date: "2023-04-17",
      time: "9:30 AM – 1:30 PM",
      venue: "VCET, Vasai",
      description: "The VCET TechZette – विसीईटी ज्ञानपत्र (www.techz.vcet.edu.in), a dynamic technical blog, serves as a digital hub for insightful discourse, featuring a plethora of technical articles",
      about: "The VCET TechZette - विसीईटी ज्ञानपत्र (www.techz.vcet.edu.in), a dynamic technical blog, serves as a digital hub for insightful discourse, featuring a plethora of technical articles contributed by esteemed faculty members, subject matter experts, and the ingenious endeavors of students ranging from the second to final year. In a distinctive inauguration event under the Department of Artificial Intelligence and Data Science at Vidyavardhini's College of Engineering and Technology (VCET), with Chief Guest Mr. Rahul Mhatre, the unveiling of this specialized platform was a momentous occasion marked by eager anticipation and dynamic exchange.",
      highlights: [
        "Inauguration of VCET TechZette - विसीईटी ज्ञानपत्र (techz.vcet.edu.in)",
        "Chief Guest: Mr. Rahul Mhatre",
        "Launched dynamic blog with articles from faculty, experts, and students",
        "Platform for sharing expertise and fostering collaborative learning",
        "Covers AI, data science, and broader technical topics",
        "Commenced an enriching journey into innovation"
      ],
      gallery: [
               "https://ik.imagekit.io/nsdc2025vcet/events/TechZette/TechZette_5.webp?updatedAt=1758099878375",
"https://ik.imagekit.io/nsdc2025vcet/events/TechZette/TechZette_2.webp?updatedAt=1758099878308",
"https://ik.imagekit.io/nsdc2025vcet/events/TechZette/TechZette_3.webp?updatedAt=1758099877592",
"https://ik.imagekit.io/nsdc2025vcet/events/TechZette/TechZette_4.webp?updatedAt=1758099877287"


      ],
      link: "https://vcet-nsdc.vercel.app/product"
    },
    {
      id: "event_012",
      title: "NSDC Inauguration",
      year: "2023-24",
      date: "2023-04-20",
      time: "10:00 AM – 12:00 PM",
      venue: "VCET, Vasai",
      description: "The National Student Data Corps (NSDC) stands as a beacon of opportunity, ushering students into the vibrant world of data science within a nurturing community.",
      about: "The Inauguration of the National Students Data Corps (NSDC) student chapter under the Department of Artificial Intelligence and Data Science at Vidyavardhini's College of Engineering and Technology was a momentous occasion marked by excitement and promise. Chief Guest Mr. Rahul Mhatre along with faculty members, guests, as well as Students gathered to witness the unveiling of this pioneering initiative aimed at harnessing the power of data for transformative change.",
      highlights: [
        "Inaugural Event: Unveiling NSDC at VCET",
        "Guests: Mr. Rahul Mhatre, Dr. Tatwadarshi Nagarhalli, Dr. Uday Aswalekar, Dr. Vikas Gupta",
        "Logo unveiling and informative video presentation",
        "Insights from Chief Guest Mr. Rahul Mhatre",
        "New era of collaboration and exploration in data science",
        "Journey to leverage data-driven insights for societal betterment"
      ],
      gallery: [
        "https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_9.webp?updatedAt=1758099890901",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_8.webp?updatedAt=1758099890514",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_7.webp?updatedAt=1758099890235",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_6.webp?updatedAt=1758099889333",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_5.webp?updatedAt=1758099889134",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_4.webp?updatedAt=1758099887890",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_3.webp?updatedAt=1758099887645",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_2.webp?updatedAt=1758099887269",
"https://ik.imagekit.io/nsdc2025vcet/events/inaugration/inaug_10.webp?updatedAt=1758099887089"

      ],
      link: "https://vcet-nsdc.vercel.app/techzette"
    }
  ]

  const stockImages = [
    "/assests/image.png",
    "/assests/image.png",
    "/assests/image.png",
    "/assests/image.png",
    "/assests/image.png",
    "/assests/image.png",
  ]

  const eventsToDisplay = events.length > 0 ? events : sampleEvents

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/10 via-violet-900/10 to-fuchsia-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Past Events</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto text-pretty">
            Explore our previous events and achievements
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {eventsToDisplay.map((event) => (
            <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
          ))}
        </motion.div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} stockImages={stockImages} />
    </section>
  )
}

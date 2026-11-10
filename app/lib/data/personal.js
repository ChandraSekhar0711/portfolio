const EXPERIENCE_START_DATE = new Date(Date.UTC(2021, 9, 21));
const today = new Date();
const yearsExperience =
  today.getUTCFullYear() -
  EXPERIENCE_START_DATE.getUTCFullYear() -
  (today.getUTCMonth() < EXPERIENCE_START_DATE.getUTCMonth() ||
  (today.getUTCMonth() === EXPERIENCE_START_DATE.getUTCMonth() &&
    today.getUTCDate() < EXPERIENCE_START_DATE.getUTCDate())
    ? 1
    : 0);

export const personal = {
  name: "Chandra Sekhar Rao Thogiri",
  shortName: "Chandra Sekhar Rao",
  role: "Frontend Engineer",
  altRole: "Frontend / Full-Stack Software Engineer",
  email: "chandutogiri3@gmail.com",
  location: "Hyderabad, India",
  yearsExperience,
  availability: "Available for Software Engineering opportunities",
  links: {
    github: "https://github.com/ChandraSekhar0711",
    linkedin: "https://www.linkedin.com/in/chandu-togiri-2827a2190/",
    leetcode: "https://leetcode.com/u/ChandraSekharRao_Thogiri/",
    portfolio: "https://portfolio-chandrasekhar.vercel.app/",
  },
  resumeUrl: "/Thogiri_ChandraSekharRao.pdf",
};

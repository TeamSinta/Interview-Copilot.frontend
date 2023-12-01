import { IInterviewDetailStaging } from "@/features/interviewDetail/inverviewDetailInterface";

export const invitedMember = {
  member_idx: Math.random(),
  member_name: "Sammy Kavanagh",
  member_url: "",
  admin: false,
};

export const templatesList = [
  {
    template: {
      id: 1,
      title: "FrontEnd Basic",
    },
    questions: [
      {
        id: 1,
        title: "How are JavaScript and JQuery different?",
        competencies: ["Teamleading"],
        time: 5,
        level: "Low",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 2,
        title: "What are meta tags in HTML?1",
        competencies: ["Teamleading"],
        time: 5,
        level: "High",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 3,
        title: "What are meta tags in HTML?2",
        competencies: ["Teamleading"],
        time: 5,
        level: "Medium",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 4,
        title: "What are meta tags in HTML?3",
        competencies: ["Teamleading"],
        time: 5,
        level: "High",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 5,
        title: "What are meta tags in HTML?4",
        competencies: ["Teamleading"],
        time: 5,
        level: "High",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 6,
        title: "What are meta tags in HTML?5",
        competencies: ["Teamleading"],
        time: 5,
        level: "High",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
      {
        id: 7,
        title: "What are meta tags in HTML?",
        competencies: ["Teamleading"],
        time: 5,
        level: "High",
        detail:
          "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
          "<li>Meta tags are not for the interface they are important for the browser.</li>" +
          "<li> Meta Tags are always in name or value pairs</li>" +
          "<li> Meta tags consist of character encoding, title, or even description.</li>",
      },
    ],
  },
  {
    template: {
      id: 2,
      title: "Composition Basics",
    },
    questions: [],
  },
  {
    template: {
      id: 3,
      title: "Composition Basics",
    },
    questions: [],
  },
  {
    template: {
      id: 4,
      title: "Composition Basics",
    },
    questions: [],
  },
  {
    template: {
      id: 5,
      title: "Composition Basics",
    },
    questions: [],
  },
  {
    template: {
      id: 6,
      title: "Composition Basics",
    },
    questions: [],
  },
  {
    template: {
      id: 7,
      title: "Composition Basics",
    },
    questions: [],
  },
];

export const interviewDetail: IInterviewDetailStaging = {
  interviewer: [
    {
      member_idx: 1,
      member_name: "Mattias Velamsson",
      member_url: "",
      member_type: "member",
    },
  ],
  section: [
    {
      id: 1,
      title: "introduction",
      time: 5,
      questions: [
        {
          id: 1,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "- Meta tags are those tags which go inside the Head tag of the HTML page\n" +
            "- Meta tags are not for the interface they are important for the browser.\n" +
            "- Meta Tags are always in name or value pairs\n" +
            "- Meta tags consist of character encoding, title, or even description.\n",
        },
        {
          id: 2,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "- Meta tags are those tags which go inside the Head tag of the HTML page\n" +
            "- Meta tags are not for the interface they are important for the browser.\n" +
            "- Meta Tags are always in name or value pairs\n" +
            "- Meta tags consist of character encoding, title, or even description.\n",
        },
        {
          id: 3,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "- Meta tags are those tags which go inside the Head tag of the HTML page\n" +
            "- Meta tags are not for the interface they are important for the browser.\n" +
            "- Meta Tags are always in name or value pairs\n" +
            "- Meta tags consist of character encoding, title, or even description.\n",
        },
      ],
    },
    {
      id: 2,
      title: "Past Experience",
      time: 5,
      questions: [
        {
          id: 1,
          title: "What are Swag Swag?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
        {
          id: 2,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
        {
          id: 3,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
      ],
    },
    {
      id: 3,
      title: "Conclusion",
      time: 5,
      questions: [
        {
          id: 1,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
        {
          id: 2,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
        {
          id: 3,
          title: "What are meta tags in HTML?",
          competencies: ["Teamleading"],
          time: 5,
          level: "High",
          detail:
            "<ul><li>Meta tags are those tags which go inside the Head tag of the HTML page</li> " +
            "<li>Meta tags are not for the interface they are important for the browser.</li>" +
            "<li> Meta Tags are always in name or value pairs</li>" +
            "<li> Meta tags consist of character encoding, title, or even description.</li>",
        },
      ],
    },
  ],
};

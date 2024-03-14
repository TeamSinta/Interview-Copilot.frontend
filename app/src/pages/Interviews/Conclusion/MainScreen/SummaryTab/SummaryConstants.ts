interface IFAQItem {
  question: string;
  answer: string;
  competency: string;
  difficulty: string;
}

export interface ISummary {
  title: string;
  description: string;
  faq: IFAQItem[];
}

const summaryInfo = {
  title: 'Summary',
  description:
    'Kristin and Leslie met to discuss the latest designs for action items, integrations, and updates to the dashboard UX. They walked through the different iterations for each project and decided which directions to move forward with.',
  faq: [
    {
      question: 'Kristin shared three different designs for action items',
      answer: 'Answer 1',
      competency: 'Leadership',
      difficulty: 'Low',
      score: 2,
    },
    {
      question: 'Leslie went over the project brief for product integrations',
      answer: 'Answer 2',
      competency: 'Empathy',
      difficulty: 'Medium',
      score: 4,
    },
    {
      question:
        'Kristin and Leslie walked through their ideas for improved dashboard UX',
      answer:
        'Kristin and Leslie met to discuss the latest designs for action items, integrations, and updates to the dashboard UX. They walked through the different iterations for each project and decided which directions to move forward with.',
      competency: 'Empathy',
      difficulty: 'High',
      score: 3,
    },
    // Add more FAQ entries as needed
  ],
};

export { summaryInfo };

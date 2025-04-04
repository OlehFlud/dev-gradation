export const frontendLevels = [
  {
    id: 'f1',
    level: 1,
    title: 'Trainee (Стажер)',
    skills: ['Основи HTML, CSS, JavaScript', 'Початкові знання React, Git'],
    progressColor: 'bg-blue-200',
    progress: 16
  },
  {
    id: 'f2',
    level: 2,
    title: 'Junior (Джуніор)',
    subtitles: [
      {name: 'Low Junior', description: 'Початкові навички роботи з React, без оптимізації та патернів.'},
      {name: 'Strong Junior', description: 'Знання Redux, TypeScript, оптимізація.'}
    ],
    skills: ['Робота з React', 'Redux', 'TypeScript', 'Оптимізація', 'Базова архітектура'],
    progressColor: 'bg-blue-300',
    progress: 32
  },
  {
    id: 'f3',
    level: 3,
    title: 'Middle (Мідл)',
    subtitles: [
      {name: 'Low Middle', description: 'Розуміє архітектуру додатків, працює з API, оптимізація.'},
      {name: 'Strong Middle', description: 'Має досвід роботи з Next.js, пише високопродуктивний код.'}
    ],
    skills: ['Архітектура додатків', 'Робота з API', 'Next.js', 'Продуктивність', 'Глибока оптимізація'],
    progressColor: 'bg-blue-400',
    progress: 50
  },
  {
    id: 'f4',
    level: 4,
    title: 'Senior (Сеньйор)',
    subtitles: [
      {name: 'Low Senior', description: 'Глибоке знання React, оптимізація, досвід з архітектурними підходами.'},
      {name: 'Strong Senior', description: 'Проводить код-рев\'ю, архітектуру, проектує масштабовані рішення.'}
    ],
    skills: ['Глибоке знання React', 'Архітектурні підходи', 'Код-рев\'ю', 'Масштабовані рішення', 'Менторство'],
    progressColor: 'bg-blue-500',
    progress: 75
  },
  {
    id: 'f5',
    level: 5,
    title: 'Lead Frontend Developer',
    skills: ['Керування командою', 'Технологічні рішення', 'Стратегічне планування', 'Оптимізація процесів', 'Крос-командна взаємодія'],
    progressColor: 'bg-blue-600',
    progress: 100
  },
];

export const backendLevels = [
  {
    id: 'b1',
    level: 1,
    title: 'Trainee (Стажер)',
    skills: ['Основи JavaScript', 'Асинхронність', 'Базові знання Node.js'],
    progressColor: 'bg-indigo-200',
    progress: 16
  },
  {
    id: 'b2',
    level: 2,
    title: 'Junior (Джуніор)',
    subtitles: [
      {name: 'Low Junior', description: 'Пише базові API на Express, NestJS.'},
      {name: 'Strong Junior', description: 'Знає кешування, авторизацію, працює з ORM.'}
    ],
    skills: ['Express', 'NestJS', 'Кешування', 'Авторизація', 'ORM'],
    progressColor: 'bg-indigo-300',
    progress: 32
  },
  {
    id: 'b3',
    level: 3,
    title: 'Middle (Мідл)',
    subtitles: [
      {name: 'Low Middle', description: 'Пише мікросервіси, працює з GraphQL, кешуванням.'},
      {name: 'Strong Middle', description: 'Має досвід роботи з Docker, Kubernetes, CI/CD.'}
    ],
    skills: ['Мікросервіси', 'GraphQL', 'Кешування', 'Docker', 'Kubernetes', 'CI/CD'],
    progressColor: 'bg-indigo-400',
    progress: 50
  },
  {
    id: 'b4',
    level: 4,
    title: 'Senior (Сеньйор)',
    subtitles: [
      {name: 'Low Senior', description: 'Знає мікросервісну архітектуру, оптимізує запити, бази даних.'},
      {name: 'Strong Senior', description: 'Проводить архітектурні рішення, менторить команду.'}
    ],
    skills: ['Мікросервісна архітектура', 'Оптимізація запитів', 'Оптимізація баз даних', 'Архітектурні рішення', 'Менторство'],
    progressColor: 'bg-indigo-500',
    progress: 75
  },
  {
    id: 'b5',
    level: 5,
    title: 'Lead Backend Developer',
    skills: ['Керування командою бекенд-розробників', 'Технічні рішення', 'Стратегічне планування', 'Взаємодія з іншими командами'],
    progressColor: 'bg-indigo-600',
    progress: 100
  },
];

export const pathData = {
  frontend: [
    { name: 'Trainee', width: '16%', color: 'bg-blue-200', textColor: 'text-blue-800' },
    { name: 'Junior', width: '16%', color: 'bg-blue-300', textColor: 'text-blue-800' },
    { name: 'Middle', width: '18%', color: 'bg-blue-400', textColor: 'text-white' },
    { name: 'Senior', width: '22%', color: 'bg-blue-500', textColor: 'text-white' },
    { name: 'Lead', width: '28%', color: 'bg-blue-600', textColor: 'text-white' },
  ],
  backend: [
    { name: 'Trainee', width: '16%', color: 'bg-indigo-200', textColor: 'text-indigo-800' },
    { name: 'Junior', width: '16%', color: 'bg-indigo-300', textColor: 'text-indigo-800' },
    { name: 'Middle', width: '18%', color: 'bg-indigo-400', textColor: 'text-white' },
    { name: 'Senior', width: '22%', color: 'bg-indigo-500', textColor: 'text-white' },
    { name: 'Lead', width: '28%', color: 'bg-indigo-600', textColor: 'text-white' },
  ]
};

export type Level = {
  id: string;
  level: number;
  title: string;
  skills: string[];
  progressColor: string;
  progress: number;
  subtitles?: { name: string; description: string }[];
};

export type PathSegment = {
  name: string;
  width: string;
  color: string;
  textColor: string;
};

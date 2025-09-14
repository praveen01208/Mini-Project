
import type { Therapist } from '../types';

export const therapists: Therapist[] = [
  {
    id: 1,
    name: 'Dr. Anya Sharma',
    specialties: ['Anxiety', 'Depression', 'Stress Management'],
    imageUrl: 'https://picsum.photos/seed/anya/400/400',
    bio: 'Dr. Sharma specializes in cognitive behavioral therapy (CBT) for teens, helping them develop coping mechanisms for life\'s challenges.',
    availability: ['Mon 2pm', 'Wed 10am', 'Fri 4pm'],
  },
  {
    id: 2,
    name: 'Dr. Ben Carter',
    specialties: ['Family Conflict', 'ADHD', 'Self-Esteem'],
    imageUrl: 'https://picsum.photos/seed/ben/400/400',
    bio: 'With over 10 years of experience, Dr. Carter focuses on creating a supportive environment for teens to explore their feelings and build confidence.',
    availability: ['Tue 11am', 'Thu 1pm', 'Fri 9am'],
  },
  {
    id: 3,
    name: 'Dr. Chloe Davis',
    specialties: ['Cyberbullying', 'Social Anxiety', 'Trauma'],
    imageUrl: 'https://picsum.photos/seed/chloe/400/400',
    bio: 'Dr. Davis is an expert in digital-age mental health, providing teens with tools to navigate the complexities of online and offline social interactions.',
    availability: ['Mon 5pm', 'Wed 3pm', 'Thu 6pm'],
  },
  {
    id: 4,
    name: 'Dr. David Rodriguez',
    specialties: ['Grief & Loss', 'Identity', 'Mindfulness'],
    imageUrl: 'https://picsum.photos/seed/david/400/400',
    bio: 'Dr. Rodriguez uses a mindfulness-based approach to help teenagers process grief and explore their developing sense of self.',
    availability: ['Tue 9am', 'Wed 1pm', 'Fri 11am'],
  },
    {
    id: 5,
    name: 'Dr. Emily White',
    specialties: ['Eating Disorders', 'Body Image', 'Perfectionism'],
    imageUrl: 'https://picsum.photos/seed/emily/400/400',
    bio: 'Dr. White provides compassionate care for teens struggling with body image and eating disorders, promoting self-acceptance and healthy habits.',
    availability: ['Mon 10am', 'Wed 11am', 'Thu 2pm'],
  },
  {
    id: 6,
    name: 'Dr. Frank Green',
    specialties: ['Academic Pressure', 'Burnout', 'Motivation'],
    imageUrl: 'https://picsum.photos/seed/frank/400/400',
    bio: 'Dr. Green helps high-achieving teens manage academic stress and find a healthy balance between school, activities, and personal well-being.',
    availability: ['Tue 4pm', 'Thu 9am', 'Fri 1pm'],
  },
];

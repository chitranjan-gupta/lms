export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  refresh_token?: string;
  created_at: Date;
  updated_at: Date;
  courses: Course[];
  Company: Company[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: string;
  category?: Category;
  chapters: Chapter[];
  attachments: CourseAttachment[];
  purchases: Purchase[];
  userId: string;
  User: User;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  courses: Course[];
}

export interface CourseAttachment {
  id: string;
  name: string;
  url: string;
  courseId: string;
  course: Course;
  created_at: Date;
  updated_at: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  courseId: string;
  course: Course;
  userProgress: ChapterProgress[];
  lectures: Lecture[];
  attachments: ChapterAttachment[];
  duration: number;
  created_at: Date;
  updated_at: Date;
}

export interface ChapterAttachment {
  id: string;
  name: string;
  url: string;
  chapterId: string;
  chapter: Chapter;
  created_at: Date;
  updated_at: Date;
}

export interface Lecture {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: MuxData;
  userProgress: LectureProgress[];
  attachments: LectureAttachment[];
  duration: number;
  courseId: string;
  chapterId: string;
  chapter: Chapter;
  created_at: Date;
  updated_at: Date;
}

export interface LectureAttachment {
  id: string;
  name: string;
  url: string;
  lectureId: string;
  lecture: Lecture;
  created_at: Date;
  updated_at: Date;
}

export interface MuxData {
  id: string;
  assetId: string;
  playbackId?: string;
  lectureId: string;
  lecture: Lecture;
}

export interface ChapterProgress {
  id: string;
  userId: string;
  chapterId: string;
  chapter: Chapter;
  isCompleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LectureProgress {
  id: string;
  userId: string;
  lectureId: string;
  lecture: Lecture;
  isCompleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  created_at: Date;
  updated_at: Date;
}

export interface StripeCustomer {
  id: string;
  userId: string;
  stripeCustomerId: string;
  created_at: Date;
  updated_at: Date;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  sector_type?: string;
  location?: string;
  contact_no?: string;
  contact_email?: string;
  website_url?: string;
  careers_url?: string;
  logo_url?: string;
  description?: string;
  culture?: string;
  userId: string;
  user: User;
  created_at: string;
  updated_at: string;
  careers: Career[];
}

export interface Career {
  id: string;
  title: string;
  contact_no?: string;
  contact_email?: string;
  description?: string;
  location?: string;
  salary_range?: string;
  application_deadline?: string;
  career_url?: string;
  work_mode?: string;
  date_posted?: string;
  responsibilities?: string[];
  benefits?: string[]; 
  requirements?: string[];
  skills?: string[];
  level?: string;
  experience?: string;
  department?: string;
  companyId: string;
  company: Company;
  created_at: string;
  updated_at: string;
}

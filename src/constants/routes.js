import { MdDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi2';
import { IoMdSettings } from 'react-icons/io';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdPayments } from 'react-icons/md';
import { BiSolidBookAlt } from 'react-icons/bi';
import { RiVipFill, RiFileList3Fill  } from "react-icons/ri";

export const ADMIN_ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/consultation',
    icon: <IoChatboxEllipses size={22} />,
    name: 'Consultation',
    key: '1',
  },
  {
    path: '/course',
    icon: <BiSolidBookAlt size={22} />,
    name: 'Course',
    key: '2',
  },
  {
    path: '/transaction',
    icon: <MdPayments size={22} />,
    name: 'Transaction',
    key: '3',
  },
  {
    path: '/student',
    icon: <HiUsers size={22} />,
    name: 'Student',
    key: '4',
  },
  {
    path: '/mentor',
    icon: <HiUsers size={22} />,
    name: 'Mentor',
    key: '5',
  },
  {
    path: '/account',
    icon: <RiVipFill size={22} />,
    name: 'Account Manager',
    key: '6',
  },
  {
    path: '/category',
    icon: <RiFileList3Fill size={22} />,
    name: 'Category Manager',
    key: '7',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '8',
  },
];

export const ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/consultation',
    icon: <IoChatboxEllipses size={22} />,
    name: 'Consultation',
    key: '1',
  },
  {
    path: '/list-courses',
    icon: <BiSolidBookAlt size={22} />,
    name: 'List Courses',
    key: '3',
  },
  // {
  //   path: '/course',
  //   icon: <BiSolidBookAlt size={22} />,
  //   name: 'My Course',
  //   key: '4',
  // },
  {
    path: '/order',
    icon: <MdPayments size={22} />,
    name: 'Order',
    key: '5',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '6',
  },
];

export const MENTOR_ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/course',
    icon: <BiSolidBookAlt size={22} />,
    name: 'Course',
    key: '1',
  },
  {
    path: '/transaction',
    icon: <MdPayments size={22} />,
    name: 'Transaction',
    key: '2',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '3',
  },
];

export const CATEGORY_LINKS = [
  {
      label: "Technology & Software",
      path: "/list",
  },
  {
      label: "Digital Marketing",
      path: "/list",
  },
  {
      label: "UI & UX Design",
      path: "/list",
  },
]


export const HOME_BANNER = [
  {
    key: 1,
    title: 'Digital Marketing',
    image: '/banner/Hero-1.png',
  },
  {
    key: 2,
    title: 'SEO',
    image: '/banner/Hero-2.png',
  },
  {
    key: 3,
    title: 'UI & UX',
    image: '/banner/Hero-3.png',
  },
  {
    key: 4,
    title: 'Social Media',
    image: '/banner/Hero-4.png',
  },
];


export const KATEGORI_KELAS = [
  {
    key: 1,
    title: 'Digital Marketing',
    image: '/banner/Cat-1.png',
  },
  {
    key: 2,
    title: 'SEO',
    image: '/banner/Cat-2.png',
  },
  {
    key: 3,
    title: 'Social Media',
    image: '/banner/Cat-3.png',
  },
];
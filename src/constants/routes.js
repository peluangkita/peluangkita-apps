import { MdDashboard } from 'react-icons/md';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import { BiSolidBookContent } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdPayments } from 'react-icons/md';
import { BiSolidBookAlt } from 'react-icons/bi';

export const ADMIN_ROUTES = [
  {
    path: '/',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/learning',
    icon: <BiSolidBookAlt size={22} />,
    name: 'Learning',
    key: '1',
  },
  {
    path: '/consultation',
    icon: <IoChatboxEllipses size={22} />,
    name: 'Consultation',
    key: '2',
  },
  {
    path: '/transaction',
    icon: <MdPayments size={22} />,
    name: 'Transaction',
    key: '3',
  },
  {
    path: '/users',
    icon: <HiUsers size={22} />,
    name: 'Student',
    key: '4',
  },
  {
    path: '/users',
    icon: <HiUsers size={22} />,
    name: 'Mentor',
    key: '5',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '6',
  },
];

export const ROUTES = [
  {
    path: '/',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/learning',
    icon: <BiSolidBookAlt size={22} />,
    name: 'Learning',
    key: '1',
  },
  {
    path: '/consultation',
    icon: <IoChatboxEllipses size={22} />,
    name: 'Consultation',
    key: '2',
  },
  {
    path: '/transaction',
    icon: <MdPayments size={22} />,
    name: 'Transaction',
    key: '3',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '4',
  },
];

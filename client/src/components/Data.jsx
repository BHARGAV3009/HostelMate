import { BiHomeAlt2 } from 'react-icons/bi';
import { TbListDetails } from 'react-icons/tb';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { LuLogOut } from 'react-icons/lu';
import { FaFileAlt, FaWallet, FaBell } from 'react-icons/fa';
import { Building2, Users, CreditCard, MessageSquare } from "lucide-react";

export const sideBarData = [
    {
        icon: BiHomeAlt2,
        heading:'Dashboard',
    },
    {
        icon: TbListDetails,
        heading: 'Room Details',
    },
    {
        icon: MdAccountBalanceWallet,
        heading: 'Fee Amount',
    },
    {
        icon: VscAccount,
        heading: 'Account',
    },
    {
        icon: LuLogOut,
        heading: 'LogOut',
    }
];

export const ShortCardsData = [
    {
        title: 'Breakfast',
        description: 'Prepare breakfast for the residents',
        image: '🍳',
        buttonText: 'View',
        color: {
            backGround: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        }
    },
    {
        title: 'Room Cleaning',
        description: 'Clean the common areas and residents\' rooms',
        image: '🧹',
        buttonText: 'View',
        color: {
            backGround: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
        }
    }
];

export const LongCardData = [
    {
        title1 : 'Timings',
        heading1: 'BreakFast',
        time1: '7:30 AM',
        heading2: 'Lunch',
        time2: '12:30 PM',
        heading3: 'Dinner',
        time3: '8:30 PM',
        color1: {
            backGround: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
        }
    }
];

export const Payments = [
    {
        title : 'Total Revenue',
        amount : '$15450',
        icon : FaFileAlt,
        borderBottom: '3px solid blue',
        IconColor: 'blue'
    },
    {
        title : 'Pending Payments',
        amount : '$1200',
        icon : FaWallet,
        borderBottom: '3px solid yellow',
        IconColor: 'yellow'
    },
    {
        title : 'Overdue Payments',
        amount : '$350',
        icon : FaBell,
        borderBottom: '3px solid red',
        IconColor: 'red'
    }
];

export const TransactionHistory = [
    {
        transactionID : 'Transaction ID',
        Amount : 'Amount',
        PaidDate : 'Paid Date',
        DueAmount : 'Due Amount',
        Status : 'Status',
        bottom : '3px solid black',
        marginbottom : '5px'
    },
    {
        transactionID : 'TXN672',
        Amount : '$500',
        PaidDate : '2025-10-05',
        DueAmount : '$50',
        Status : 'Paid',
        backGround : 'green',
        background :'rgba(235, 235, 235, 1)',
        colorText : 'red'
    },
    {
        transactionID : 'TXN551',
        Amount : '$400',
        PaidDate : '2025-09-05',
        DueAmount : '$100',
        Status : 'Paid',
        backGround : 'yellow',
        background :'rgba(255, 255, 255, 1)',
        colorText : 'red'
    },
    {
        transactionID : 'TXN506',
        Amount : '$400',
        PaidDate : '2025-08-05',
        DueAmount : '$50',
        Status : 'Paid',
        backGround : 'yellow',
        background :'rgba(235, 235, 235, 1)',
        colorText : 'red'
    },
    {
        transactionID : 'TXN302',
        Amount : '$450',
        PaidDate : '2025-07-06',
        DueAmount : '$0',
        Status : 'Paid',
        backGround : 'green',
        background :'rgba(255, 255, 255, 1)',
    },
    {
        transactionID : 'TXN101',
        Amount : '$450',
        PaidDate : '2025-06-10',
        DueAmount : '$0',
        Status : 'Paid',
        backGround : 'green',
        background :'rgba(235, 235, 235, 1)',
    },
    {
        transactionID : 'TXN001',
        Amount : '$450',
        PaidDate : '2025-05-05',
        DueAmount : '$0',
        Status : 'Paid',
        backGround : 'green',
        background :'rgba(255, 255, 255, 1)'
    }
];

export const introBoxData = [
    {
        icon: <Building2 size={32} />, 
        title: 'Room Management',
        description: 'Efficiently manage rooms, beds, and occupancy across all floors.'
    },
    {
        icon: <Users size={32} />,
        title: 'Tenant Management',
        description: 'Track tenant details, room assignments, and membership status.'
    },
    {
        icon: <CreditCard size={32} />,
        title: 'Payment Tracking',
        description: 'Monitor rent payments, generate invoices, and track dues.'
    },
    {
        icon: <MessageSquare size={32} />,
        title: 'Complaint System',
        description: 'Handle maintenance requests and complaints efficiently.'
    }
];
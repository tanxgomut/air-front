import type { Services, BuildFeatures } from "@/types/demos/corporate";

//Services
import icon1 from '/images/it/svgs/abs024.svg';
import icon2 from '/images/it/svgs/com006.svg';
import icon3 from '/images/it/svgs/fin006.svg';

const ServicesData: Services[] = [
    {
        img: icon1,
        title: '4.86',
        desc: 'คะแนนเฉลี่ยจากผู้ใช้งานกว่า 3,800 ราย',
    },
    {
        img: icon2,
        title: '364',
        desc: 'รีวิวลูกค้าจริงที่ได้รับในปี 2024',
    },
    {
        img: icon3,
        title: '12,500+',
        desc: 'เครื่องปรับอากาศที่เราดูแลในปีที่ผ่านมา',
    },
]

//Build Features
import featureicon1 from '/images/it/svgs/abs014.svg';
import featureicon2 from '/images/it/svgs/abs020.svg';
import featureicon3 from '/images/it/svgs/abs027.svg';

const BuildFeaturesData: BuildFeatures[] = [
    {
        icon: featureicon1,
        title: 'Beautiful designs premade',
        desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/',
    },
    {
        icon: featureicon2,
        title: 'Coded with much care & notes',
        desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/',
    },
    {
        icon: featureicon3,
        title: 'Amazing demos included',
        desc: 'Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/',
    }
]

export { ServicesData, BuildFeaturesData };
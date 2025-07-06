export type typeAir = {
    type?: string;
    image?: string;
    price: number;
    sum?: number;
    selected?: boolean;
    label?: string;
}

import imageAir from '/images/blog-grid/grid-agile.jpg';
import imageAir1 from '/images/blog-grid/grid-js.jpg';
import imageAir2 from '/images/blog-grid/grid-LP.jpg';
import air1 from '/images/air/air-1.png';
import air2 from '/images/air/air-2.png';
import air3 from '/images/air/air-3.png';
import air4 from '/images/air/air-4.png';
import air5 from '/images/air/air-5.png';

const airTypeItem: typeAir[] = [
        {
        type: 'one',
        image: air1,
        sum: 0,
        price: 590,
        selected: false,
        label: 'แอร์ติดผนัง'
    },
    {
        type: 'two',
        image: air2,
        sum: 0,
        price: 690,
        selected: false,
        label: 'แอร์แขวน'
    },
    {
        type: 'three',
        image: air3,
        sum: 0,
        price: 890,
        selected: false,
        label: 'แอร์ตั้งพื้น'
    },
    {
        type: 'four',
        image: air4,
        sum: 0,
        price: 990,
        selected: false,
        label: 'แอร์สี่ทิศทาง'
    },
    {
        type: 'five',
        image: air5,
        sum: 0,
        price: 1000,
        selected: false,
        label: 'แอร์ต่อท่อ'
    },
]

const airTypedefault: typeAir[] = [
        {
        type: 'one',
        image: air1,
        sum: 0,
        price: 590,
        selected: false,
        label: 'แอร์ติดผนัง'
    },
    {
        type: 'two',
        image: air2,
        sum: 0,
        price: 690,
        selected: false,
        label: 'แอร์แขวน'
    },
    {
        type: 'three',
        image: air3,
        sum: 0,
        price: 890,
        selected: false,
        label: 'แอร์ตั้งพื้น'
    },
    {
        type: 'four',
        image: air4,
        sum: 0,
        price: 990,
        selected: false,
        label: 'แอร์สี่ทิศทาง'
    },
    {
        type: 'five',
        image: air5,
        sum: 0,
        price: 1000,
        selected: false,
        label: 'แอร์ต่อท่อ'
    },
]

export default {airTypeItem, airTypedefault};
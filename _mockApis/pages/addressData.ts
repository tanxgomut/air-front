import mock from '../mockAdapter';
import type { Province , District, Subdistrict, Zipcode, AddressData} from '@/types/pages/addressData';

const provinces: Province[] = [
    { id: 1, name: 'กรุงเทพมหานคร' },
    { id: 2, name: 'นนทบุรี' },
    { id: 3, name: 'ปทุมธานี' },
]

const districts = [
    { id: 1, name: 'บางนา', provinceId: 1 },
    { id: 2, name: 'จตุจักร', provinceId: 1 },
    { id: 3, name: 'บางพลี', provinceId: 2 },
    { id: 4, name: 'ธัญบุรี', provinceId: 3 },
    { id: 5, name: 'เมืองนนทบุรี', provinceId: 2 },
];

const subdistricts = [
    { id: 1, name: 'บางนา', districtId: 1 },
    { id: 2, name: 'บางนาเหนือ', districtId: 1 },
    { id: 3, name: 'จตุจักร', districtId: 2 },
    { id: 4, name: 'ลาดยาว', districtId: 2 },
    { id: 5, name: 'บางพลีใหญ่', districtId: 3 },
    { id: 6, name: 'คลองหนึ่ง', districtId: 4 },
    { id: 7, name: 'บางกระสอ', districtId: 5 },
];

const zipcodes = [
    { id: 1, zipcode: '10260', subdistrictId: 1 },
    { id: 2, zipcode: '10260', subdistrictId: 2 },
    { id: 3, zipcode: '10900', subdistrictId: 3 },
    { id: 4, zipcode: '10900', subdistrictId: 4 },
    { id: 5, zipcode: '10540', subdistrictId: 5 },
    { id: 6, zipcode: '12110', subdistrictId: 6 },
    { id: 7, zipcode: '11000', subdistrictId: 7 },
    { id: 8, zipcode: '11000', subdistrictId: 1 },
];

const addressData = [
    {
        id: 1, 
        name: 'นายสมชาย ใจดี',
        tel: '0812345678',  
        address: '123/45 ซอยสุขุมวิท 101 แยก 5',
        selectedLocation: 'บ้าน',
        provinceData: {
            province: provinces[0],
            district: districts[0],
            subdistrict: subdistricts[0],
            zipcode: zipcodes[0],
        }
    },
    {
        id: 2, 
        name: 'นางสาวสวย ใจดี',
        tel: '0823456789',  
        address: '456/78 ถนนพหลโยธิน แขวงลาดยาว',
        selectedLocation: 'ที่ทำงาน',
        provinceData: {
            province: provinces[1],
            district: districts[1],
            subdistrict: subdistricts[1],
            zipcode: zipcodes[1],
        }
    },
    {
        id: 3, 
        name: 'นายสมศักดิ์ ใจดี',
        tel: '0834567890',  
        address: '789/12 หมู่บ้านสุขสันต์',
        selectedLocation: 'บ้านพักตากอากาศ',
        provinceData: {
            province: provinces[2],
            district: districts[2],
            subdistrict: subdistricts[2],
            zipcode: zipcodes[2],
        }
    },  
]

mock.onGet('/api/addressbook').reply(() => {
    return [200, addressData];
});

mock.onGet('api/addressbook/:id').reply((config) => {
    const id = parseInt(config.url?.split('/').pop() || '0', 10);
    const address = addressData.find(item => item.id === id);   
    if (address) {
        return [200, address];
    } else {
        return [404, { message: 'Address not found' }];
    }
});

mock.onGet('/api/provinces').reply(() => {
    return [200, provinces];
});

mock.onGet('/api/districts').reply((config) => {
    const provinceId = parseInt(config.params?.provinceId || '0', 10);
    const filteredDistricts = districts.filter(district => district.provinceId === provinceId);
    return [200, filteredDistricts];
});

mock.onGet('/api/subdistricts').reply((config) => {
    const districtId = parseInt(config.params?.districtId || '0', 10);
    const filteredSubdistricts = subdistricts.filter(subdistrict => subdistrict.districtId === districtId);
    return [200, filteredSubdistricts];
});

mock.onGet('/api/zipcodes').reply((config) => {
    const subdistrictId = parseInt(config.params?.subdistrictId || '0', 10);
    const filteredZipcodes = zipcodes.filter(zipcode => zipcode.subdistrictId === subdistrictId);
    return [200, filteredZipcodes];
});

export type Province = {
    id?: string | number;
    name?: string;
};
export type District = {
    id?: string | number;
    name?: string;
    provinceId?: string | number;
};
export type Subdistrict = {
    id?: string | number;
    name?: string;
    districtId?: string | number;
};
export type Zipcode = {
    id?: string | number;
    zipcode?: string;
    subdistrictId?: string | number;
};
export type AddressData = {
    id?: string | number;
    name?: string;
    tel?: string;
    address?: string;
    selectedLocation?: string;
    provinceData?: {
        province: Province;
        district: District;
        subdistrict: Subdistrict;
        zipcode: Zipcode;
    };
};
/**
 * getAddresses
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
const path = require('path');
const fs = require('fs');
const getAddresses = async (frag: string, pg) => {
    const dataPath = path.resolve('./', 'db.json');
    try{
        console.log('pg',pg);
        const dataFile = fs.readFileSync(dataPath);
        const data = JSON.parse(dataFile);
        let returnData;
        if(data){
            console.log('frag', frag);
            if(frag){
                const fragment = frag.toLowerCase();
                returnData = data.filter((addr) => {
                    let line2FixSpace = ''; //other fields with space do not require this operation, but search in line2 for fragment with space will fail if it is not created in new var.
                    if (addr.line2) line2FixSpace = addr.line2;

                    return addr.line1.toLowerCase().includes(fragment)
                    || line2FixSpace.toLowerCase().includes(fragment)
                    || addr.city.toLowerCase().includes(fragment)
                    || addr.state.toLowerCase().includes(fragment)
                    || addr.zip.includes(fragment)
                    || addr.id.toString().includes(fragment); //is hex...convert to string
                });
            }else{
                returnData = data;
            }
            if(pg && pg.s && pg.p){
                console.log('There is a page');
                let end = pg.s * pg.p;
                const start = end - pg.p;
                if(returnData.length < pg.s-1 * pg.p){
                    end = returnData.length;
                }
                const rdata = returnData.slice(start, end);
                return {err: null, data: rdata};
            }
            console.dir('no paging');
            return {err: null, data: returnData};
        }else{
            return {err: 'no-data-found', data: null};
        }
    }catch(e){
        return {err: e, data: null};
    }
};
export default getAddresses;
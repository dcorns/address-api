/**
 * getAddresses
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
const path = require('path');
const fs = require('fs');
const getAddresses = async (frag?: string) => {
    const dataPath = path.resolve('./', 'db.json');
    try{
        const dataFile = fs.readFileSync(dataPath);
        const data = JSON.parse(dataFile);
        if(data){
            if(frag){
                const fragment = frag.toLowerCase();
                const filteredData = data.filter((addr) => {
                    return addr.line1.toLowerCase().includes(fragment)
                    || (addr.lin2 && addr.line2.toLowerCase().includes(fragment))
                    || addr.city.toLowerCase().includes(fragment)
                    || addr.state.toLowerCase().includes(fragment)
                    || addr.zip.includes(fragment);
                });
                return {err:null, data: filteredData}
            }
            return {err: null, data};
        }else{
            return {err: 'no-data-found', data: null};
        }
    }catch(e){
        return {err: e, data: null};
    }
};
export default getAddresses;
/**
 * putAddress
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
const path = require('path');
const fs = require('fs');

const putAddress = async (id, item) => {
    const dataPath = path.resolve('./', 'db.json');

    try{
        const dataFile = fs.readFileSync(dataPath);
        const data = JSON.parse(dataFile);
        if(!data) {
            console.log(`putAddress failed to retrieve file data`);
            return {error:'error loading data', data: null};
        }else{
            const dataUpdated = data.map(rec => rec.id === id ? item : rec);
            fs.writeFileSync(dataPath, JSON.stringify(dataUpdated, null, 2));
            return {err: null, data: dataUpdated};
        }
    }catch(e){
        console.error('putAddress', e);
        return {err: e, data: null};
    }
};
export default putAddress;